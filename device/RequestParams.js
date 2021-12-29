class RequestParams {
  constructor(method = "GET", url = "/", body = null) {
    this.method = method;
    this.url = url;
    this.body = body;
    this.responseType = "json";
    this.contentType = "application/json";
    this.stringify = true;
  }
}

module.exports = RequestParams