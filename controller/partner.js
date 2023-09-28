// const Organization = require('../model/organization');
// const OrganizationGroup = require('../model/organizations_groups');
const Partnership = require('../model/partnership');
// const User = require('../model/user');
// const Project = require('../model/project');

const getPartnersByOwnerId = (req, res) => {
    Partnership.find({ owner_id: req.params.owner }, '-owner_id')
    .then((data) => {
        res.status(200).json({
            success: true,
            data: data,
        });
    })
    .catch((err) => {
        res.status(404).json({ success: false, message: err });
    });
}

module.exports = {
    getPartnersByOwnerId
}