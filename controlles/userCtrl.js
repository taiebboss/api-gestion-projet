const Users =require('../models/userModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')

const userCtrl={
    Ajouter:async(req,res)=>{
        try {
            const {nom,prenom,email,password,adress,role}=req.body
        const user=await Users.findOne({email})
        if (user) return res.status(400).json({mgs:' email existe'})
        if (password.length<6) return res.status(400).json({msg:'password is at 6 charecters long'})

        //password Encryption
        const passwordHash= await bcrypt.hash(password,10)
        const newUser=new Users({nom,prenom,email,password:passwordHash,adress,role})
        //res.status(200).json({result:newUser})
                //save to mongoDB 
        newUser.save();
        res.status(200).json({result:newUser})
      /* const accessToken=createAccessToken({id:newUser._id})
       const refreshtoken=createRefreshToken({id:newUser._id})
       res.cookie('refreshtoken',refreshtoken,{
        httpOnly:true,
        path:'/user/refresh_token'
    })
    res.json({accessToken})*/
  
        } catch (error) {
            return  res.status(500).json({msg:error.message})
        }
    },
    login:async(req,res)=>{
        try {
            const {email,password}=req.body;
            const user=await Users.findOne({email}).populate('role','libelle').exec()
            if (!user) return res.status(400).json({msg:"User does not exist."})
            const isMatch =await bcrypt.compare(password,user.password)
            if(!isMatch) return res.status(400).json({msg:"Incorrect password"})
            
         //if login success , create access token an refresh token

         const accessToken=createAccessToken({id:user._id})
         const refreshtoken=createRefreshToken({id:user._id})
         
         res.cookie('refreshtoken',refreshtoken,{
             httpOnly:true,
             path:'/user/refresh_token'
         })


         
res.json({...user._doc,accessToken})
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
       logout:async(req,res)=>{
        try {
            res.clearCookie('refreshtoken',{ path:'/user/refresh_token'})
            return res.json({msg:'logged out'})
            
        } catch (err) {
            return  res.status(500).json({msg:err.message})
            
        }
    },
    getUserById:async(req,res)=>{
        try {
            const id=req.params.id
            const user=await Users.findById(id).populate('role','libelle').exec()
            if (!user) return res.status(400).json({msg:'User does not exist'})
            res.json( user)
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    getUsers:async(req,res)=>{
        try {
            const user=await Users.find().populate('role','libelle').exec()
            if (!user) return res.status(400).json({msg:'User does not exist'})
            let  tab = user.filter(item => item.role.libelle !=='admin' )
            res.json( tab)
          
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
  findUser : async (req, res) => {
        try {
            const { userId } = req.params;
            if (!userId) return res.status(400).json({ message: "ERROR ID!" });
            const result = await Users.findById(userId).populate('role','libelle').exec()
                    console.log(result.role.libelle)
            return res.status(200).json({ message: "Success", result});
        } catch (err) {
            res.status(500).json({ message: "INTERNAL ERROR SERVER!" });
            console.log(err.message);
        }
    },

    deleteUser:async(req,res)=>{
        
        try {
            const id=req.params.id
            const user=await Users.findById(id)
            if (!user) return res.status(400).json({msg:'User does not exist'})
            await Users.findOneAndDelete({_id:id})
            return res.status(200).json({msg:'User deleted'})
            
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    modifierUser:async(req,res)=>{

    try {
        const {nom,prenom,email,password,adress,role}=req.body
        
        if (password.length<6) return res.status(400).json({msg:'password is at 6 charecters long'})

        const passwordHash= await bcrypt.hash(password,10)
       const userUpdate= await Users.findOneAndUpdate({_id:req.params.id},
                                        {nom,prenom,email,password:passwordHash,adress,role:role})
        
                    res.json({msg:'update a user',result:userUpdate})
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
    },
    refreshToken:(req,res)=>{
        try{
            const rf_token=req.cookies.refreshtoken
            if(!rf_token) return res.status(400).json({msg:"Please Login or register"})
            jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
                if (err) return res.status(400).json({msg:"Please Login or Register"})
                const accesstoken=createAccessToken({id:user.id})
                res.json({accesstoken})
            })
           // res.json({rf_token}) 
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
      
    },
    getUser:async(req,res)=>{
        try {
            const user=await Users.findById(req.user.id).select('-password').populate('role','libelle').exec()
            if (!user) return res.status(400).json({msg:'User does not exist'})
            res.json( user)
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
}
const createAccessToken=(user)=>{
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1d'})
 }

 const createRefreshToken=(user)=>{
    return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'7d'})
 }
module.exports=userCtrl