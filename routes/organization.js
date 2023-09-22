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
  getAllProjectByOrganizationId,
  createProjectWithPartner,
  getAllPartnerByOrganizationId,
} = require("../controller/organization");

router.get("/", getAllOrganization);
router.get("/user/:id", getAllPartnerByUserId);
router.get("/:organizationId", getAllProjectByOrganizationId);
router.post("/", createOrganization);
router.post("/project", createProjectWithPartner);
router.delete("/:id", deleteOrganization);
router.post("/add-user", addUserToPartner);
router.post("/partnership", createPartnership);
router.delete("/project/:id", removeProjectFromPartner);
router.delete("/user/:id", removeUserFromPartner);
module.exports = router;
