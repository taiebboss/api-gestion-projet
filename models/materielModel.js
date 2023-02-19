const mongoose =require('mongoose');


const materielSchema=mongoose.Schema({

    code_materiel:{
        type:String,
        unique:true,
        trim:true,
        required:true

    },
    libelle:{
        type:String,
        required:true,
    },
    images:{
        type:Object,
        required:true

    }

},{
    timestamps:true
})

module.exports=mongoose.model('materiels',materielSchema)