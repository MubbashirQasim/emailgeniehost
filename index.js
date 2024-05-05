import express from 'express';
import cors from 'cors';

import mongoose from 'mongoose';
import router from './routes/api.js';

// import apiRoutes from './routes/api.js';

const app = express();
app.use(cors())
const url = 'mongodb+srv://mubbashirwebs:HUbCYU7AysBH2IKB@cluster0.i96dh3f.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(url , { useNewUrlParser: true}).then(()=>{
  // console.log(12)
  console.log('successfully connected')
}).catch((err)=>{
  console.log(err + 11)
})

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
// app.use('/api', apiRoutes);
app.use('/api', router);


const port = process.env.PORT || 3000;
app.listen(port,"0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});



