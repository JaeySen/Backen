// const Organization = require('../model/organization');
// const OrganizationGroup = require('../model/organizations_groups');
const Partner = require('../model/partner');
const PartnerGroup = require('../model/partners_groups');
// const User = require('../model/user');
// const Project = require('../model/project');

const getPartnersByOwnerId = (req, res) => {
    Partner.find({ owner_id: req.params.owner }, '-owner_id')
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

const createPartner = (req, res) => {
    const newPartner = new Partner();
    newPartner.owner_id = req.body.owner;
    newPartner.description = req.body.description;
    newPartner.created_at = new Date().getTime();

    newPartner.save()
    .then((data) => {
        res.status(202).json({
          success: true,
          data: data
        })
    })
    .catch(() =>
        res.status(404).json({
            success: false,
            message: 'Create new partner failed!',
        })
    );
}

const getPartnerById = (partnerId) => {
    return new Promise((resolve, reject) => {
        PartnerGroup.findOne({ partner_id: partnerId })
        .then((data) => {
            resolve(data)
        })
        .catch((err) => {
            reject(new Error('An error occured when fetching partner with id: '+ err))
        })
    })
}

module.exports = {
    getPartnersByOwnerId,
    createPartner,
    getPartnerById
}