const mongoose = require("mongoose");
const connection = require('../util/database')

const house = new mongoose.Schema({
    name: {type: String ,required: true},
    photos: [String],
    status: {type: String},
  })
  
  const House = connection.model('House', house);
  module.exports = House;