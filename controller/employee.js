const Employee = require('../model/employee');

const HandleAddEmployee = (req, res) => {
  let employeeModel = new Employee();

  employeeModel.name = req.body.name;
  employeeModel.email = req.body.email;
  employeeModel.title = req.body.title;
  employeeModel.avatar = req.body.avatar;
  employeeModel.dept = req.body.dept;
  employeeModel.position = req.body.position;
  employeeModel.status = req.body.status;

  employeeModel
    .save()
    .then(() => {
      res.status(202).json({
        success: true,
        message: '1 Employee added Successfully',
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: err,
      });
    });
};

const HandleGetAllEmployee = (req, res) => {
  Employee.find({})
    .then((data) => {
      res.status(202).json({
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

const HandleGetEmployeeById = (req, res) => {
  Employee.findById(req.params.id)
    .exec()
    .then((data) => {
      res.status(202).json({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
};

const HandleUpdateEmployeeById = (req, res) => {
  // console.log(req.body, req.file, req.files);

  Employee.findByIdAndUpdate(req.params.id, {
    $set: {
      name: req.body.name,
      email: req.body.email,
      title: req.body.title,
      avatar: req.body.avatar,
      dept: req.body.dept,
      position: req.body.position,
      status: req.body.status,
    },
  })
    .then((data) => {
      res.status(202).json({
        success: true,
        message: '1 record is updated successfuly',
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: err,
      });
    });
};

const HandlePatchEmployeeById = (req, res) => {
  Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((data) => {
      res.status(202).json({
        success: true,
        message: 'Updated',
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: err,
      });
    });
};

const HandleDeleteEmployeeById = (req, res) => {
  Employee.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(202).json({
        success: true,
        message: '1 record deleted successfully',
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: err,
      });
    });
};

const HandleSearchEmployee = (req, res) => {
  // let regex = new RegExp(value.searchQuery,'i');
  // { $and: [ { $or: [{title: regex },{description: regex}] }, {category: value.category}, {city:value.city} ] }

  Employee.find({
    $or: [{ name: { $regex: req.params.key } }, { title: { $regex: req.params.key } }],
  })
    .then((data) => {
      res.status(202).json({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
};

module.exports = {
  HandleAddEmployee,
  HandleGetAllEmployee,
  HandleGetEmployeeById,
  HandleUpdateEmployeeById,
  HandlePatchEmployeeById,
  HandleDeleteEmployeeById,
  HandleSearchEmployee,
};
