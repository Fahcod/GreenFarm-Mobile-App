import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true,enum:["farmer","admin","business"]},
    profile_pic:{type:String,default:""},
    email:{type:String,required:true,unique:true,default:""},
    refreshToken:{type:String}
},{timestamps:true});

const userModel = mongoose.models.users || mongoose.model("users",userSchema);

export default userModel;