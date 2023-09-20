const express = require("express");
let router = express.Router();

const {
  getAllPartners,
  createPartner,
  deletePartner,
  addProjectToPartner,
  addUserToPartner,
  removeProjectFromPartner,
  removeUserFromPartner,
  getAllPartnerByUserId,
  getAllPartnerByProjectId,
} = require("../controller/partner");

router.get("/", getAllPartners);
router.get("/user/:id", getAllPartnerByUserId);
router.get("/project/:id", getAllPartnerByProjectId);
router.post("/", createPartner);
router.delete("/:id", deletePartner);
router.post("/add-project", addProjectToPartner);
router.post("/add-user", addUserToPartner);
router.delete("/project/:id", removeProjectFromPartner);
router.delete("/user/:id", removeUserFromPartner);
module.exports = router;
