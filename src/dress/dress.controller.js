const dressModel = require('./dress.model');
const { logError } = require('../setting/logs/extraLogger');

const addDress = async (req, res) => {
  try {
    const sameDress = await dressModel.findOne({ title: req.body.title });
    if (sameDress) {
      return res.status(400).send("This dress is already available in the database!");
    }

    const USER = req.user;
    if (USER && USER.role === 'admin') {
      const dress = await dressModel.create(req.body);
      if (!dress) {
        return res.status(400).send("Couldn't post new dress!");
      }
      res.status(201).json(dress);
    } else {
      return res.status(403).send('Prohibited ⛔');
    }
  } catch (err) {
    logError(err);
    return res.status(400).send(err.message);
  }
};

const getDresses = async (req, res) => {
  try {
    const dresses = await dressModel.find().sort('-createdAt');
    if (!dresses) {
      return res.status(400).send("Couldn't get dresses!");
    }
    res.status(200).json(dresses);
  } catch (err) {
    logError(err);
    return res.status(400).send(err.message);
  }
};

const getDress = async (req, res) => {
  try {
    const dress = await dressModel.findById(req.params.id);
    if (!dress) {
      return res.status(400).send("Couldn't get that dress!");
    }
    res.status(200).json(dress);
  } catch (err) {
    logError(err);
    return res.status(400).send(err.message);
  }
};

const editDress = async (req, res) => {
  const USER = req.user;
  try {
    if (USER && USER.role === 'admin') {
      const dress = await dressModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!dress) {
        return res.status(400).send("Couldn't update this dress!");
      }
      res.status(200).json(dress);
    } else {
      return res.status(403).send('Prohibited ⛔');
    }
  } catch (err) {
    logError(err);
    return res.status(400).send(err.message);
  }
};

const deleteDress = async (req, res) => {
  const USER = req.user;
  try {
    if (USER.role === 'admin') {
      const dress = await dressModel.findByIdAndDelete(req.params.id);
      if (!dress) {
        return res.status(400).send("Couldn't delete this dress!");
      }
      res.status(200).json(dress);
    } else {
      return res.status(403).send('Prohibited ⛔');
    }
  } catch (err) {
    logError(err);
    return res.status(400).send(err.message);
  }
};

module.exports = {
  addDress,
  getDresses,
  getDress,
  editDress,
  deleteDress
};