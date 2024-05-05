
import mongoose from 'mongoose';

const emailBank =new mongoose.Schema({
   
    Name:String

})

 const EmailBank =new mongoose.model('EmailBank',emailBank)
 export default EmailBank