const router=require('express').Router()
const tachCtrl=require('../controlles/tacheCtrl')

router.get('/tache',tachCtrl.getTaches);
router.post('/tache',tachCtrl.creeTache)

module.exports=router