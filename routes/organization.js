const express = require("express");
let router = express.Router();

const {
  getAllOrganization,
  createOrganization,
  deleteOrganization,
  createPartnership,
  addUserToPartner,
  removeProjectFromPartner,
  removeUserFromPartner,
  getAllPartnerByUserId,
  createProjectWithPartner,
  getAllPartnerByOrganizationId,
} = require("../controller/organization");
// const { getProjectsWithPartnerId } = require("../controller/project")

router.get("/", getAllOrganization);
router.get("/user/:id", getAllPartnerByUserId);
router.get("/:id/partners", getAllPartnerByOrganizationId)
// router.get("/owner:id", getProjectsWithPartnerId);
router.post("/", createOrganization);
router.post("/project", createProjectWithPartner);
router.delete("/:id", deleteOrganization);
router.post("/add-user", addUserToPartner);
router.post("/partnership", createPartnership);
router.delete("/project/:id", removeProjectFromPartner);
router.delete("/user/:id", removeUserFromPartner);
module.exports = router;
