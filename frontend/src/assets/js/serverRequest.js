import RequestParams from "@/assets/js/RequestParams";

async function sendServerRequest(requestParams) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(requestParams.method, requestParams.url)

    xhr.responseType = requestParams.responseType
    xhr.setRequestHeader("Content-Type", requestParams.contentType)

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
    "http://localhost:5000/api/farm/ownFarms?userId=" + userId
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


export async function getFarmWorkers(farmId) {
  const requestParams = new RequestParams(
    "GET",
    "http://localhost:5000/api/worker/byFarm?farmId=" + farmId
  )

  return await sendServerRequest(requestParams)
}


export async function getFarmAdministrators(farmId) {
  const requestParams = new RequestParams(
    "GET",
    "http://localhost:5000/api/administrator/byFarm?farmId=" + farmId
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