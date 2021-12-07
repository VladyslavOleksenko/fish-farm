module.exports = {
  getFarmArrayByOwnerId,
  getFarmArrayByEmployeeId,
  getFarmByFarmId,
  getFarmOwner,
  getUserPermissions,

  createFarm,

  deleteFarm,

  formatFarmArray,
  formatFarm,
}


async function getFarmArrayByOwnerId(ownerId) {
  const sqlCommand = `SELECT *
                      FROM farm
                      WHERE owner_id LIKE '${ownerId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows
}

async function getFarmArrayByEmployeeId(ownerId) {
  const sqlCommand =
    `SELECT farm.farm_id,
            farm.name,
            farm.description,
            farm.owner_id
     FROM farm,
          farm_worker
     WHERE farm_worker.user_id = ${ownerId}
       AND farm_worker.farm_id = farm.farm_id`

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

  const farmOwnerId = farm["owner_id"]
  const farmOwner = await userController.getUserByUserId(farmOwnerId)
  if (!farmOwner) {
    throw new Error(`No user with id ${farm["owner_id"]}`)
  }

  return farmOwner
}

async function getUserPermissions(farmId, userId) {
  const farm = await getFarmByFarmId(farmId)
  if (!farm) {
    throw new Error(`No farm with id ${farmId}`)
  }

  const user = await userController.getUserByUserId(userId)
  if (!user) {
    throw new Error(`No user with id ${userId}`)
  }

  if (farm["owner_id"] === user["user_id"]) {
    return getOwnerPermissions()
  }

  const administratorAccesses = await getAdministratorAccesses()
  if (administratorAccesses) {
    return getAdministratorPermissions(administratorAccesses)
  }

  return getWorkerPermissions()


  function getOwnerPermissions() {
    return {
      deleteFarm: true,
      managePools: true,
      seeInvites: true,
      addEmployees: true,
      deleteEmployees: true,
      changeAdministrator: true,
      changeWorker: true,
      dashboard: true
    }
  }

  async function getAdministratorAccesses() {
    let sqlCommand =
      `SELECT farm_administrator.manage_pools_access,
            farm_administrator.add_administrator_access,
            farm_administrator.delete_administrator_access,
            farm_administrator.change_accesses_access
     FROM farm,
          farm_administrator
     WHERE farm.farm_id = ${farmId}
       AND farm_administrator.user_id = ${userId}
       AND farm_administrator.farm_id = farm.farm_id`
    let dataBaseResponse = await sendDataBaseQuery(sqlCommand)

    if (dataBaseResponse.rows) {
      return dataBaseResponse.rows[0]
    }
    return null
  }

  function getAdministratorPermissions(administratorAccesses) {
    return {
      deleteFarm: false,
      managePools: administratorAccesses.managePoolsAccess,
      seeInvites: true,
      addEmployees: administratorAccesses.addAdministratorAccess,
      deleteEmployees: administratorAccesses.deleteAdministratorAccess,
      changeAdministrator: administratorAccesses.changeAccessesAccess,
      changeWorker: true,
      dashboard: true
    }
  }

  function getWorkerPermissions() {
    return {
      deleteFarm: false,
      managePools: false,
      seeInvites: false,
      addEmployees: false,
      deleteEmployees: false,
      changeAdministrator: false,
      changeWorker: false,
      dashboard: false
    }
  }
}


async function createFarm(newFarmData) {
  const user = await userController.getUserByUserId(newFarmData.userId)
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

async function deleteFarm(farmId) {
  const farm = getFarmByFarmId(farmId)
  if (!farm) {
    throw new Error(`No farm with id ${farmId}`)
  }

  await administratorController.deleteAllFarmAdministrators(farmId)
  await administratorController.deleteAllFarmInvites(farmId)
  await workerController.deleteAllFarmWorkers(farmId)
  await workerController.deleteAllFarmInvites(farmId)
  await poolController.deleteAllFarmPools(farmId)

  const sqlCommand = `DELETE
                      FROM farm
                      WHERE farm_id = ${farmId}`
  await sendDataBaseQuery(sqlCommand)
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


const {createInsertSqlCommand, sendDataBaseQuery} = require("./../dataBase");
const userController = require("./user")
const administratorController = require("./administrator");
const workerController = require("./worker");
const poolController = require("./pool")