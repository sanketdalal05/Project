const mongoose = require("mongoose");
const cropschema = new mongoose.Schema({
  Crop_name: {
    type: String,
    required: [true, 'Name field is required'],
    trim: true
  },
  Crop_Type: {
    type: String,
    trim: true,
  },
  Price: {
    type: Number,
    trim: true,
    required: [true, "enter crop price per kg"]
  },
  Crop_quantity: {
    type: Number,
    required: true
  },
});
//  creating a new collection
const Crop = mongoose.model("crop", cropschema);

module.exports = Crop;