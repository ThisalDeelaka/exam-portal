const express = require("express");
const { registerAdmin, loginAdmin,updateUserPassword } = require("../controllers/adminController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.put("/update-password", authenticate, updateUserPassword);
module.exports = router;
