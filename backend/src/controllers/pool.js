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

const getPoolByPoolId = module.exports.getPoolByPoolId = async function(poolId) {
  const sqlCommand = `SELECT *
                      FROM pool
                      WHERE pool_id LIKE '${poolId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows[0]
}




const {createInsertSqlCommand, sendDataBaseQuery} = require("./../dataBase");
const {getFarmByFarmId} = require("./farm");