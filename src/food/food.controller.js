const foodModel = require('../food/food.model');
const { logError } = require('../setting/logs/extraLogger');

const addFood = async (req, res) => {
  try {
    const sameFood = await foodModel.exists({ title: req.body.title });
    if (sameFood) {
      return res.status(400).send("This food is already available in the database!");
    }

    const USER = req.user;
    if (USER && USER.role === "admin") {
      const food = await foodModel.create(req.body);
      if (!food) {
        return res.status(400).send("Couldn't post new food!");
      }
      res.status(201).json(food);
    } else {
      return res.status(403).send("Prohibited ⛔");
    }
  } catch (err) {
    logError(err);
    return res.status(400).send(err.message);
  }
};

const getFoods = async (req, res) => {
  try {
    const foods = await foodModel.find().sort("-createdAt");
    if (!foods) {
      return res.status(400).send("Couldn't get foods! 🍴");
    }
    res.status(200).json(foods);
  } catch (err) {
    logError(err);
    return res.status(400).send(err.message);
  }
};

const getFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);
    if (!food) {
      return res.status(400).send("Couldn't get that food 🍔");
    }
    res.status(200).json(food);
  } catch (err) {
    logError(err);
    return res.status(400).send(err.message);
  }
};

const editFood = async (req, res) => {
  const USER = req.user;
  try {
    if (USER && USER.role === "admin") {
      const food = await foodModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      if (!food) {
        return res.status(400).send("Couldn't update this food! ✏️");
      }
      res.status(200).json(food);
    } else {
      return res.status(403).send("Prohibited ⛔");
    }
  } catch (err) {
    logError(err);
    return res.status(400).send(err.message);
  }
};

const deleteFood = async (req, res) => {
  const USER = req.user;
  try {
    if (USER.role === "admin") {
      const food = await foodModel.findOneAndDelete({
        _id: req.params.id,
      });
      if (!food) {
        return res.status(400).send("Couldn't delete this food ⁉️");
      }
      res.status(200).json(food);
    } else {
      return res.status(403).send("Prohibited ⛔");
    }
  } catch (err) {
    logError(err);
    return res.status(400).send(err.message);
  }
};

module.exports = {
  addFood,
  getFoods,
  getFood,
  editFood,
  deleteFood,
};