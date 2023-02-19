const mongoose =require('mongoose')

const roleSchema=mongoose.Schema({
    libelle:{
        type:String,
        required:true,
        trim:true,
    unique:true
    }
},{
    timestamps:true
})

module.exports=mongoose.model("roles",roleSchema)