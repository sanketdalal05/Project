const mongoose = require("mongoose");
const validator = require('mongoose-validator');
const jwt = require('jsonwebtoken');
const bcrypt = ('bcryptjs');


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
        message: 'please enter valid email'
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
  },

}, { timestamps: true });

//generating token
// farmSchema.methods.generateAuthToken = async function(){
//   try {
//     //console.log(this.email);
//     const token = jwt.sign({email:this.email},"asdfgvbhjnkiuytrghjklopnmhgtwere");
//     this.tokens = this.tokens.concat({token});
//     await this.save();
//     return token;
//   } catch (error) {
//     console.log(error);
//   }
// }
// hashing password before save 
// farmSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// })

//  creating a new collection
const Farm = mongoose.model("farmer", farmSchema);

module.exports = Farm;