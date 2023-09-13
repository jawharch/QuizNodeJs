const express=require('express')
const app=express()


const mongoose=require('mongoose')
const authRouter=require('./routes/auth')

const dotenv=require('dotenv')
dotenv.config()

const cors=require('cors')
const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json())


  
const userRouter=require('./routes/user')


mongoose.connect(process.env.MONGO_URL).then(()=>console.log('DB connection successfully')).catch((err)=>console.log(err))
app.use('/auth',authRouter)
app.use('/user',userRouter)

  
app.listen(process.env.PORT ||5001,()=>console.log("running"))