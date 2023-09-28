const express = require('express');
const router = express.Router();
const {
  getAllTodos,
  addNewTodo,
  deleteTodo,
  updateTodo,
  getOneTodo,
  findTodoWithRegex,
} = require('../controller/todo');

router.get('/getAllTodos', getAllTodos);
router.get('/getOne/:id', getOneTodo);
router.post('/addNewTodo', addNewTodo);
router.delete('/deleteTodo/:id', deleteTodo);
router.put('/updateTodo/:id', updateTodo);
router.get('/findByTitle/:query', findTodoWithRegex);

module.exports = router;
