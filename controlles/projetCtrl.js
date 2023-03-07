const projets=require('../models/projetModel')

const projetsCtrl={
        creeProjet:async(req,res)=>{
            try {
                const {titre_projet,description_projet,data_debut_projet,
                                    data_fin_projet,etat_projet,equipe,tache}=req.body
                const projet=await projets.findOne({titre_projet});
                if (projet) return res.status(400).json({msg:'projet already exists'})
                    if (equipe.length===0) res.status(400).json({msg:'equipe is not empty'})
                const newProjet=new projets({titre_projet,description_projet,data_debut_projet,
                    data_fin_projet,etat_projet,equipe,tache});

                    await newProjet.save()
                    res.json({msg:'Created a projet', result:newProjet})

            } catch (error) {
                return res.status(500).json({msg:error.message})
            }
        },
    getProjets:async(req,res)=>{
        try {
            const projet=await projets.find();
            res.json(projet)
            
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    }
}
module.exports=projetsCtrl