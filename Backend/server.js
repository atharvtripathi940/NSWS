require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes =
  require("./routes/authRoutes");

const businessRoutes =
  require("./routes/businessRoutes");

const approvalRoutes =
  require("./routes/approvalRoutes");

const applicationRoutes =
  require("./routes/applicationRoutes");

const documentRoutes =
  require("./routes/documentRoutes");

const notificationRoutes =
  require("./routes/notificationRoutes");

const trackingRoutes =
  require("./routes/trackingRoutes");

const assistantRoutes =
  require("./routes/assistantRoutes");

const dashboardRoutes =
  require("./routes/dashboardRoutes");


const app = express();


// DATABASE
connectDB();


// MIDDLEWARE
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));


// UPLOADS
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);


// TEST ROUTE
app.get("/", (req, res) => {
  res.json({
    message: "NSWS Backend is running",
    status: "success"
  });
});


// API ROUTES
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/business",
  businessRoutes
);

app.use(
  "/api/approvals",
  approvalRoutes
);

app.use(
  "/api/applications",
  applicationRoutes
);

app.use(
  "/api/documents",
  documentRoutes
);

app.use(
  "/api/notifications",
  notificationRoutes
);

app.use(
  "/api/tracking",
  trackingRoutes
);

app.use(
  "/api/assistant",
  assistantRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);


// 404
app.use((req, res) => {
  res.status(404).json({
    message: "API route not found",
    path: req.originalUrl
  });
});


// ERROR HANDLER
app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    message: "Internal server error"
  });
});


// START SERVER
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `NSWS Backend running on http://localhost:${PORT}`
  );
});