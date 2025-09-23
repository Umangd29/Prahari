const Joi = require('joi');

const reportSchema = Joi.object({
    report: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        state: Joi.string().required(),
        category: Joi.string().valid(
            "Tsunami", "Hurricanes", "Cyclones", "Typhoons", 
            "Whirlpool", "Sea-Level-Rise", "Other"
        ).required(),
        date: Joi.date().required()
    }).required()
});


module.exports = { reportSchema };
