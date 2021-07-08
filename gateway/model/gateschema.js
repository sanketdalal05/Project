const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Schema
const apiSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

apiSchema.methods.generateAuthToken = async function(){
    try {

      const token = jwt.sign({username:this.username},'asdfghjklpoiuytrewqzxcvbnmasdfgh');
      return token;
    } catch (error) {
      console.log(error);
    }
}
  
  
  //bcrypting
apiSchema.pre('save',async function(next){
    if(this.isModified('password')){
    this.password = await  bcrypt.hash(this.password,10);
    }
    next();
})

const Adb = mongoose.model('Api', apiSchema);
module.exports = Adb;