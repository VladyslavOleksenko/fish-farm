const express = require("express")
const {createInsertSqlCommand, sendDataBaseQuery} = require("./../dataBase");
const {findUserByUserId} = require("./user")

const router = express.Router()
router.get("/", getFarm)
router.get("/ownFarms", getOwnFarms)
router.post("/create", createFarm)


async function getOwnFarms(request, response) {
  try {
    const owner = await findUserByUserId(request.query.userId)
    if (!owner) {
      const errorMessage = `No user with id ${request.query.userId}`
      response.status(404).json({message: errorMessage})
      return throwError(errorMessage)
    }

    const farms = await findFarmsByOwnerId(owner["user_id"])

    response.json({farms})
  } catch (exception) {
    response.status(500).json({message: exception})
    throwError("Can't get own farms")
    throwError(exception)
  }
}

async function createFarm(request, response) {
  try {
    const user = await findUserByUserId(request.body.userId)
    if (!user) {
      const errorMessage = `No user with id ${request.body.userId}`
      response.status(404).json({message: errorMessage})
      return throwError(errorMessage)
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
      request.body.name,
      request.body.description,
      request.body.userId
    ]

    const sqlCommand = createInsertSqlCommand(tableName, fieldNames, fieldValues)
    const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
    const newFarmId = dataBaseResponse.rows.insertId

    response.status(200).json({newFarmId})
  } catch (exception) {
    response.status(500).json({message: exception})
    throwError("Can't create a farm")
    throwError(exception)
  }
}

async function getFarm(request, response) {
  try {
    const farm = await findFarmById(request.query.farmId)
    if (!farm) {
      const errorMessage = `No farm with id ${request.query.farmId}`
      response.status(404).json({message: errorMessage})
      throwError(errorMessage)
    }

    response.json({farm})
  } catch (exception) {
    response.status(500).json({message: exception})
    throwError("Can't get farm")
    throwError(exception)
  }
}


async function findFarmsByOwnerId(ownerId) {
  const sqlCommand = `SELECT *
                      FROM farm
                      WHERE owner_id LIKE '${ownerId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)

  if (dataBaseResponse && dataBaseResponse.rows && dataBaseResponse.rows.length) {
    return formatFarmArray(dataBaseResponse.rows)
  }
  return null
}

async function findFarmById(farmId) {
  const sqlCommand = `SELECT *
                      FROM farm
                      WHERE farm_id LIKE '${farmId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)

  if (dataBaseResponse && dataBaseResponse.rows && dataBaseResponse.rows.length) {
    return formatFarm(dataBaseResponse.rows[0])
  }
  return null
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


function throwError(error) {
  console.log("Error: ", error)
}


module.exports = {
  router: router
}