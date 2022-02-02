var uuid = require('uuid');
const db = require('../infrastructure/db');

const createLogisticsDimensionsSolarComponent = ({ logisticDimensionId, height, width, depth }) => {
  return db.query(`INSERT INTO logistics_dimensions 
    (logistic_dimension_id, height, width, depth, created_at, updated_at) 
    values($1, $2, $3, $4, $5, $6)`, [
    logisticDimensionId,
    height,
    width, 
    depth,    
    new Date().toISOString(),
    new Date().toISOString()
  ]);
}

const createSolarComponent = ({
  userId,
  logisticDimensionId,
  name, 
  gtim,
  sector,
  group,
  grossWeight,
  netWeight,
}) => {
  return db.query(`INSERT INTO solar_components 
    (solar_component_id, name, gtim, sector, component_group, gross_weight, net_weight, user_id, logistic_dimension_id, created_at, updated_at) 
    values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, [
    uuid.v4(),
    name, 
    gtim, 
    sector,
    group,
    grossWeight,
    netWeight,
    userId,
    logisticDimensionId,
    new Date().toISOString(),
    new Date().toISOString()
  ]);
}

const getSolarComponent = ({ solarComponentId }) => {
  return db.query('select * from solar_components where solar_component_id = $1 and disabled_at is null', [ solarComponentId ]);
}

const getSolarComponents = ({ userId }) => {
  return db.query('select * from solar_components where user_id = $1 and disabled_at is null', [ userId ]);
}

const getLogisticsDimensionsSolarComponents = ({ logisticDimensionId }) => {
  return db.query('select * from logistics_dimensions where logistic_dimension_id = $1', [ logisticDimensionId ]);
}

const updateSolarComponent = ({ 
  solarComponentId,
  name, 
  gtim,
  sector,
  group,
  grossWeight,
  netWeight,
}) => {
  return db.query(`update solar_components set name = $1, gtim = $2, sector = $3, 
    component_group = $4, gross_weight = $5, net_weight = $6, updated_at = $7
    where solar_component_id = $8`, [ name, gtim, sector, group, grossWeight, netWeight, new Date().toISOString(), solarComponentId ]);
}

const updateLogisticsDimensionsSolarComponents = ({ logisticDimensionId, height, width, depth  }) => {
  return db.query(`update logistics_dimensions set height = $1, width = $2, depth = $3, updated_at = $4
    where logistic_dimension_id = $5`, [ height, width, depth, new Date().toISOString(), logisticDimensionId ]);
}

const deleteSolarComponent = ({ solarComponentId }) => {
  return db.query('update solar_components set disabled_at = $1 where solar_component_id = $2', [ new Date().toISOString(), solarComponentId ]);
}

module.exports = {
  createSolarComponent,
  createLogisticsDimensionsSolarComponent,
  getSolarComponent,
  getSolarComponents,
  getLogisticsDimensionsSolarComponents,
  updateSolarComponent,
  updateLogisticsDimensionsSolarComponents,
  deleteSolarComponent
}