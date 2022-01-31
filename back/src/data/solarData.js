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
    (solar_component_id, name, gtim, sector, group, grossWeight, netWeight, user_id, logistic_dimension_id, created_at, updated_at) 
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

const getUser = ({ email }) => {
  return db.query('select * from users where email = $1', [ email ]);
}

module.exports = {
  createSolarComponent,
  createLogisticsDimensionsSolarComponent
}