const mongoose = require("mongoose");
const validator = require('mongoose-validator')
const farmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
    trim: true,
  },
  email: {
    type: String,
    lowercase: [true, 'enter a lowercase'],
    trim: true,
    validate: [
      validator({
        validator: 'isEmail',
        message: 'Oops..please enter valid email'
      })]
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 16,
    trim: true,
    required: [true, "enter password"],
  },
  phone: {
    type: Number,
    min: 10,
    required: true,
    unique: true
  },

  Address: {
    State: {
      type: String,
      required: true,
    },
    City: String,
    Pincode: {
      type: Number,
      length: 6,
      required: [true, "please enter pincode"],
    }

  },
  Banking: {

    Bank_Name: String,
    Account_Number: String,
    IFSC_Code: String
  },
  UPI: {
    upiid: String
  }

});
//  creating a new collection
const Farm = mongoose.model("farmer", farmSchema);

module.exports = Farm;