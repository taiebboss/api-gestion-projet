const router=require('express').Router()
const userCtrl=require('../controlles/userCtrl')
const auth=require('../middleware/auth');
const authAdmin=require('../middleware/authadmin')
//router user
//router.post('/Ajouter',userCtrl.Ajouter)
router.route('/Ajouter').post(auth,authAdmin,userCtrl.Ajouter)

router.get('/getusers',userCtrl.getUsers)
router.get('/getuserbyid/:id',userCtrl.getUserById)
router.get('/finduser/:userId',userCtrl.findUser)
router.post('/login',userCtrl.login);
router.get('/logout',userCtrl.logout)
router.delete('/deletUser/:id',userCtrl.deleteUser)
router.put('/updateUser/:id',userCtrl.modifierUser)
router.get('/refresh_token',userCtrl.refreshToken)
router.get('/infor',auth,userCtrl.getUser)
module.exports=router