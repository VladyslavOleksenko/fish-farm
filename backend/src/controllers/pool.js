module.exports = {
  createPool,
  getPoolArray,
  getPoolByPoolId,
  changePoolData,

  deletePool,
  deleteAllFarmPools,

  formatPoolArray,
  formatPool,
}


async function createPool(newPoolData) {
  const farm = await farmController.getFarmByFarmId(newPoolData.farmId)
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

async function getPoolArray(farmId) {
  const farm = await farmController.getFarmByFarmId(farmId)
  if (!farm) {
    throw new Error(`No farm with id ${farmId}`)
  }

  const sqlCommand = `SELECT *
                      FROM pool
                      WHERE farm_id LIKE '${farmId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows
}

async function getPoolByPoolId(poolId) {
  const sqlCommand = `SELECT *
                      FROM pool
                      WHERE pool_id LIKE '${poolId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows[0]
}

async function changePoolData(poolData) {
  const poolId = poolData.poolId
  const candidate = await getPoolByPoolId(poolId)
  if (!candidate) {
    throw new Error(`No pool with id ${poolId}`)
  }

  if (!poolData.name) {
    throw new Error(`Not valid data`)
  }

  const sqlCommand = `UPDATE pool
                      SET name = '${poolData.name}'
                      WHERE pool_id = ${poolId}`
  await sendDataBaseQuery(sqlCommand)

  return getPoolByPoolId(poolId)
}


async function deletePool(poolId) {
  const sqlCommand = `DELETE
                      FROM pool
                      WHERE pool_id = ${poolId}`
  await sendDataBaseQuery(sqlCommand)
}

async function deleteAllFarmPools(farmId) {
  const sqlCommand = `DELETE
                      FROM pool
                      WHERE farm_id = ${farmId}`
  await sendDataBaseQuery(sqlCommand)
}


function formatPoolArray(poolArray) {
  let poolArrayFormatted = []
  for (let pool of poolArray) {
    poolArrayFormatted.push(formatPool(pool))
  }
  return poolArrayFormatted
}

function formatPool(pool) {
  return {
    poolId: pool["pool_id"],
    name: pool.name,
    farmId: pool["farm_id"]
  }
}


const {createInsertSqlCommand, sendDataBaseQuery} = require("./../dataBase");
const farmController = require("./farm");