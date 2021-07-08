const express = require("express");
const router = express.Router();
const userControllr = require("../controller/adcontroller");

router.get("/", userControllr.findall);
router.post("/", userControllr.create);
router.get("/:id", userControllr.findone);
router.put("/:id", userControllr.update);
router.delete("/:id", userControllr.remove);

router.post('/admin/addfarmer',userControllr.addfarmer);

// router.patch("/:id", userControllr.patch);
module.exports = router;
