const express = require("express")
const {sendDataBaseQuery} = require("./../dataBase");
const {getUserByUserId, formatUser} = require("./user")
const {getFarmByFarmId} = require("./farm");
const logError = require("../errorHandler")

const router = express.Router()
router.get("/byFarm", getWorkerArrayRequest)


async function getWorkerArrayRequest(request, response) {
  try {
    const farmId = request.query.farmId
    const workerArray = await getWorkerArray(farmId)
    const workerArrayFormatted = await formatWorkerArray(workerArray)
    response.status(200).json(workerArrayFormatted)
  } catch (exception) {
    const message = "Can't get worker array"
    response.status(500).json({message})
    logError(message, exception)
  }
}


async function getWorkerArray(farmId) {
  const farm = await getFarmByFarmId(farmId)
  if (!farm) {
    throw new Error(`No farm with id ${farmId}`)
  }

  const sqlCommand = `SELECT *
                    FROM farm_worker
                    WHERE farm_id LIKE '${farmId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows
}


async function formatWorkerArray(workerArray) {
  let newWorkerArray = []
  for (let worker of workerArray) {
    newWorkerArray.push(await formatWorker(worker))
  }
  return newWorkerArray
}

async function formatWorker(worker) {
  const dbUser = await getUserByUserId(worker["user_id"])
  const dbUserFormatted = formatUser(dbUser)
  return {
    farmWorkerId: worker["farm_worker_id"],
    farmId: worker["farm_id"],
    roleName: worker["role_name"],
    userId: worker["user_id"],
    firstName: dbUserFormatted.firstName,
    lastName: dbUserFormatted.lastName,
    email: dbUserFormatted.email
  }
}


module.exports = {
  router,
}