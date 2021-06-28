const mongoose = require("mongoose");
const cropschema = new mongoose.Schema({
  Crop_name: {
    type: String,
    required: [true, 'Name field is required'],
    trim: true
  },
  customerid: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, 'enter customer id']
  },
  Crop_Type: {
    type: String,
    trim: true,
    required: [true, 'enter crop_type']
  },
  Price: {
    type: Number,
    required: [true, "enter crop price"]
  },
  Crop_quantity: {
    type: Number,
    required: [true, "enter crop quantity"]
  }
});
//  creating a new collection
const Crop = mongoose.model("crop", cropschema);

module.exports = Crop;