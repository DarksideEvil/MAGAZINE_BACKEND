const mongoose = require('mongoose');

module.exports = async () => {
   await mongoose.connect(process.env.MONGO_HOST)
    .then(() => console.log('DB connected...'))
    .catch((err) => console.log('not connected DB', err, console.log(err.message)));
}