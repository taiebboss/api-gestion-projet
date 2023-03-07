const Users=require('../models/userModel')

const authadmin=async(req,res,next)=>{
    try {
        
        const user=await Users.findOne({_id:req.user.id}).populate('role','libelle').exec()

        if(user.role.libelle==='employe')
            return res.status(400).json({msg:"Admin resource acces denied."})
            next()
        
    } catch (err) {
        return res.status(500).json({msg:err.message})
        
    }

}

module.exports=authadmin