const mongoose =require('mongoose')

const ProjetSchema=mongoose.Schema({

    titre_projet:{
        type:String,
        required:true,
        unique:true,     
        trim:true,
    },
    
    description_projet:{
        type:String,
        required:true,
 
        trim:true,
    },
    data_debut_projet:{
        type:String,
    },
    data_fin_projet:{
        type:String,
    },

  
    etat_projet:{
        type:String,
        default:'en_attente'
    },
      equipe:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "equipes",
    },
    tache:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "taches",
    }]

})

module.exports=mongoose.model("Projets",ProjetSchema)