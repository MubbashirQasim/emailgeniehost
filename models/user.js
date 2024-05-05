
import mongoose from 'mongoose';

const loginSchema =new mongoose.Schema({
   
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }

})

 const User =new mongoose.model('User',loginSchema)
 export default User