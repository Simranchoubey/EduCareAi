require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const collegeRoutes = require("./routes/colleges");
const costRoutes = require("./routes/cost");
const healthcareRoutes = require("./routes/healthcare");
const loanRoutes = require("./routes/loan");
const chatRoutes = require("./routes/chat");

const aiRoutes = require("./routes/aiRoutes.js")

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());

app.use("/api", aiRoutes)

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use(limiter);

// Routes
app.use("/api/colleges", collegeRoutes);
app.use("/api/cost", costRoutes);
app.use("/api/healthcare", healthcareRoutes);
app.use("/api/loan", loanRoutes);
app.use("/api/chat", chatRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "EduCare AI API running", version: "1.0.0" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`\n🎓 EduCare AI Backend running on http://localhost:${PORT}`);
  console.log(`📡 API Health: http://localhost:${PORT}/api/health\n`);
});
