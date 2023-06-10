import mongoose from "mongoose";

const userScheme = mongoose.Schema({
    name:{type:String, require:true},
    email:{type:String, require:true},
    password:{ type : String, require:true},
    id:{type:String }
})




export default mongoose.model('User', userScheme );