// ==========================================
// SAHAJ SETU - BACKEND SERVER
// ==========================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes =
    require("./routes/authRoutes");

const businessRoutes =
    require("./routes/businessRoutes");

const applicationRoutes =
    require("./routes/applicationRoutes");

const inspectionRoutes = 
    require("./routes/inspectionRoutes");


const app = express();


// ==========================================
// DATABASE
// ==========================================

connectDB();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);


// ==========================================
// API ROUTES
// ==========================================

// Authentication
app.use(
    "/api/auth",
    authRoutes
);


// Business
app.use(
    "/api/business",
    businessRoutes
);


// Applications
app.use(
    "/api/applications",
    applicationRoutes
);

app.use(
    "/api/inspections", 
    inspectionRoutes
);


// ==========================================
// APPLICATION ROUTE TEST
// ==========================================

app.get(
    "/api/test-application-route",
    (req, res) => {

        res.status(200).json({

            success: true,

            message:
                "Application route is reaching the server!"

        });

    }
);


// ==========================================
// ROOT TEST ROUTE
// ==========================================

app.get(
    "/",
    (req, res) => {

        res.status(200).json({

            success: true,

            message:
                "Sahaj Setu Backend is running successfully!"

        });

    }
);


// ==========================================
// 404 HANDLER
// ==========================================

app.use(
    (req, res) => {

        res.status(404).json({

            success: false,

            message:
                `Route not found: ${req.method} ${req.originalUrl}`

        });

    }
);


// ==========================================
// ERROR HANDLER
// ==========================================

app.use(
    (error, req, res, next) => {

        console.error(
            "Server Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Internal server error."

        });

    }
);


// ==========================================
// SERVER
// ==========================================

const PORT =
    process.env.PORT || 5000;


app.listen(
    PORT,
    () => {

        console.log(
            `Sahaj Setu Backend running on http://localhost:${PORT}`
        );

        console.log(
            "Application routes loaded successfully."
        );

    }
);

