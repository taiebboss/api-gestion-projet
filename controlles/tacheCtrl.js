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
}
}
module.exports=tachCtrl