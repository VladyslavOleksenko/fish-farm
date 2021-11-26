getWorkerArray =
  module.exports.getWorkerArray =
    async function (farmId) {
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

getWorkersIdArray =
  module.exports.getWorkersIdArray =
    async function (farmId) {
      const workerArray = await getWorkerArray(farmId)
      if (!workerArray) {
        throw new Error(`Can't get worker array ${farmId}`)
      }

      let workersIdArray = []
      for (let worker of workerArray) {
        workersIdArray.push(worker["farm_worker_id"])
      }
      return workersIdArray
    }

deleteAllFarmWorkers =
  module.exports.deleteAllFarmWorkers =
    async function (farmId) {
      const farmWorkersIdArray = await getWorkersIdArray(farmId)
      for (let farmWorkerId of farmWorkersIdArray) {
        await deleteFarmWorker(farmWorkerId)
      }
    }

deleteFarmWorker =
  module.exports.deleteFarmWorker =
    async function (farmWorkerId) {
      const sqlCommand = `DELETE
                          FROM farm_worker
                          WHERE farm_worker_id = ${farmWorkerId}`
      await sendDataBaseQuery(sqlCommand)
    }

addWorker =
  module.exports.addWorker =
    async function (userId, invitorData) {
      const tableName = "farm_worker"
      const fieldNames = [
        "farm_worker_id",
        "farm_id",
        "user_id",
        "role_name"
      ]
      const fieldValues = [
        null,
        invitorData.farmId,
        userId,
        invitorData.roleName
      ]

      const sqlCommand = createInsertSqlCommand(tableName, fieldNames, fieldValues)
      const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
      return dataBaseResponse.rows.insertId
    }

createWorkerInvite =
  module.exports.createWorkerInvite =
    async function (invitorData) {
      const tableName = "worker_invite"
      const fieldNames = [
        "worker_invite_id",
        "email",
        "farm_id",
        "role_name"
      ]
      const fieldValues = [
        null,
        invitorData.email,
        invitorData.farmId,
        invitorData.roleName
      ]

      const sqlCommand = createInsertSqlCommand(tableName, fieldNames, fieldValues)
      const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
      return dataBaseResponse.rows.insertId
    }

checkInviteWorkerAvailability =
  module.exports.checkInviteWorkerAvailability =
    async function (email, farmId) {
      const sqlCommand = `SELECT *
                          FROM worker_invite
                          WHERE email LIKE '${email}'
                            AND farm_id = ${farmId}`
      console.log(sqlCommand)
      const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
      return !dataBaseResponse.rows.length
    }


formatWorkerArray =
  module.exports.formatWorkerArray =
    async function (workerArray) {
      let newWorkerArray = []
      for (let worker of workerArray) {
        newWorkerArray.push(await formatWorker(worker))
      }
      return newWorkerArray
    }

formatWorker =
  module.exports.formatWorker =
    async function (worker) {
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

inviteWorker =
  module.exports.inviteWorker =
    async function (farm, invitorData) {
      const inviteWorkerAvailability =
        await checkInviteWorkerAvailability(
          invitorData.email, invitorData.farmId)
      if (!inviteWorkerAvailability) {
        const errorMessage = "The worker already invited to farm " +
          invitorData.farmId
        throw new Error(errorMessage)
      }

      await createWorkerInvite(invitorData)
      await sendInviteWorkerMail(invitorData.email, farm.name)
      return "worker invited"
    }


const {sendDataBaseQuery, createInsertSqlCommand} = require("./../dataBase");
const {getUserByUserId, formatUser} = require("./user")
const {getFarmByFarmId} = require("./farm");
const {sendInviteWorkerMail} = require("../mailer");