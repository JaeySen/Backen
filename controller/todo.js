const Todo = require('../model/todos');

/**
 * Get all `todos`.
 * @param {Request} req
 * @param {Response} res
 */
const getAllTodos = (req, res) => {
  const limit = req.params.limit || 10;
  Todo.find()
    .limit(limit)
    .then((resp) => {
      const status = resp.length > 0 ? 200 : 404;
      res.status(status).json({
        ok: true,
        data: resp,
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        message: err,
      });
    });
};

/**
 * Get one `todo`
 * @param {Request} req
 * @param {Response} res
 */
const getOneTodo = (req, res) => {
  const { id } = req.params;
  Todo.findById(id)
    .then((todo) => {
      const status = todo ? 200 : 404;
      return res.status(status).json({
        ok: true,
        todo,
      });
    })
    .catch((e) => {
      return res.status(400).json({
        ok: false,
        message: e,
      });
    });
};

/**
 * Add new `todo`.
 * @param {Request} req
 * @param {Response} res
 */
const addNewTodo = (req, res) => {
  const { title, description, assigner, assignee, priority, deadline } = req.body;

  const newTodo = new Todo({
    title,
    description,
    assigner,
    assignee,
    priority,
    deadline,
  });

  newTodo
    .save()
    .then((resp) => {
      res.status(201).json(resp);
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        message: err,
      });
    });
};

/**
 * Update a `todo`.
 * @param {Request} req
 * @param {Response} res
 */
const updateTodo = (req, res) => {
  const { id } = req.params;
  Todo.findByIdAndUpdate(id, req.body, {
    new: true,
  })
    .then((updated) => {
      res.status(202).json({
        ok: true,
        message: 'Updated',
        updated,
      });
    })
    .catch((err) => {
      res.status(404).json({
        ok: false,
        message: err,
      });
    });
};

/**
 * Remove a todo
 * @param {Request} req
 * @param {Response} res
 */
const deleteTodo = (req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then((deleted) => {
      res.status(202).json({
        ok: true,
        message: '1 record deleted successfully',
        deleted,
      });
    })
    .catch((err) => {
      res.status(404).json({
        ok: false,
        message: err,
      });
    });
};

/**
 * Find todo by title.
 * @param {Request} req
 * @param {Response} res
 */
const findTodoWithRegex = (req, res) => {
  const { query } = req.params;
  const title = {
    $regex: query,
    $options: 'i',
  };
  Todo.find({ title })
    .then((todos) => {
      return res.status(200).json({
        ok: true,
        todos,
      });
    })
    .catch((message) => {
      return res.status(400).json({
        ok: false,
        message,
      });
    });
};

module.exports = {
  getAllTodos,
  addNewTodo,
  deleteTodo,
  updateTodo,
  getOneTodo,
  findTodoWithRegex,
};
