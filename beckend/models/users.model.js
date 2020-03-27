const mongoose =require('mongoose');
const bcrypt = require('bcrypt');

const Schema= mongoose.Schema
const friensdSchema = new Schema({friend: {type: String,trim:true,minlength: 3}});
const UserSchema = new Schema({

    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    friends: {
        type:[friensdSchema],
        default:undefined
    },

} ,{timestamps: true});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  
const User=mongoose.model('User',UserSchema);

module.exports=User;
