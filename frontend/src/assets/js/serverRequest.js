import RequestParams from "@/assets/js/RequestParams";

async function sendServerRequest(requestParams) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(requestParams.method, requestParams.url)

    xhr.responseType = requestParams.responseType
    if (requestParams.contentType) {
      xhr.setRequestHeader("Content-Type", requestParams.contentType)
    }

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response)
      } else {
        resolve(xhr.response)
      }
    }

    xhr.onerror = () => reject(xhr.response)

    if (requestParams.method === "GET" || requestParams.method === "DELETE") {
      return xhr.send()
    }

    if (requestParams.stringify) {
      requestParams.body = JSON.stringify(requestParams.body)
    }

    xhr.send(requestParams.body)
  });
}


export async function register(body) {
  const requestParams = new RequestParams(
    "POST",
    "http://localhost:5000/api/user/register",
    body
  )

  return await sendServerRequest(requestParams)
}

export async function login(body) {
  const requestParams = new RequestParams(
    "POST",
    "http://localhost:5000/api/user/login",
    body
  )

  return await sendServerRequest(requestParams)
}

export async function changeUserData(userData) {
  const requestParams = new RequestParams(
    "PUT",
    "http://localhost:5000/api/user/data",
    userData
  )

  return await sendServerRequest(requestParams)
}


export async function getFarm(farmId) {
  const requestParams = new RequestParams(
    "GET",
    "http://localhost:5000/api/farm?farmId=" + farmId
  )

  return await sendServerRequest(requestParams)
}

export async function getOwnFarms(userId) {
  const requestParams = new RequestParams(
    "GET",
    "http://localhost:5000/api/farm/own?userId=" + userId
  )

  return await sendServerRequest(requestParams)
}

export async function getOtherFarms(userId) {
  const requestParams = new RequestParams(
    "GET",
    "http://localhost:5000/api/farm/other?userId=" + userId
  )

  return await sendServerRequest(requestParams)
}

export async function createFarm(userId, name, description) {
  const requestParams = new RequestParams(
    "POST",
    "http://localhost:5000/api/farm/create",
    {userId, name, description}
  )

  return await sendServerRequest(requestParams)
}

export async function getFarmOwner(farmId) {
  const requestParams = new RequestParams(
    "GET",
    "http://localhost:5000/api/farm/owner?farmId=" + farmId
  )

  return await sendServerRequest(requestParams)
}

export async function deleteFarm(farmId) {
  const requestParams = new RequestParams(
    "DELETE",
    "http://localhost:5000/api/farm?farmId=" + farmId
  )

  return await sendServerRequest(requestParams)
}


export async function getFarmAdministrators(farmId) {
  const requestParams = new RequestParams(
    "GET",
    "http://localhost:5000/api/administrator?farmId=" + farmId
  )

  return await sendServerRequest(requestParams)
}

export async function getFarmAdministratorInvites(farmId) {
  const requestParams = new RequestParams(
    "GET",
    "http://localhost:5000/api/administrator/invite?farmId=" + farmId
  )

  return await sendServerRequest(requestParams)
}

export async function inviteAdministrator(invitorData) {
  const requestParams = new RequestParams(
    "POST",
    "http://localhost:5000/api/administrator/invite",
    invitorData
  )

  return await sendServerRequest(requestParams)
}

export async function changeAdministrator(administratorData) {
  const requestParams = new RequestParams(
    "PUT",
    "http://localhost:5000/api/administrator",
    administratorData
  )

  return await sendServerRequest(requestParams)
}

export async function changeAdministratorInvite(invitorData) {
  const requestParams = new RequestParams(
    "PUT",
    "http://localhost:5000/api/administrator/invite",
    invitorData
  )

  return await sendServerRequest(requestParams)
}

export async function deleteAdministrator(farmAdministratorId) {
  const requestParams = new RequestParams(
    "DELETE",
    "http://localhost:5000/api/administrator?farmAdministratorId=" +
    farmAdministratorId
  )

  return await sendServerRequest(requestParams)
}

export async function deleteAdministratorInvite(administratorInviteId) {
  const requestParams = new RequestParams(
    "DELETE",
    "http://localhost:5000/api/administrator/invite?" +
    "administratorInviteId=" + administratorInviteId
  )

  return await sendServerRequest(requestParams)
}


export async function getFarmWorkers(farmId) {
  const requestParams = new RequestParams(
    "GET",
    "http://localhost:5000/api/worker?farmId=" + farmId
  )

  return await sendServerRequest(requestParams)
}

export async function getFarmWorkerInvites(farmId) {
  const requestParams = new RequestParams(
    "GET",
    "http://localhost:5000/api/worker/invite?farmId=" + farmId
  )

  return await sendServerRequest(requestParams)
}

export async function inviteWorker(invitorData) {
  const requestParams = new RequestParams(
    "POST",
    "http://localhost:5000/api/worker/invite",
    invitorData
  )

  return await sendServerRequest(requestParams)
}

export async function changeWorker(workerData) {
  const requestParams = new RequestParams(
    "PUT",
    "http://localhost:5000/api/worker",
    workerData
  )

  return await sendServerRequest(requestParams)
}

export async function changeWorkerInvite(invitorData) {
  const requestParams = new RequestParams(
    "PUT",
    "http://localhost:5000/api/worker/invite",
    invitorData
  )

  return await sendServerRequest(requestParams)
}

export async function deleteWorker(farmWorkerId) {
  const requestParams = new RequestParams(
    "DELETE",
    "http://localhost:5000/api/worker?farmWorkerId=" +
    farmWorkerId
  )

  return await sendServerRequest(requestParams)
}

export async function deleteWorkerInvite(workerInviteId) {
  const requestParams = new RequestParams(
    "DELETE",
    "http://localhost:5000/api/worker/invite?" +
    "workerInviteId=" + workerInviteId
  )

  return await sendServerRequest(requestParams)
}


export async function getPoolArray(farmId) {
  const requestParams = new RequestParams(
    "GET",
    "http://localhost:5000/api/pool?farmId=" + farmId,
  )

  return await sendServerRequest(requestParams)
}

export async function createPool(farmId, name) {
  const requestParams = new RequestParams(
    "POST",
    "http://localhost:5000/api/pool/create",
    {farmId, name}
  )

  return await sendServerRequest(requestParams)
}

export async function changePool(poolData) {
  const requestParams = new RequestParams(
    "PUT",
    "http://localhost:5000/api/pool",
    poolData
  )

  return await sendServerRequest(requestParams)
}

export async function deletePool(poolId) {
  const requestParams = new RequestParams(
    "DELETE",
    "http://localhost:5000/api/pool?poolId=" + poolId
  )

  return await sendServerRequest(requestParams)
}


export async function getTaskArrayByFarmWorker(farmWorkerId) {
  const requestParams = new RequestParams(
    "GET",
    "http://localhost:5000/api/task/byFarmWorker?farmWorkerId=" +
    farmWorkerId
  )

  return await sendServerRequest(requestParams)
}

export async function createTask(newTaskData) {
  const requestParams = new RequestParams(
    "POST",
    "http://localhost:5000/api/task",
    newTaskData
  )

  return await sendServerRequest(requestParams)
}

export async function deleteTask(taskId) {
  const requestParams = new RequestParams(
    "DELETE",
    "http://localhost:5000/api/task?taskId=" + taskId
  )

  return await sendServerRequest(requestParams)
}