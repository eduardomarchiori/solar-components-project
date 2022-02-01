const solarService = require('../services/solarService')

const calculateCubage = async (req, res, next) => {
  const { components } = req.body;

  try {
    const result = await solarService.calculateCubage(components);
    console.log(`Calculo de cubagem realizado com sucesso.`);
    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500) && next(error);
  }
}

const createSolarComponent = async (req, res, next) => {
  const { userId } = req;

  const { 
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
    });
    console.log(`Componente ${name} criado com sucesso.`);
    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500) && next(error);
  }

}

const updateSolarComponent = async (req, res, next) => {
  const { 
    solarComponentId,
    logisticDimensionId,
    name, 
    gtim,
    sector,
    group,
    grossWeight,
    netWeight,
    height,
    width,
    depth
  } = req.body;

  try {
    await solarService.updateSolarComponent({ 
      solarComponentId,
      logisticDimensionId,
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
    console.log(`Componente ${name} atualizado com sucesso.`);
    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500) && next(error);
  }

}

const deleteSolarComponent = async (req, res, next) => {
  const { id } = req.params;

  try {
    await solarService.deleteSolarComponent({ solarComponentId: id })
    console.log(`Componente do id ${id} deletado com sucesso.`);
    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500)
  }
}

const getSolarComponents = async (req, res, next) => {
  const { userId } = req;

  try {
    const response = await solarService.getSolarComponents({ userId })
    console.log(`Componentes do usuário ${userId} obtidos com sucesso.`);
    res.json(response);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500) && next(error);
  }
}

const getSolarComponent = async (req, res, next) => {
  console.log('algo');
}

module.exports = {
  createSolarComponent,
  updateSolarComponent,
  deleteSolarComponent,
  getSolarComponents,
  getSolarComponent,
  calculateCubage
}