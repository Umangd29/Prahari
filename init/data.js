const sampleReports = [
    {
        title: "Cyclone Alert in Odisha Coast",
        description: "A sudden cyclone warning issued for Odisha, heavy rainfall expected.",
        image: { filename: "reportimage", url: "https://media.istockphoto.com/id/2207162439/photo/lighthouse-on-rock-in-violent-storm.webp?a=1&b=1&s=612x612&w=0&k=20&c=CHQEyYNYP89d7Flt9dGf5pvL_DQQru_5pT_fbjwXDdg=" },
        location: "Puri",
        state: "Odisha",
        category: ["Cyclones"],
        date: "2025-09-01"
    },
    {
        title: "Flooding in Assam",
        description: "Rivers in Assam overflowed due to heavy monsoon rains causing local flooding.",
        image: { filename: "reportimage", url: "https://media.istockphoto.com/id/2207162439/photo/lighthouse-on-rock-in-violent-storm.webp?a=1&b=1&s=612x612&w=0&k=20&c=CHQEyYNYP89d7Flt9dGf5pvL_DQQru_5pT_fbjwXDdg=" },
        location: "Guwahati",
        state: "Assam",
        category: ["Other"],
        date: "2025-09-02"
    },
    {
        title: "Tsunami Drill in Chennai",
        description: "Authorities conducted tsunami evacuation drill along Chennai coast.",
        image: { filename: "reportimage", url: "https://media.istockphoto.com/id/2207162439/photo/lighthouse-on-rock-in-violent-storm.webp?a=1&b=1&s=612x612&w=0&k=20&c=CHQEyYNYP89d7Flt9dGf5pvL_DQQru_5pT_fbjwXDdg=" },
        location: "Chennai",
        state: "Tamil Nadu",
        category: ["Tsunami"],
        date: "2025-09-03"
    },
    {
        title: "Sea-Level Rise Observed in Mumbai",
        description: "High tides and sea-level rise caused minor flooding along Marine Drive.",
        image: { filename: "reportimage", url: "https://media.istockphoto.com/id/2207162439/photo/lighthouse-on-rock-in-violent-storm.webp?a=1&b=1&s=612x612&w=0&k=20&c=CHQEyYNYP89d7Flt9dGf5pvL_DQQru_5pT_fbjwXDdg=" },
        location: "Mumbai",
        state: "Maharashtra",
        category: ["Sea-Level-Rise"],
        date: "2025-09-04"
    },
    {
        title: "Whirlpool Formation at Gulf of Kutch",
        description: "Whirlpool observed in Gulf of Kutch, fishermen warned to stay ashore.",
        image: { filename: "reportimage", url: "https://media.istockphoto.com/id/2207162439/photo/lighthouse-on-rock-in-violent-storm.webp?a=1&b=1&s=612x612&w=0&k=20&c=CHQEyYNYP89d7Flt9dGf5pvL_DQQru_5pT_fbjwXDdg=" },
        location: "Gulf of Kutch",
        state: "Gujarat",
        category: ["Whirlpool"],
        date: "2025-09-05"
    },
    {
        title: "Cyclone Threat in West Bengal",
        description: "Cyclone forming in Bay of Bengal may hit West Bengal coast in 48 hours.",
        image: { filename: "reportimage", url: "https://media.istockphoto.com/id/2207162439/photo/lighthouse-on-rock-in-violent-storm.webp?a=1&b=1&s=612x612&w=0&k=20&c=CHQEyYNYP89d7Flt9dGf5pvL_DQQru_5pT_fbjwXDdg=" },
        location: "Kolkata",
        state: "West Bengal",
        category: ["Cyclones"],
        date: "2025-09-06"
    },
    {
        title: "Monsoon Floods in Kerala",
        description: "Heavy monsoon rains triggered flash floods in Kerala districts.",
        image: { filename: "reportimage", url: "https://media.istockphoto.com/id/2207162439/photo/lighthouse-on-rock-in-violent-storm.webp?a=1&b=1&s=612x612&w=0&k=20&c=CHQEyYNYP89d7Flt9dGf5pvL_DQQru_5pT_fbjwXDdg=" },
        location: "Alappuzha",
        state: "Kerala",
        category: ["Other"],
        date: "2025-09-07"
    },
    {
        title: "Cyclone in Andhra Pradesh",
        description: "Andhra Pradesh coast braces for landfall of a moderate cyclone.",
        image: { filename: "reportimage", url: "https://media.istockphoto.com/id/2207162439/photo/lighthouse-on-rock-in-violent-storm.webp?a=1&b=1&s=612x612&w=0&k=20&c=CHQEyYNYP89d7Flt9dGf5pvL_DQQru_5pT_fbjwXDdg=" },
        location: "Visakhapatnam",
        state: "Andhra Pradesh",
        category: ["Cyclones"],
        date: "2025-09-08"
    },
    {
        title: "Tsunami Evacuation Drill in Odisha",
        description: "Odisha authorities conducted tsunami safety drill for coastal villages.",
        image: { filename: "reportimage", url: "https://media.istockphoto.com/id/2207162439/photo/lighthouse-on-rock-in-violent-storm.webp?a=1&b=1&s=612x612&w=0&k=20&c=CHQEyYNYP89d7Flt9dGf5pvL_DQQru_5pT_fbjwXDdg=" },
        location: "Paradip",
        state: "Odisha",
        category: ["Tsunami"],
        date: "2025-09-09"
    },
    {
        title: "Sea-Level Rise Warning in Goa",
        description: "Authorities warned of minor flooding due to rising sea levels along Goa coast.",
        image: { filename: "reportimage", url: "https://media.istockphoto.com/id/2207162439/photo/lighthouse-on-rock-in-violent-storm.webp?a=1&b=1&s=612x612&w=0&k=20&c=CHQEyYNYP89d7Flt9dGf5pvL_DQQru_5pT_fbjwXDdg=" },
        location: "Panaji",
        state: "Goa",
        category: ["Sea-Level-Rise"],
        date: "2025-09-10"
    },
    {
        title: "Whirlpool at Andaman Sea",
        description: "Unexpected whirlpool observed in Andaman waters, boats advised caution.",
        image: { filename: "reportimage", url: "https://media.istockphoto.com/id/2207162439/photo/lighthouse-on-rock-in-violent-storm.webp?a=1&b=1&s=612x612&w=0&k=20&c=CHQEyYNYP89d7Flt9dGf5pvL_DQQru_5pT_fbjwXDdg=" },
        location: "Port Blair",
        state: "Andaman and Nicobar Islands",
        category: ["Whirlpool"],
        date: "2025-09-11"
    },
    {
        title: "Cyclone Forming Near Tamil Nadu",
        description: "Weather department issues warning for a cyclone forming in Bay of Bengal.",
        image: { filename: "reportimage", url: "https://media.istockphoto.com/id/2207162439/photo/lighthouse-on-rock-in-violent-storm.webp?a=1&b=1&s=612x612&w=0&k=20&c=CHQEyYNYP89d7Flt9dGf5pvL_DQQru_5pT_fbjwXDdg=" },
        location: "Chennai",
        state: "Tamil Nadu",
        category: ["Cyclones"],
        date: "2025-09-12"
    },
    {
        title: "Flooding in Bihar",
        description: "Heavy rainfall caused flooding in Patna and nearby areas.",
        image: { filename: "reportimage", url: "https://media.istockphoto.com/id/2207162439/photo/lighthouse-on-rock-in-violent-storm.webp?a=1&b=1&s=612x612&w=0&k=20&c=CHQEyYNYP89d7Flt9dGf5pvL_DQQru_5pT_fbjwXDdg=" },
        location: "Patna",
        state: "Bihar",
        category: ["Other"],
        date: "2025-09-13"
    },
    {
        title: "Tsunami Drill in Andaman Islands",
        description: "Local authorities conducted tsunami safety drill for the islands.",
        image: { filename: "reportimage", url: "https://media.istockphoto.com/id/2207162439/photo/lighthouse-on-rock-in-violent-storm.webp?a=1&b=1&s=612x612&w=0&k=20&c=CHQEyYNYP89d7Flt9dGf5pvL_DQQru_5pT_fbjwXDdg=" },
        location: "Port Blair",
        state: "Andaman and Nicobar Islands",
        category: ["Tsunami"],
        date: "2025-09-14"
    },
    {
        title: "Cyclone Warning for West Bengal",
        description: "Cyclone expected to hit Sundarbans area; evacuation underway.",
        image: { filename: "reportimage", url: "https://media.istockphoto.com/id/2207162439/photo/lighthouse-on-rock-in-violent-storm.webp?a=1&b=1&s=612x612&w=0&k=20&c=CHQEyYNYP89d7Flt9dGf5pvL_DQQru_5pT_fbjwXDdg=" },
        location: "Sundarbans",
        state: "West Bengal",
        category: ["Cyclones"],
        date: "2025-09-15"
    },
    {
        title: "Minor Flooding in Gujarat",
        description: "Rains caused localized flooding in some districts of Gujarat.",
        image: { filename: "reportimage", url: "https://media.istockphoto.com/id/2207162439/photo/lighthouse-on-rock-in-violent-storm.webp?a=1&b=1&s=612x612&w=0&k=20&c=CHQEyYNYP89d7Flt9dGf5pvL_DQQru_5pT_fbjwXDdg=" },
        location: "Surat",
        state: "Gujarat",
        category: ["Other"],
        date: "2025-09-16"
    },
    {
        title: "Sea-Level Rise in Chennai",
        description: "Coastal areas of Chennai experiencing high tide flooding due to sea-level rise.",
        image: { filename: "reportimage", url: "https://media.istockphoto.com/id/2207162439/photo/lighthouse-on-rock-in-violent-storm.webp?a=1&b=1&s=612x612&w=0&k=20&c=CHQEyYNYP89d7Flt9dGf5pvL_DQQru_5pT_fbjwXDdg=" },
        location: "Chennai",
        state: "Tamil Nadu",
        category: ["Sea-Level-Rise"],
        date: "2025-09-17"
    },
    {
        title: "Whirlpool Observed at Gulf of Mannar",
        description: "Whirlpool formation detected; local fishermen advised to return to shore.",
        image: { filename: "reportimage", url: "https://media.istockphoto.com/id/2207162439/photo/lighthouse-on-rock-in-violent-storm.webp?a=1&b=1&s=612x612&w=0&k=20&c=CHQEyYNYP89d7Flt9dGf5pvL_DQQru_5pT_fbjwXDdg=" },
        location: "Gulf of Mannar",
        state: "Tamil Nadu",
        category: ["Whirlpool"],
        date: "2025-09-18"
    },
    {
        title: "Cyclone Alert in Andhra Pradesh",
        description: "Cyclone forming in Bay of Bengal; residents urged to evacuate low-lying areas.",
        image: { filename: "reportimage", url: "https://media.istockphoto.com/id/2207162439/photo/lighthouse-on-rock-in-violent-storm.webp?a=1&b=1&s=612x612&w=0&k=20&c=CHQEyYNYP89d7Flt9dGf5pvL_DQQru_5pT_fbjwXDdg=" },
        location: "Visakhapatnam",
        state: "Andhra Pradesh",
        category: ["Cyclones"],
        date: "2025-09-19"
    },
    {
        title: "Flooding in Assam",
        description: "River Brahmaputra continues to flood low-lying areas in Assam.",
        image: { filename: "reportimage", url: "https://media.istockphoto.com/id/2207162439/photo/lighthouse-on-rock-in-violent-storm.webp?a=1&b=1&s=612x612&w=0&k=20&c=CHQEyYNYP89d7Flt9dGf5pvL_DQQru_5pT_fbjwXDdg=" },
        location: "Guwahati",
        state: "Assam",
        category: ["Other"],
        date: "2025-09-20"
    },
    {
        title: "Tsunami Drill in Odisha Coast",
        description: "Coastal safety drill conducted in Odisha as precautionary measure.",
        image: { filename: "reportimage", url: "https://media.istockphoto.com/id/2207162439/photo/lighthouse-on-rock-in-violent-storm.webp?a=1&b=1&s=612x612&w=0&k=20&c=CHQEyYNYP89d7Flt9dGf5pvL_DQQru_5pT_fbjwXDdg=" },
        location: "Puri",
        state: "Odisha",
        category: ["Tsunami"],
        date: "2025-09-21"
    },
    {
        title: "Sea-Level Rise in Mumbai",
        description: "Mumbai experiences minor flooding along coast due to high tides.",
        image: { filename: "reportimage", url: "https://media.istockphoto.com/id/2207162439/photo/lighthouse-on-rock-in-violent-storm.webp?a=1&b=1&s=612x612&w=0&k=20&c=CHQEyYNYP89d7Flt9dGf5pvL_DQQru_5pT_fbjwXDdg=" },
        location: "Mumbai",
        state: "Maharashtra",
        category: ["Sea-Level-Rise"],
        date: "2025-09-22"
    }
];

module.exports = { data: sampleReports };
