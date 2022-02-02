const solarData = require('../data/solarData');
var uuid = require('uuid');

const calculateCubage = async (components) => {

  if(!hasValidSolarInput({ components })){
    return Promise.reject(Error('Invalid cubage inputs'));
  }

  let cubage = 0;
  let totalGrossWeight = 0;
  let totalNetWeight = 0;

  for (const component of components) {
    const componentsResult = await solarData.getSolarComponent({ solarComponentId: component.id  })
    const findedComponent = componentsResult.find(el => el['solar_component_id'] === component.id);
    const logisticsDimensions =  await solarData.getLogisticsDimensionsSolarComponents({ 
      logisticDimensionId: findedComponent['logistic_dimension_id'] 
    });
    const finded = logisticsDimensions.find(el => el.logistic_dimension_id === findedComponent['logistic_dimension_id']);
    const { width, height, depth } = finded;
    
    cubage += (+width*+height*+depth*+component.quantidade);
    totalGrossWeight += +findedComponent['gross_weight'];
    totalNetWeight += +findedComponent['net_weight'];
  }

  return Promise.resolve({
    cubagem: cubage,
    pesoBruto: totalGrossWeight,
    pesoLiquido: totalNetWeight
  });
};

const createSolarComponent = async ({
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
 }) => {

  if(!hasValidSolarInput({
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
  })){
    return Promise.reject(Error('Invalid creation component inputs'));
  }

  const logisticDimensionId = uuid.v4();

  try {
    await solarData.createLogisticsDimensionsSolarComponent({ logisticDimensionId, height, width, depth });
  } catch (error) {
    return Promise.reject(Error('Logistic dimension creation invalid'));
  }

  return solarData.createSolarComponent({
    userId,
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
};

const updateSolarComponent = async ({
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
}) => {

  if(!hasValidSolarInput({
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
  })){
    return Promise.reject(Error('Invalid update component inputs'));
  }
  
  try {
    await solarData.updateLogisticsDimensionsSolarComponents({ logisticDimensionId, height, width, depth });
  } catch (error) {
    console.log(error.message);
    return Promise.reject(Error('Logistic dimension update invalid'));
  }

  return solarData.updateSolarComponent({
    solarComponentId,
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

}

const deleteSolarComponent = ({ solarComponentId }) => {
  if(!hasValidSolarInput({ solarComponentId })){
    return Promise.reject(Error('Invalid delete component inputs'));
  }

  return solarData.deleteSolarComponent({ solarComponentId })
};

const getSolarComponents = async ({ userId }) => {

  if(!hasValidSolarInput({ userId })){
    return Promise.reject(Error('Invalid get components inputs'));
  }

  let components = null;

  try {
    components = await solarData.getSolarComponents({ userId })
  } catch (error) {
    return Promise.reject(Error('Not found components'));
  }

  const completeComponents = components.map(async (component) => {
    const response = await solarData
      .getLogisticsDimensionsSolarComponents({ logisticDimensionId: component['logistic_dimension_id'] });

    const [ logisticsDimensions ] = response;

    return {
      id: component['solar_component_id'],
      logisticDimensionId: component['logistic_dimension_id'],
      name: component.name, 
      gtim: component.gtim,
      sector: component.sector,
      group: component.component_group,
      grossWeight: component.gross_weight,
      netWeight: component.net_weight,
      height: logisticsDimensions.height,
      width: logisticsDimensions.width,
      depth: logisticsDimensions.depth
    }
  })

  return { solarComponents: await Promise.all(completeComponents)};
};

const hasValidSolarInput = (values) => {
  return !Object.values(values).some(el => !el);
}

module.exports = {
  createSolarComponent,
  updateSolarComponent,
  deleteSolarComponent,
  getSolarComponents,
  calculateCubage
}
