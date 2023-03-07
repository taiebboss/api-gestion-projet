require('dotenv').config()
const express=require('express');
const cookieParser=require('cookie-parser')
const cors =require('cors');
const fileUpload =require('express-fileupload')
const mongoose=require('mongoose')


const userRouter =require('./routes/userRouter')
const materielRouter=require('./routes/materielRouter')
const upload=require('./routes/upload')
const roleRouter=require('./routes/roleRouter')
const equipeRouter=require('./routes/equipeRouter')
const tacheRouter=require('./routes/tacheRouter')
const ProjetRouter=require('./routes/projetRouter')

const app=express();

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles:true
}))
// Routers
app.use('/user',userRouter) 
app.use('/materiel',materielRouter)
app.use('/upload',upload)
app.use('/role',roleRouter)
app.use('/equipe',equipeRouter)
app.use('/tache',tacheRouter)
app.use('/projet',ProjetRouter)
app.get('/',(req,res)=>{
    res.json({msg:'welcom to my app'})
})

//connect to mongodb

const URI=process.env.mongo_db

mongoose.connect(URI,{
  
    useNewUrlParser:true,
    useUniFiedTopology:true

},err=>{
    if(err) throw err;
    console.log('Connect to Mongo DB ')
})
const Port=process.env.Port || 5000
app.listen(Port,()=>{
    console.log('Server is running on port ',Port)
})