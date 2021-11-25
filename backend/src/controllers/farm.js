const express = require("express")
const {createInsertSqlCommand, sendDataBaseQuery} = require("./../dataBase");
const {getUserByUserId, formatUser} = require("./user")
const throwError = require("../errorHandler")

const router = express.Router()
router.get("/", getFarmRequest)
router.get("/ownFarms", getFarmArrayByOwnerIdRequest)
router.post("/create", createFarmRequest)
router.get("/owner", getFarmOwnerRequest)


async function getFarmRequest(request, response) {
  try {
    const farmId = request.query.farmId
    const farm = await getFarmByFarmId(farmId)
    response.json(farm)
  } catch (exception) {
    const message = "Can't get farm"
    response.status(500).json({message})
    throwError(message, exception)
  }
}

async function getFarmArrayByOwnerIdRequest(request, response) {
  try {
    const ownerId = request.query.userId
    const farmArray = await getFarmArrayByOwnerId(ownerId)
    const farmArrayFormatted = formatFarmArray(farmArray)
    response.json(farmArrayFormatted)
  } catch (exception) {
    const message = "Can't get farm array by owner id"
    response.status(500).json({message})
    throwError(message, exception)
  }
}

async function createFarmRequest(request, response) {
  try {
    const newFarmData = request.body
    const newFarmId = await createFarm(newFarmData)
    response.status(200).json({newFarmId})
  } catch (exception) {
    const message = "Can't create a farm"
    response.status(500).json({message})
    throwError(message, exception)
  }
}

async function getFarmOwnerRequest(request, response) {
  try {
    const farmId = request.query.farmId
    const farmOwner = await getFarmOwner(farmId)
    const farmOwnerFormatted = formatUser(farmOwner)
    response.status(200).json(farmOwnerFormatted)
  } catch (exception) {
    const message = "Can't get farm owner"
    response.status(500).json({message})
    throwError(message, exception)
  }
}


async function getFarmArrayByOwnerId(ownerId) {
  const sqlCommand = `SELECT *
                      FROM farm
                      WHERE owner_id LIKE '${ownerId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows
}

async function getFarmByFarmId(farmId) {
  const sqlCommand = `SELECT *
                      FROM farm
                      WHERE farm_id LIKE '${farmId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows[0]
}

async function getFarmOwner(farmId) {
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

async function createFarm(newFarmData) {
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


function formatFarmArray(farmArray) {
  let farmArrayFormatted = []
  for (let farm of farmArray) {
    farmArrayFormatted.push(formatFarm(farm))
  }
  return farmArrayFormatted
}

function formatFarm(farm) {
  return {
    farmId: farm["farm_id"],
    name: farm.name,
    description: farm.description,
    ownerId: farm["owner_id"]
  }
}


module.exports = {
  router: router,
  getFarmByFarmId
}