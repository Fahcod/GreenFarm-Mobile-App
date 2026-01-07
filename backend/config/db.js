import mongoose from "mongoose";

// the function to connect to the db
export const connectDB = async ()=>{
  try {
 //try connecting to the databse
 await mongoose.connect(process.env.MONGO_URI);
 console.log('DB connected successfully 🎉')
    
  } catch (error) {
    console.log(error);
  }
}