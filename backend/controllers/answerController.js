import { asyncHandler } from "../utils/asyncHandler.js";
import answerModel from "../models/answerModel.js"


// the endpoint for answering a question
export const answerQuestion = asyncHandler(async (req,res)=>{
    // get the data
    const {user_id} = req.user;
    const {answer} = req.body
    // the id of the question being answered
    const {questionId} = req.params;
    if(!questionId) return res.status(404).json({message:"Question id is required"})

    // validate the answer
    if(!answer.trim()){
        return res.status(422).json({message:"Please answer can't be empty"})
    }else if (answer.length > 255){
        return res.status(160).json({message:"Please answer is too long"})
    }
    //check if the user already answered this
    let answerCheck = await answerModel.find({answered_by:user_id,answer:answer});
    if(answerCheck){res.status(400).json({message:"You already answered this question"})}
    // create the new answer
    let newAnswer = new answerModel({
        answered_by:user_id,
        answer:answer,
        question_id:questionId
    });

    await newAnswer.save();
    let populatedAnswer = await newAnswer.populate("answered_by","name profile_pic");

    res.status(201).json({data:populatedAnswer})
});


// the endpoint for deleting a review
export const deleteAnswer = asyncHandler(async (req,res)=>{
    const {answerId} = req.params;
    const {user_id} = req.user;

    // check answer id existance
    if(!answerId) return res.status(404).json({message:"Answer id not found"});
    let questionData = await answerModel.findById(answerId);
    
    if(!questionData){
        return res.status(404).json({message:"Answer does not exist"})
    }
    //make sure the user owns this answer
    if(questionData.answered_by.toString() !== user_id){
        return res.status(403).json({message:"Sorry, this answer isn't yours"})
    }
    //if all things are okay, delete and also confirm deletion
    let deletedQuestion = await answerModel.deleteOne({_id:answerId});
    if(!deletedQuestion.deletedCount > 0){
        return res.status(500).json({message:"Failed to delete answer"})
    }
});

// the endpoint for fetching answers for a question
export const fetchAnswers = asyncHandler( async (req,res)=>{
    const {skip,questionId} = req.query;
    // the limit to specify the maximum documents to fetch
    const LIMIT = 25;

    if(!questionId) return res.status(404).json({message:'Question id was not found'});
    let result = await answerModel.find({question_id:questionId})
    .populate("answered_by","name profile_pic").skip(skip).limit(LIMIT)

    res.status(200).json({data:result})
});