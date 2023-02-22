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
            nom:{ type: String },
            role:{type:String}
        }
    ]
})

module.exports=mongoose.model('equipes',EquipeSchema)