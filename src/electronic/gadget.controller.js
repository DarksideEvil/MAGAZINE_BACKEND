const electronicModel = require('./gadget.model');
const { logError } = require('../setting/logs/extraLogger');

const addElectronic = async (req, res) => {
  const sameElectronic = await electronicModel.exists({ title: req.body.title });
  if (sameElectronic) {
    return res.status(400).send("This gadget's available in the database!");
  }

  const USER = req.user;
  try {
    if (USER && USER.role === 'admin') {
      const electronic = await electronicModel.create(req.body);
      if (!electronic) {
        return res.status(400).send("Couldn't post a new gadget!");
      }
      res.status(201).json(electronic);
    } else {
      return res.status(403).send('Prohibited ⛔');
    }
  } catch (err) {
    logError(err);
    return res.status(400).send(err.message);
  }
};

const getElectronics = async (req, res) => {
  try {
    const electronics = await electronicModel.find().sort('-createdAt');
    res.status(200).json(electronics);
  } catch (err) {
    logError(err);
    return res.status(400).send(err.message);
  }
};

const getElectronic = async (req, res) => {
  try {
    const electronic = await electronicModel.findById(req.params.id);
    if (!electronic) {
      return res.status(400).send("Couldn't get that gadget 🖥️");
    }
    res.status(200).json(electronic);
  } catch (err) {
    logError(err);
    return res.status(400).send(err.message);
  }
};

const editElectronic = async (req, res) => {
  const USER = req.user;
  try {
    if (USER && USER.role === 'admin') {
      const electronic = await electronicModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      if (!electronic) {
        return res.status(400).send("Couldn't update this gadget! ✏️");
      }
      res.status(200).json(electronic);
    } else {
      return res.status(403).send('Prohibited ⛔');
    }
  } catch (err) {
    logError(err);
    return res.status(400).send(err.message);
  }
};

const deleteElectronic = async (req, res) => {
  const USER = req.user;
  try {
    if (USER.role === 'admin') {
      const electronic = await electronicModel.findOneAndDelete({
        _id: req.params.id,
      });
      if (!electronic) {
        return res.status(400).send("Couldn't delete this gadget ⁉️");
      }
      res.status(200).json(electronic);
    } else {
      return res.status(403).send('Prohibited ⛔');
    }
  } catch (err) {
    logError(err);
    return res.status(400).send(err.message);
  }
};

module.exports = {
  addElectronic,
  getElectronics,
  getElectronic,
  editElectronic,
  deleteElectronic,
};