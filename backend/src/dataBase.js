const mysql = require("mysql2/promise")
const dataBaseConfig = require("./../appConfig").dataBaseConfig


module.exports.createInsertSqlCommand = (tableName, fieldNames, fieldValues) => {
  if (fieldNames.length !== fieldValues.length) {
    throw new Error("fieldNames.length != fieldValues.length")
  }

  return `INSERT INTO ${tableName} ${createFieldNameStr()} VALUES ${createFieldValuesStr()};`

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
      fieldValuesStr += (fieldValue ? `'${fieldValue}'` : "NULL")
    }
    fieldValuesStr += ")"

    return fieldValuesStr
  }
}


module.exports.sendDataBaseQuery = async (sqlCommand) => {
  try {
    const connection = await mysql.createConnection(dataBaseConfig);
    const [rows, fields] = await connection.execute(sqlCommand);
    await connection.end()

    return {rows, fields}
  }
  catch (error) {
    console.log("DataBase error")
    console.log(error)
  }
}