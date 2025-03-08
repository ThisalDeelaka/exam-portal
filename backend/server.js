require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Import Routes
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");
const examRoutes = require("./routes/examRoutes");

const app = express();


app.use(express.json());
app.use(cors());


app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/exam", examRoutes);


connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
