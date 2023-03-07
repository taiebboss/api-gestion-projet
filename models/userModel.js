const mongoose =require('mongoose')

const userSchema= new mongoose.Schema({
    nom:{
        type:String,
        require:true,
        trim:true,
    },
    prenom:{
        type:String,
        require:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
       
    },
    adress:{
        type:String,
        required:true,
       
    },
    role:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "roles",
    },

}
,{
    timestamps:true
})

module.exports=mongoose.model('Users',userSchema)