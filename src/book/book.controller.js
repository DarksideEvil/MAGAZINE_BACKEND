const bookModel = require('./book.model');
const { logError } = require('../setting/logs/extraLogger');

const addBook = async (req, res) => {
  try {
    const sameBook = await bookModel.findOne({ title: req.body.title });
    if (sameBook) {
      return res.status(400).json("This book is already available in the database! 🗒️");
    }

    const USER = req.user;
    if (USER && USER.role === 'admin') {
      const book = await bookModel.create(req.body);
      if (!book) {
        return res.status(400).json("Couldn't post new book 👎🏻");
      }
      return res.status(201).json(book);
    } else {
      return res.status(403).send("Prohibited ⛔");
    }
  } catch (err) {
    logError(err);
    return res.status(500).json(err.message);
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await bookModel.find().sort('-createdAt');
    if (!books) {
      return res.status(400).json("Couldn't get books 📚");
    }
    return res.status(200).json(books);
  } catch (err) {
    logError(err);
    return res.status(500).json(err.message);
  }
};

const getBook = async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id);
    if (!book) {
      return res.status(400).json("Couldn't get that book 📘");
    }
    return res.status(200).json(book);
  } catch (err) {
    logError(err);
    return res.status(500).json(err.message);
  }
};

const editBook = async (req, res) => {
  const USER = req.user;
  try {
    if (USER && USER.role === 'admin') {
      const book = await bookModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      if (!book) {
        return res.status(400).json("Couldn't update this book! ✏️");
      }
      return res.status(200).json(book);
    } else {
      return res.status(403).send("Prohibited ⛔");
    }
  } catch (err) {
    logError(err);
    return res.status(500).json(err.message);
  }
};

const deleteBook = async (req, res) => {
  const USER = req.user;
  try {
    if (USER.role === 'admin') {
      const book = await bookModel.findOneAndDelete({_id: req.params.id});
      if (!book) {
        return res.status(400).json("Couldn't delete this book ⁉️");
      }
      return res.status(200).json(book);
    } else {
      return res.status(403).send("Prohibited ⛔");
    }
  } catch (err) {
    logError(err);
    return res.status(500).json(err.message);
  }
};

module.exports = {
  addBook,
  getBooks,
  getBook,
  editBook,
  deleteBook
};