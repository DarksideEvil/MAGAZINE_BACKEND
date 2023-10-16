const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_HOST)
    console.log('DB connected...');
  } catch (err) {
    console.error('Failed to connect to DB:', err);
    throw err; // or handle the error in a more appropriate way
  }
};