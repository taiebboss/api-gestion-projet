const taches=require('../models/tache.model')

const tachCtrl={
creeTache:async(req,res)=>{

        try {
            const {titre,description,data_debut,data_fin,priorite,etat_tache}=req.body

            const tache=await taches.findOne({titre})
            if (tache) return res.status(400).json({msg:'tache already exists'})
            const newTache=new taches({titre,description,data_debut,data_fin,priorite,etat_tache})
            await newTache.save()
            res.json({msg:'Created a tache', result:newTache})
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }



},
getTaches:async(req,res)=>{
    try {
        const tache=await taches.find();
        res.json(tache)
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
},
getTacheById:async(req,res)=>{
    try {
        const tache=await taches.findById(req.params.id)
        if (!tache) return res.status(400).json({msg:'Tache does not exist'})
        res.json(tache)
        
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
},
updateTache:async(req,res)=>{
    try {
        const {titre,description,data_debut,data_fin,priorite,etat_tache}=req.body

        const TacheUpdate= await taches.findOneAndUpdate({_id:req.params.id},
            {titre,description,data_debut,data_fin,priorite,etat_tache})
            res.json({msg:'update a Tache',result:TacheUpdate})

    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
},
update_etat_tache:async(req,res)=>{

    try {
        const {etat_tache}=req.body
        const etat_update=await taches.findOneAndUpdate({_id:req.params.id},{etat_tache:etat_tache})
        res.json({msg:'update a etat Tache',result:etat_update})
    
        
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
 
},
deleteTache:async(req,res)=>{
    try {
        const id=req.params.id
        const findTache=await taches.findById(id)
        if (!findTache) return res.status(400).json({msg:'tache does not exist'})
        await taches.findByIdAndDelete({_id:id})
           res.json({msg:'tache deleted'})
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
},

}
module.exports=tachCtrl