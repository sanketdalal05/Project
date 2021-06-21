const express = require("express");
const router = express.Router();
const userControllr = require("../controller/adcontroller");

// router.get("/", userControllr.findAll);
router.post("/", userControllr.create);
// router.get("/:id", userControllr.findOne);
// router.put("/:id", userControllr.UpdateUser);
// router.delete("/:id", userControllr.delete);
// router.patch("/:id", userControllr.patch);
module.exports = router;