const express = require("express");
const router = express.Router();
const TownController = require("../controllers/TownController");
const { verifyToken, isAdmin } = require("../controllers/AuthController");


router.use(verifyToken);
router.get("/", TownController.getTowns);

router.use(isAdmin);
router.post("/", TownController.createTown);
router.put("/:id", TownController.updateTown);
router.delete("/:id", TownController.deleteTown);

module.exports = router;