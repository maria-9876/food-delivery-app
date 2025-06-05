import mongoose from "mongoose";

export const  connectDB = async () =>{

   await mongoose.connect('mongodb+srv://mariajoseph2211:abd1234@cluster0.62erjfc.mongodb.net/food-del')
.then(()=>console.log("DB Connected"));
   
}


// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.