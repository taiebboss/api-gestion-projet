const materiels=require('../models/materielModel');

const materielCtrl={

    Ajouter:async(req,res)=>{
        try {
            const {code_materiel, libelle,images}=req.body
            if(!images) return res.status(400).json({msg:'No image upload'})

            const materiel=await materiels.findOne({code_materiel});
            if(materiel) return res.status(400).json({msg:'Materiel already exists'})

            const newMateriel=new materiels({code_materiel, libelle,images})
            await newMateriel.save()
            res.json({msg:'Created a materiel', result:newMateriel})
            
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    getMaterials:async(req,res)=>{
            try {
                const materiel=await materiels.find();
                return res.json({ result:materiel})

            } catch (error) {
                return res.status(500).json({msg:error.message})
            }
        
    },
    deleteMateriel:async(req,res)=>{
        try {
            await materiels.findByIdAndDelete(req.params.id)
            
            res.json({msg:"Deleted a materile "})
            
        } catch (err) {
                return res.status(500).json({msg:err.message})            
        }
    },
}
module.exports=materielCtrl