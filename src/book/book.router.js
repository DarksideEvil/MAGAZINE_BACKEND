const express = require('express');
const router = express.Router();
const { addBook, getBooks, getBook, editBook, deleteBook } = require('./book.controller');
const { addBookValidate, getBookValidate, editBookValidate, deleteBookValidate } = require('./book.validation');
const { verifyToken } = require('../util/auth');

// Get all books
router.get('/', getBooks);

// Get a book by ID
router.get('/:id', getBookValidate, getBook);

// Middleware to verify token
router.use(verifyToken);

// Add a new book
router.post('/', addBookValidate, addBook);

// Update a book by ID
router.put('/:id', editBookValidate, editBook);

// Delete a book by ID
router.delete('/:id', deleteBookValidate, deleteBook);

module.exports = router;