const mongoose = require('mongoose');

const connectMongoDB = async (url) => {
    return await mongoose.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
}

module.exports = connectMongoDB;