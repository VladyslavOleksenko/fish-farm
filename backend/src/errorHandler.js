module.exports = (customErrorMessage, exception) => {
  console.log("------- ERROR -------")
  console.log(customErrorMessage)
  if (exception) {
    console.log(exception)
  }
  console.log("---------------------")
}