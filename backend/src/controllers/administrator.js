const express = require("express")
const {createInsertSqlCommand, sendDataBaseQuery} = require("./../dataBase");
const {findFarmByFarmId} = require("./farm")
const {findUserByUserId, createUserObject} = require("./user");

const router = express.Router()
router.get("/byFarm", getAdministratorsByFarmId)


async function getAdministratorsByFarmId(request, response) {
  try {
    const farm = await findFarmByFarmId(request.query.farmId)
    if (!farm) {
      const errorMessage = `No farm with id ${request.query.farmId}`
      response.status(404).json({message: errorMessage})
      return throwError(errorMessage)
    }

    const sqlCommand = `SELECT *
                      FROM farm_administrator
                      WHERE farm_id LIKE '${request.query.farmId}'`
    const dataBaseResponse = await sendDataBaseQuery(sqlCommand)

    if (dataBaseResponse && dataBaseResponse.rows && dataBaseResponse.rows.length) {
      const administratorArray =
        await formatAdministratorArray(dataBaseResponse.rows)
      return response.status(200).json(administratorArray)
    }

    response.status(200).json([])
  } catch (exception) {
    response.status(500).json({message: exception})
    throwError(exception)
  }
}


async function formatAdministratorArray(administratorArray) {
  let newAdministratorArray = []
  for (let administrator of administratorArray) {
    newAdministratorArray.push(await formatAdministrator(administrator))
  }
  return newAdministratorArray
}

async function formatAdministrator(administrator) {
  const dbUser = await findUserByUserId(administrator["user_id"])
  const dbUserFormatted = createUserObject(dbUser)
  return {
    farmAdministratorId: administrator["farm_administrator_id"],
    farmId: administrator["farm_id"],
    addAdministratorAccess: !!administrator["add_administrator_access"],
    deleteAdministratorAccess: !!administrator["delete_administrator_access"],
    managePoolsAccess: !!administrator["manage_pools_access"],
    changeAccessesAccess: !!administrator["change_accesses_access"],
    userId: administrator["user_id"],
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