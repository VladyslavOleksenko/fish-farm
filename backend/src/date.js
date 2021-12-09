function prepareDateInputValueForDb(dateInputValue) {
  const dateString = new Date(Date.parse(dateInputValue)).toLocaleDateString()
  return Date.parse(dateString) || "NULL"
}

function getCurrentDateForDb() {
  return Date.parse(new Date().toLocaleDateString())
}

function getCurrentTimeForDb() {
  return new Date().toLocaleTimeString()
}


module.exports = {
  getCurrentDateForDb,
  getCurrentTimeForDb,
  prepareDateInputValueForDb
}