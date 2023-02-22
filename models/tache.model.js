const mongoose =require('mongoose')

const TacheSchema=new mongoose.Schema({

    titre:{
        type:String,
        required:true,
        unique:true,     
        trim:true,
    },
    
    description:{
        type:String,
        required:true,
 
        trim:true,
    },
    data_debut:{
        type:String,
    },
    data_fin:{
        type:String,
    },

    priorite:{
        type:Number,
        default:1
    },
    etat_tache:{
        type:String,
        default:'en_attente'
    }

})
module.exports=mongoose.model("taches",TacheSchema)