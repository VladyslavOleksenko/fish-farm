import RequestParams from "@/assets/js/RequestParams";

async function sendServerRequest(requestParams) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(requestParams.method, requestParams.url);

    xhr.responseType = requestParams.responseType;
    xhr.setRequestHeader("Content-Type", requestParams.contentType);

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response)
      } else {
        resolve(xhr.response);
      }
    }

    xhr.onerror = () => {
      reject(xhr.response);
    }

    if (requestParams.stringify) {
      requestParams.body = JSON.stringify(requestParams.body);
    }

    xhr.send(requestParams.body);
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