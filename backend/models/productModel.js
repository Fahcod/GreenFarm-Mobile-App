import mongoose from "mongoose";

// the product schema
const productSchema = new mongoose.Schema({
  title:{type:String,required:true},
  price:{type:Number,required:true},
  description:{type:String,required:true},
  store:{type:mongoose.Schema.Types.ObjectId,ref:"stores",required:true},
  images:{type:[{type:String}]},
  category:{type:String,required:true},
  quantity:{type:Number,required:true},
},{timestamps:true});

// the product model
const productModel = mongoose.models.products || mongoose.model("products",productSchema);
export default productModel