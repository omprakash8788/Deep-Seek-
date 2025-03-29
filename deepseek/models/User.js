
// First import mongoose
import mongoose from "mongoose";


// After that we will create Schema where we will defined the structure of our data.
//Note - Schema() This is called Schema constructor 
const UserSchema = new mongoose.Schema(
    //In object we will store all the property which we will store in the data.
    {
     _id:{
        type:String,
        required:true
     },

     name:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true
     },
     image:{
        type:String,
        required:false
     },
    },
    // Adding timestamps because whenever we added data it add by deafult time.
    {timestamps:true}
)

// So we have created the user schema, now using this user schema we will create the user model

// Create user model.
const User = mongoose.models.User || mongoose.model("User", UserSchema)
// "User" - This is user model name 
//UserSchema- This is user Schema 
// mongoose.model("User", UserSchema) - Think if this user model is already created this satement will try to create model again, so solved this one just use || operator  "mongoose.models.User ||"  so if any user model is already avaliable it will be added inside "User" variable .

// After that export User
export default User;

// So now we have created the user model using that we can store the user data in our MongoDB database.
