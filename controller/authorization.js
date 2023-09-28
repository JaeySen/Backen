const Authorization = require('../model/authorization');
const Author = require('../model/authorization');
/**
 * @param { Request} req
 * @param { Response} res
 */

const getAllAuthorizations = (req, res) => {
  Author.find({})
    .then((data) => {
      res.status(200).json({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: err,
      });
    });
};

const createAuthorization = (req, res) => {
  const newAuthor = new Author();
  newAuthor.name = req.body.name;
  newAuthor.role = req.body.role;

  newAuthor
    .save()
    .then((data) => {
      res.status(200).json({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: err.message,
      });
    });
};

const deleteAuthorization = (req, res) => {
  Author.deleteOne({ _id: req.params.idAuthor })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Deleted successfully',
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: err.message,
      });
    });
};

module.exports = {
  getAllAuthorizations,
  createAuthorization,
  deleteAuthorization,
};
