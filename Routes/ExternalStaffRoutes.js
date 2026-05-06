const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/externalStaffController");

// /api/externalstaff
router.get("/",             ctrl.getAll);
router.get("/:id",          ctrl.getById);
router.post("/",            ctrl.create);
router.put("/:id",          ctrl.update);
router.patch("/:id/toggle", ctrl.toggleDisable);
router.delete("/:id",       ctrl.remove);

module.exports = router;