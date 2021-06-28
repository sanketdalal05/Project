const mongoose = require("mongoose");
const validator = require('mongoose-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const dealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field is required'],
        trim: true,
    },
    email: {
        type: String,
        lowercase: [true, 'enter a lowercase'],
        unique: [true, "Email already exist"],
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
        required: [true, "enter password"],
    },
    phone: {
        type: String,
        minlength: 10,
        maxlength: 10,
        required: [true, "properly type phone number"],
        // unique: [true, 'already exist']
    },

    Address: {
        State: {
            type: String,
            required: true,
        },
        City: {
            type:String,
            required: true
        },

        Pincode: {
            type: Number,
            length: 6,
            required: [true, "please enter pincode"],
        }
    },
    cropscart: {
		type: Array,
		required: true
	}

}, { timestamps: true });


dealSchema.methods.generateAuthToken = async function(){
    try {
      //console.log(this.email);
      const token = jwt.sign({email:this.email},'asdfghjklpoiuytrewqzxcvbnmasdfgh');
      //this.tokens = this.tokens.concat({token});
      //await this.save();
      return token;
    } catch (error) {
      console.log(error);
    }
  }


const dealer = mongoose.model('dealer', dealSchema);
module.exports = dealer;