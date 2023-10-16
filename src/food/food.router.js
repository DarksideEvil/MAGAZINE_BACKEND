const express = require('express');
const router = express.Router();
const {
  addFood,
  getFoods,
  getFood,
  editFood,
  deleteFood
} = require('../food/food.controller');
const {
  addFoodValidate,
  getFoodValidate,
  editFoodValidate,
  deleteFoodValidate
} = require('./food.validation');
const { verifyToken } = require('../util/auth');

router.get('/', getFoods);

router.get('/:id', getFoodValidate, getFood);

router.use(verifyToken);

router.post('/', addFoodValidate, addFood);

router.put('/:id', editFoodValidate, editFood);

router.delete('/:id', deleteFoodValidate, deleteFood);

module.exports = router;