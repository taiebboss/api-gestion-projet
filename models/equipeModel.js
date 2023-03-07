const mongoose =require('mongoose');

var EquipeSchema=new mongoose.Schema({
    nom_equipe:{
            type:String,
            required:true,
            unique:true,     
            trim:true,
        },
    membre:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        }
    ]
})

module.exports=mongoose.model('equipes',EquipeSchema)