const equipeCtrl=require('../controlles/equipeCtrl')

const router=require('express').Router()

router.post('/equipe',equipeCtrl.Ajouter)
router.get('/equipe',equipeCtrl.getEquipe)
router.get('/equipe/:id',equipeCtrl.getEquipeById)
router.delete('/equipe/:id',equipeCtrl.deleteEquipe)
router.put('/equipe/:id',equipeCtrl.ModifierEquipe)
module.exports=router