const mongoose = require('mongoose');

const tourScheme = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  price: {
    type: Number,
  },
  rating: {
    type: Number,
    default: 4,
  },
});

const Tour = mongoose.model('tours', tourScheme);

module.exports = Tour;
