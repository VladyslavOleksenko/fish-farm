const jsonwebtoken = require("jsonwebtoken")
const jsonwebtokenKey = require("./../../appConfig").jsonwebtokenKey


const registerUser = module.exports.registerUser = async function(newUserData) {
  const candidate = await getUserByEmail(newUserData.email)
  if (candidate) {
    throw new Error(`User with email ${newUserData.body.email} already exists`)
  }

  const tableName = "user"
  const fieldNames = [
    "user_id",
    "email",
    "password",
    "first_name",
    "last_name",
    "avatar"
  ]
  const fieldValues = [
    null,
    newUserData.email,
    newUserData.password,
    newUserData.firstName,
    newUserData.lastName,
    null
  ]

  const sqlCommand = createInsertSqlCommand(tableName, fieldNames, fieldValues)
  await sendDataBaseQuery(sqlCommand)

  return await getUserByEmail(newUserData.email)
}

const loginUser = module.exports.loginUser = async function(userData) {
  const user = await getUserByEmail(userData.email)
  if (!user) {
    throw new Error(`No user with email ${userData.email}`)
  }

  const isPasswordCorrect = (userData.password === user.password)
  if (!isPasswordCorrect) {
    throw new Error("Wrong password")
  }

  return user
}

const getUserByUserId = module.exports.getUserByUserId = async function(userId) {
  const sqlCommand = `SELECT *
                      FROM user
                      WHERE user_id LIKE '${userId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows[0]
}

const getUserByEmail = module.exports.getUserByEmail = async function(email) {
  const sqlCommand = `SELECT *
                      FROM user
                      WHERE email LIKE '${email}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows[0]
}

const generateToken = module.exports.generateToken = function(payload) {
  const expiresIn = 60 * 60
  return "Bearer " + jsonwebtoken.sign(payload, jsonwebtokenKey, {expiresIn})
}


const formatUser = module.exports.formatUser = function(user) {
  return {
    userId: user["user_id"],
    email: user.email,
    password: user.password,
    firstName: user["first_name"],
    lastName: user["last_name"],
    avatar: user["avatar"]
  }
}


const {createInsertSqlCommand, sendDataBaseQuery} = require("./../dataBase");