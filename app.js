if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}


const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const multer = require('multer');
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { error } = require("console");
const { reportSchema } = require("./schema.js");
const { cloudinary, storage } = require("./cloudConfig.js");
const MongoStore = require('connect-mongo');


const upload = multer({ storage });

const User = require("./models/user.js");
const Report = require("./models/report.js");

const dbUrl = process.env.ATLASDB_URL;

// DATABASE CONNECTION
main().then(() => console.log("DB connected")).catch(err => console.log(err));
async function main() {
    await mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

// VIEW ENGINE
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 3600,
    crypto: {
        secret: process.env.SECRET,
    },
})

store.on(error, (err) => {
    console.log("Error in MONGO SESSION STORE", err)
});



const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// GLOBAL FLASH & USER
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// MIDDLEWARE FUNCTIONS
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in");
        return res.redirect("/login");
    }
    next();
};

const saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

const validateReport = (req, res, next) => {
    const { error } = reportSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(e => e.message).join(", ");
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

const isAdminOrManager = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be logged in');
        return res.redirect('/login');
    }
    if (["admin", "disaster manager"].includes(req.user.userRole)) return next();
    req.flash('error', 'You do not have permission');
    res.redirect("/reports");
};

const isOwner = async (req, res, next) => {
    const { id } = req.params;
    const report = await Report.findById(id);
    if (!report) {
        req.flash("error", "Report not found");
        return res.redirect("/reports");
    }
    if (!report.owner.equals(req.user._id) && !["admin", "disaster manager"].includes(req.user.userRole)) {
        req.flash("error", "You don't have permission to edit this report");
        return res.redirect(`/reports/${id}`);
    }
    next();
};

const isProfileOwner = (req, res, next) => {
    const { id } = req.params;
    if (req.user._id.equals(id) || ["admin", "disaster manager"].includes(req.user.userRole)) {
        return next();
    }
    req.flash("error", "You do not have permission to edit this profile");
    return res.redirect(`/profile/${req.user._id}`);
};


// ROUTES
app.get('/', (req, res) => res.redirect("/reports"));

app.get('/reports', wrapAsync(async (req, res) => {
    const allReport = await Report.find({}).populate("owner");
    res.render("dashboard", { allReport });
}));

app.get('/reports/new', isLoggedIn, (req, res) => res.render("reportForm"));

app.post('/reports',
    isLoggedIn,
    upload.single('report[image]'),
    validateReport,
    wrapAsync(async (req, res) => {
        const newReport = new Report(req.body.report);
        newReport.owner = req.user._id;
        if (req.file) newReport.image = { url: req.file.path, filename: req.file.filename };
        await newReport.save();
        req.flash("success", "New Report Created!");
        res.redirect("/reports");
    })
);

app.get('/reports/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const report = await Report.findById(id).populate("owner");
    if (!report) {
        req.flash("error", "Report not found");
        return res.redirect("/reports");
    }
    res.render("report", { report });
}));

app.get('/reports/:id/edit', isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const report = await Report.findById(id);
    if (!report) {
        req.flash("error", "Report not found");
        return res.redirect("/reports");
    }
    let originalImageUrl = report.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("reportEditForm", { report });
}));

app.put('/reports/:id', isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Report.findByIdAndUpdate(id, { ...req.body.report });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        newReport.image = { url, filename };
        await newReport.save();
    }
    req.flash("success", "Report Updated!");
    res.redirect(`/reports/${id}`);
}));

app.delete('/reports/:id', isLoggedIn, isAdminOrManager, wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Report.findByIdAndDelete(id);
    req.flash('success', 'Report deleted successfully!');
    res.redirect("/reports");
}));

// AUTH ROUTES
app.get('/signup', (req, res) => res.render("signup"));

app.post('/signup', wrapAsync(async (req, res, next) => {
    const { username, email, password, userRole, aadharNum, phoneNum } = req.body;
    try {
        const newUser = new User({ username, email, userRole, aadharNum, phoneNum });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash("success", "Welcome to Prahari!");
            res.redirect("/reports");
        });
    } catch (e) {
        req.flash("error", e.message);
        return res.redirect("/signup");
    }
}));

app.get('/login', (req, res) => res.render("login"));

app.post('/login', saveRedirectUrl, passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
}), (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect(res.locals.redirectUrl || "/reports");
});

app.get("/logout", (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);
        req.flash("success", "You are logged out");
        res.redirect("/reports");
    });
});


