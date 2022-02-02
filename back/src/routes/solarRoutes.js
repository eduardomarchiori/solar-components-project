const express = require('express');
const router = express.Router();
const solarController = require('../controllers/solarController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/solar-component/calculate', authMiddleware.verifyJWT, solarController.calculateCubage);

router.get('/solar-component', authMiddleware.verifyJWT, solarController.getSolarComponents);

router.post('/solar-component', authMiddleware.verifyJWT, solarController.createSolarComponent);

router.put('/solar-component', authMiddleware.verifyJWT, solarController.updateSolarComponent);

router.delete('/solar-component/:id', authMiddleware.verifyJWT, solarController.deleteSolarComponent);

module.exports = router;