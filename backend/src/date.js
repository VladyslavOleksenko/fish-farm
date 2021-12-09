function prepareDateInputValueForDb(dateInputValue) {
  return Date.parse(dateInputValue) || "NULL"
}

function getCurrentDateForDb() {
  return Date.parse(new Date().toDateString())
}

function getCurrentTimeForDb() {
  return new Date().toLocaleTimeString()
}


module.exports = {
  getCurrentDateForDb,
  getCurrentTimeForDb,
  prepareDateInputValueForDb
}