// View profile
app.get('/profile/:id', isLoggedIn, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        req.flash("error", "User not found");
        return res.redirect("/reports");
    }

    // Fetch reports by this user
    const reports = await Report.find({ owner: id });

    res.render("profile", { user, reports });
}));


// Edit profile form
app.get('/profile/:id/edit', isLoggedIn, isProfileOwner, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        req.flash("error", "User not found");
        return res.redirect("/reports");
    }
    res.render("profileEdit", { user });
}));

// Handle profile update
app.put('/profile/:id', isLoggedIn, isProfileOwner, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { username, email, phoneNum } = req.body; // adjust fields to what your form sends
    await User.findByIdAndUpdate(id, { username, email, phoneNum });
    req.flash("success", "Profile updated successfully!");
    res.redirect(`/profile/${id}`);
}));

app.get('/reportingpage', (req, res) => res.render("reportingpage"));

app.get('/search', async (req, res) => {
    const { q, location, dateRange } = req.query;

    let filters = {};

    // Only add "q" filter if user typed something
    if (q && q.trim() !== "") {
        filters.$or = [
            { title: { $regex: q, $options: "i" } },
            { description: { $regex: q, $options: "i" } },
            { category: { $regex: q, $options: "i" } }
        ];
    }

    // Location filter
    if (location && location.trim() !== "") {
        filters.location = { $regex: location, $options: "i" };
    }

    // Date filter
    if (dateRange && dateRange !== "") {
        let startDate;
        const now = new Date();

        switch (dateRange) {
            case "today":
                startDate = new Date(now.setHours(0, 0, 0, 0));
                break;
            case "week":
                startDate = new Date();
                startDate.setDate(now.getDate() - 7);
                break;
            case "month":
                startDate = new Date();
                startDate.setMonth(now.getMonth() - 1);
                break;
            case "year":
                startDate = new Date();
                startDate.setFullYear(now.getFullYear() - 1);
                break;
        }

        if (startDate) {
            filters.createdAt = { $gte: startDate };
        }
    }

    try {
        // If no filters applied → return all reports
        const results = await Report.find(filters);
        res.render("dashboard", { allReport: results });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// app.get('/profilesearch/:id', async (req, res) => {
//     const { q, location, dateRange } = req.query;
//     const { id } = req.params;
//     const user = await User.findById(id);
//     if (!user) {
//         req.flash("error", "User not found");
//         return res.redirect("/reports");
//     }
//     let filters = {};

//     // Only add "q" filter if user typed something
//     if (q && q.trim() !== "") {
//         filters.$or = [
//             { title: { $regex: q, $options: "i" } },
//             { description: { $regex: q, $options: "i" } },
//             { category: { $regex: q, $options: "i" } }
//         ];
//     }

//     // Location filter
//     if (location && location.trim() !== "") {
//         filters.location = { $regex: location, $options: "i" };
//     }

//     // Date filter
//     if (dateRange && dateRange !== "") {
//         let startDate;
//         const now = new Date();

//         switch (dateRange) {
//             case "today":
//                 startDate = new Date(now.setHours(0, 0, 0, 0));
//                 break;
//             case "week":
//                 startDate = new Date();
//                 startDate.setDate(now.getDate() - 7);
//                 break;
//             case "month":
//                 startDate = new Date();
//                 startDate.setMonth(now.getMonth() - 1);
//                 break;
//             case "year":
//                 startDate = new Date();
//                 startDate.setFullYear(now.getFullYear() - 1);
//                 break;
//         }

//         if (startDate) {
//             filters.createdAt = { $gte: startDate };
//         }
//     }

//     try {
//         // If no filters applied → return all reports
//         const results = await Report.find(filters);
//         res.render("profile", { reports: results, user } );
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Server Error");
//     }
// });




// STATIC PAGES
app.get('/notification', (req, res) => res.render("notification"));
app.get('/video', (req, res) => res.render("video"));
app.get('/map', (req, res) => res.render("map"));
app.get('/social', (req, res) => res.render("social"));
app.get('/usermanagment', (req, res) => res.render("usermanagment"));
app.get('/languagechange', (req, res) => res.render("languagechange"));
app.get('/profile', isLoggedIn, (req, res) => {
    res.redirect(`/profile/${req.user._id}`);
});

app.get('/profileEdit', (req, res) => res.render("profileEdit"));

// ERROR HANDLING
app.all('*', (req, res, next) => next(new ExpressError(404, "Page Not Found")));
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong 🛑" } = err;
    res.status(statusCode).render("error", { message });
});

// SERVER
console.log("Server running on port 3000");
app.listen(3000);
