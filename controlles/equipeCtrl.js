const equipes=require('../models/equipeModel')

const equipeCtrl={

    Ajouter:async(req,res)=>{
        try {
            const {nom_equipe,membre}=req.body

            const equipe=await equipes.findOne({nom_equipe})
             if(equipe) return res.status(400).json({msg:'equipe already exists'})
            if (membre.length===0) return res.status(400).json({msg:'membre is not empty'})
             const newEquipe= new equipes({nom_equipe,membre})
             await newEquipe.save()
             res.json({msg:'Created a equipe', result:newEquipe})

        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
        },
    getEquipe:async(req,res)=>{
        try {
            const equipe=await equipes.find();
            return res.json({ result:equipe})
        } catch (error) {
            return res.status(500).json({msg:error.message}) 
        }
    },
    getEquipeById:async(req,res)=>{
        try {
        
            const id=req.params.id
            const findEquipe=await equipes.findById(id)
            if (!findEquipe) return res.status(400).json({msg:'equipe does not exist'})
            res.json(findEquipe)
        } catch (error) {
            return res.status(500).json({msg:error.message}) 
        }
    },
    deleteEquipe:async(req,res)=>{
        try {
            const id=req.params.id
            const findEquipe=await equipes.findById(id)
            if (!findEquipe) return res.status(400).json({msg:'equipe does not exist'})
        await equipes.findByIdAndDelete({_id:id})
           res.json({msg:'Equipe deleted'})
        } catch (error) {
            return res.status(500).json({msg:error.message}) 
        }
    },
    ModifierEquipe:async(req,res)=>{
      try {
        const {nom_equipe,membre}=req.body
        if(nom_equipe===null) return res.status(400).json({msg:'nom is not empty'})
        if (membre.length===0) return res.status(400).json({msg:'membre is not empty'})

        const equipeUpdate= await equipes.findOneAndUpdate({_id:req.params.id},
            {nom_equipe,membre})

        res.json({msg:'update a equipe',result:equipeUpdate})
        
      } catch (error) {
        return res.status(500).json({msg:error.message}) 
      }
    }
    }
    module.exports=equipeCtrl
