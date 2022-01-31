const solarService = require('../services/solarService')

const createSolarComponent = async (req, res, next) => {
  const { 
    userId= '',
    name = '', 
    gtim = '',
    sector = '',
    group = '',
    grossWeight = 0,
    netWeight = 0,
    height = 0,
    width = 0,
    depth = 0
  } = req.body;

  try {
    await solarService.createSolarComponent({ 
      userId,
      name, 
      gtim,
      sector,
      group,
      grossWeight,
      netWeight,
      height,
      width,
      depth
    })
  } catch (error) {
    res.sendStatus(200)
  }

}

const updateSolarComponent = async (req, res, next) => {

}

const deleteSolarComponent = async (req, res, next) => {

}

const getSolarComponents = async (req, res, next) => {

}

const getSolarComponent = async (req, res, next) => {

}


const signin = async (req, res, next) => {
  const { email = '', password = '' } = req.body;
  
  try {
    const response = await authService.singin({ email, password });
    console.log(response);
    res.json(response);
    next()
  } catch(e) {
    console.log(e.message);
    res.sendStatus(500) && next(e);
  }
}

module.exports = {
  createSolarComponent,
  updateSolarComponent,
  deleteSolarComponent,
  getSolarComponents,
  getSolarComponent
}