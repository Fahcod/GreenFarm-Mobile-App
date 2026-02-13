import mongoose from "mongoose";

// the advert schema
const advertSchema = new mongoose.Schema({
    title:{type:String,required:true},
    image:{type:String,required:true},
    link:{type:String,required:true},
    description:{type:String,required:true},
    created_by:{type:mongoose.Types.ObjectId,required:true},
    target_audience:{type:String,enum:["all","farmers","sellers"],
    required:true},
    start_date:{type:Date,required:true},
    end_date:{type:Date,required:true},
    clicks_count:{type:Number,default:0}
},{timestamps:true});

// the advert model
const advertModel = mongoose.models.adverts || mongoose.model("adverts",advertSchema);
export default advertModel;