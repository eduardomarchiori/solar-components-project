const express = require('express');
const router = express.Router();
const solarController = require('../controllers/solarController');

router.get('/solar-component', solarController.getSolarComponents);

router.get('/solar-component/:id', solarController.getSolarComponents);

router.post('/solar-component', solarController.createSolarComponent);

router.put('/solar-component', solarController.updateSolarComponent);

router.delete('/solar-component/:id', solarController.deleteSolarComponent);

module.exports = router;