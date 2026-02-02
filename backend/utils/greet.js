

export const greetUser = (name,time) =>{
   if(time === "morning"){
      return `Good morning, ${name}`
   }else if (time === "afternoon"){
      return `Good afternoon, ${name}`
   }else if (time === "evening"){
      return `Good evening, ${name}`
   }
}

export const signupUser = (name,email)=>{
    return({
        name:name,
        email:email
    })
}

export const fetchUser = async (id) =>{
    return(
      {
         _id:id,
         name:"Fahad Coder",
         email:"twesigyefahad94@gmail.com",
         password:"JOuilhf.$78bvhk48bdef4.$/888732",
         profile_pic:'http://mybackend/assets/his-profile.jpg'
      }
    )
}

