const getFarmArrayByOwnerId = module.exports.getFarmArrayByOwnerId = async function(ownerId) {
  const sqlCommand = `SELECT *
                      FROM farm
                      WHERE owner_id LIKE '${ownerId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows
}

const getFarmByFarmId = module.exports.getFarmByFarmId = async function(farmId) {
  const sqlCommand = `SELECT *
                      FROM farm
                      WHERE farm_id LIKE '${farmId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows[0]
}

const getFarmOwner = module.exports.getFarmOwner = async function(farmId) {
  const farm = await getFarmByFarmId(farmId)
  if (!farm) {
    throw new Error(`No farm with id ${farmId}`)
  }

  const farmOwner = await getUserByUserId(farm["owner_id"])
  if (!farmOwner) {
    throw new Error(`No user with id ${farm["owner_id"]}`)
  }

  return farmOwner
}

const createFarm = module.exports.createFarm = async function(newFarmData) {
  const user = await getUserByUserId(newFarmData.userId)
  if (!user) {
    throw new Error(`No user with id ${newFarmData.userId}`)
  }

  const tableName = "farm"
  const fieldNames = [
    "farm_id",
    "name",
    "description",
    "owner_id"
  ]
  const fieldValues = [
    null,
    newFarmData.name,
    newFarmData.description,
    newFarmData.userId
  ]

  const sqlCommand = createInsertSqlCommand(tableName, fieldNames, fieldValues)
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows.insertId
}

const deleteFarm = module.exports.deleteFarm = async function(farmId) {
  const farm = getFarmByFarmId(farmId)
  if (!farm) {
    throw new Error(`No farm with id ${farmId}`)
  }

  await deleteAllFarmAdministrators(farmId)
  await deleteAllFarmWorkers(farmId)

  const sqlCommand = `DELETE
                      FROM farm
                      WHERE farm_id = ${farmId}`
  await sendDataBaseQuery(sqlCommand)
}


const formatFarmArray = module.exports.formatFarmArray = function(farmArray) {
  let farmArrayFormatted = []
  for (let farm of farmArray) {
    farmArrayFormatted.push(formatFarm(farm))
  }
  return farmArrayFormatted
}

const formatFarm = module.exports.formatFarm = function(farm) {
  return {
    farmId: farm["farm_id"],
    name: farm.name,
    description: farm.description,
    ownerId: farm["owner_id"]
  }
}


const {createInsertSqlCommand, sendDataBaseQuery} = require("./../dataBase");
const {getUserByUserId} = require("./user")
const {deleteAllFarmWorkers} = require("./worker");
const {deleteAllFarmAdministrators} = require("./administrator");