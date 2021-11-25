const express = require("express")
const {createInsertSqlCommand, sendDataBaseQuery} = require("./../dataBase");
const {findFarmByFarmId} = require("./farm")
const {findUserByUserId, createUserObject} = require("./user")

const router = express.Router()
router.get("/byFarm", getWorkersByFarmId)


async function getWorkersByFarmId(request, response) {
  try {
    const farm = await findFarmByFarmId(request.query.farmId)
    if (!farm) {
      const errorMessage = `No farm with id ${request.query.farmId}`
      response.status(404).json({message: errorMessage})
      return throwError(errorMessage)
    }

    const sqlCommand = `SELECT *
                      FROM farm_worker
                      WHERE farm_id LIKE '${request.query.farmId}'`
    const dataBaseResponse = await sendDataBaseQuery(sqlCommand)

    if (dataBaseResponse && dataBaseResponse.rows && dataBaseResponse.rows.length) {
      const workerArray = await formatWorkerArray(dataBaseResponse.rows)
      return response.status(200).json(workerArray)
    }

    response.status(200).json([])
  } catch (exception) {
    response.status(500).json({message: exception})
    throwError(exception)
  }
}


async function formatWorkerArray(workerArray) {
  let newWorkerArray = []
  for (let worker of workerArray) {
    newWorkerArray.push(await formatWorker(worker))
  }
  return newWorkerArray
}

async function formatWorker(worker) {
  const dbUser = await findUserByUserId(worker["user_id"])
  const dbUserFormatted = createUserObject(dbUser)
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


function throwError(error) {
  console.log("Error: ", error)
}


module.exports = {
  router,
}