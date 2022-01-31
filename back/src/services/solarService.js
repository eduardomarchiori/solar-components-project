const solarData = require('../data/solarData');
var uuid = require('uuid');

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

  const logisticDimensionId = uuid.v4();

  try {
    await solarData.createLogisticsDimensionsSolarComponent({ logisticDimensionId, height, width, depth })
  } catch (error) {
    return Promise.reject(Error('Logistic dimension invalid.'));
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

const updateSolarComponent = ({ email }) => userData.getUser({ email });

const deleteSolarComponent = ({ email }) => userData.getUser({ email });

const getSolarComponents = ({ email }) => userData.getUser({ email });

const getSolarComponent = ({ email }) => userData.getUser({ email });

module.exports = {
  createSolarComponent,
  updateSolarComponent,
  deleteSolarComponent,
  getSolarComponents,
  getSolarComponent
}
