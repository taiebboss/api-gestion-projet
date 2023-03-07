const router=require('express').Router()
const projetCtrl=require('../controlles/projetCtrl')

router.get('/projet',projetCtrl.getProjets)
router.post('/projet',projetCtrl.creeProjet)

module.exports=router