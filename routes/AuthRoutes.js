// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {
	getAllUsers,
	login,
	createUser,
	logout,
	isAdmin,
	verifyToken,
	makeAdmin,
	findUser,
	updateUser,
} = require("../controllers/AuthController");

router.post("/login", login);
router.post("/register", createUser);
router.use(verifyToken); 
router.get("/users", getAllUsers);
router.post("/logout", logout);

router.use(isAdmin); 
router.patch("/:id", updateUser);
router.patch("/make-admin/:id", makeAdmin);
router.get("/:id", findUser);


module.exports = router;
