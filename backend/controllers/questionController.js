import questionModel from "../models/questionModel.js"
import { asyncHandler } from "../utils/asyncHandler.js";


// the endpoint for asking a question
export const askQuestion = asyncHandler(async (req,res)=>{
    //get the data
    const {question} = req.body;
    const {user_id} = req.user;

    // validate the question
    if(!question.trim()){
        return res.status(422).json({message:"Please question can't be empty"})
    }else if (question.length > 255){
        return res.status(160).json({message:"Please question is too long"})
    }
    //check whether the user already asked that
    let questionCheck = await questionModel.find({
        asked_by:user_id,
        question:question
    });
    // if the user already asked that, throw an error
    if(questionCheck){
        return res.status(400).json({message:"You aready asked this"})
    }
    // create the question
    let newQuestion = new questionModel({
        asked_by:user_id,
        question:question,
        files:['http://']
    });
    // save the question
    await newQuestion.save();
    let populatedQuestion = await newQuestion.populate("asked_by","name profile_pic");

    res.status(201).json({data:populatedQuestion})
});


//endpoint for deleting a question
export const deleteQuestion = asyncHandler( async (req,res)=>{
    const {questionId} = req.params;
    const {user_id} = req.user;

    // check questionId id existance
    if(!questionId) return res.status(404).json({message:"Question id not found"});
    let questionData = await questionModel.findById(questionId);
    
    if(!questionData){
        return res.status(404).json({message:"Question does not exist"})
    }
    //make sure the user owns this question
    if(questionData.created_by.toString() !== user_id){
        return res.status(403).json({message:"Sorry, this question isn't yours"})
    }
    //if all things are okay, delete and also confirm deletion
    let deletedQuestion = await questionModel.deleteOne({_id:questionId});
    if(!deletedQuestion.deletedCount > 0){
        return res.status(500).json({message:"Failed to delete review"})
    }
});

// endpoint for fetching user questions, with cursor based pagination
export const fetchUserQuestions = asyncHandler(async (req,res)=>{
    const {user_id} = req.user;
    const {after} = req.query;

    let query = {asked_by:user_id};
    if(after){
        query._id = {$gt:after};
    }

    const LIMIT = 10;
    // below is the query filter
    let result = await questionModel.find(query).populate("asked_by","name profie_pic")
    .sort({_id:1}).limit(LIMIT)

    res.status(200).json({data:result})
});

// endpoint for all fetching questions, with cursor based pagination
export const fetchAllQuestions = asyncHandler(async (req,res)=>{
    const {after} = req.query;

    let query = {}
    if(after){query._id = {$gt:after}}

    const LIMIT = 10;
    // below is the query filter
    let result = await questionModel.find(query).populate("asked_by","name profie_pic")
    .sort({_id:-1}).limit(LIMIT)

    res.status(200).json({data:result})
});