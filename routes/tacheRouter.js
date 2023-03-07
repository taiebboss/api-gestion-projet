const router=require('express').Router()
const tachCtrl=require('../controlles/tacheCtrl')

router.get('/tache',tachCtrl.getTaches);
router.get('/tache/:id',tachCtrl.getTacheById);

router.post('/tache',tachCtrl.creeTache)
router.put('/tache/:id',tachCtrl.updateTache)
router.put('/eta_update/:id',tachCtrl.update_etat_tache)
router.delete('/tache/:id',tachCtrl.deleteTache)
module.exports=router