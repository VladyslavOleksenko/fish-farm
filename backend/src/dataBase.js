const mysql = require("mysql2/promise")
const dataBaseConfig = require("./../appConfig").dataBaseConfig
const throwError = require("./errorHandler")


function createInsertSqlCommand(tableName, fieldNames, fieldValues) {
  if (fieldNames.length !== fieldValues.length) {
    throw new Error("fieldNames.length != fieldValues.length")
  }

  return `INSERT
          INTO ${tableName} ${createFieldNameStr()} VALUES ${createFieldValuesStr()};`

  function createFieldNameStr() {
    let fieldNamesStr = "("
    for (let fieldName of fieldNames) {
      if (fieldNamesStr !== "(") {
        fieldNamesStr += ", "
      }
      fieldNamesStr += "`" + fieldName + "`"
    }
    fieldNamesStr += ")"

    return fieldNamesStr
  }

  function createFieldValuesStr() {
    let fieldValuesStr = "("
    for (let fieldValue of fieldValues) {
      if (fieldValuesStr !== "(") {
        fieldValuesStr += ", "
      }
      const fieldValueNullStatus =
        (fieldValue === null || fieldValue === undefined)
      if (fieldValue === false) {
        fieldValue = 0
      }
      if (fieldValue === true) {
        fieldValue = 1
      }
      fieldValuesStr += (fieldValueNullStatus ? "NULL" : `'${fieldValue}'`)
    }
    fieldValuesStr += ")"

    return fieldValuesStr
  }
}


async function sendDataBaseQuery(sqlCommand) {
  try {
    const connection = await mysql.createConnection(dataBaseConfig);
    const [rows, fields] = await connection.execute(sqlCommand);
    await connection.end()

    return {rows, fields}
  } catch (exception) {
    const message = "DataBase error: " + exception
    throwError(message)
  }
}


module.exports = {
  createInsertSqlCommand,
  sendDataBaseQuery
}