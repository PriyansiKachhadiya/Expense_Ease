const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    firstName: { type: String },
    lastName: { type: String },
    profilePicture: { type: String },
    role: { type: String, default: 'user' },
    phoneNumber: { type: Number },
    preferences: {
        darkMode: { type: Boolean, default: false },
        notifications: { type: Boolean, default: true },
      },
      monthlyLimit: { type: Number, default: 0 },
      currency: { type: String, default: 'USD' },
      createdAt: { type: Date, default: Date.now },

});


module.exports = mongoose.model("User",userSchema);
