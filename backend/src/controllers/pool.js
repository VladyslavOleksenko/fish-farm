const createPool = module.exports.createPool = async function(newPoolData) {
  const farm = await getFarmByFarmId(newPoolData.farmId)
  if (!farm) {
    throw new Error(`No farm with id ${newPoolData.farmId}`)
  }

  const tableName = "pool"
  const fieldNames = [
    "pool_id",
    "farm_id",
    "name"
  ]
  const fieldValues = [
    null,
    newPoolData.farmId,
    newPoolData.name
  ]

  const sqlCommand = createInsertSqlCommand(tableName, fieldNames, fieldValues)
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows.insertId
}

const getPoolArray = module.exports.getPoolArray = async function(farmId) {
  const farm = await getFarmByFarmId(farmId)
  if (!farm) {
    throw new Error(`No farm with id ${farmId}`)
  }

  const sqlCommand = `SELECT *
                      FROM pool
                      WHERE farm_id LIKE '${farmId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows
}

const getPoolByPoolId = module.exports.getPoolByPoolId = async function(poolId) {
  const sqlCommand = `SELECT *
                      FROM pool
                      WHERE pool_id LIKE '${poolId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows[0]
}

const deletePool = module.exports.deletePool = async function(poolId) {
  const sqlCommand = `DELETE
                      FROM pool
                      WHERE pool_id = ${poolId}`
  await sendDataBaseQuery(sqlCommand)
}


const formatPoolArray = module.exports.formatPoolArray = function(poolArray) {
  let poolArrayFormatted = []
  for (let pool of poolArray) {
    poolArrayFormatted.push(formatPool(pool))
  }
  return poolArrayFormatted
}

const formatPool = module.exports.formatPool = function (pool) {
  return {
    poolId: pool["pool_id"],
    name: pool.name,
    farmId: pool["farm_id"]
  }
}




const {createInsertSqlCommand, sendDataBaseQuery} = require("./../dataBase");
const {getFarmByFarmId} = require("./farm");