const mongoose = require('mongoose');

const connectMongoDB = async (url) => {
  return await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  });
};

module.exports = connectMongoDB;
