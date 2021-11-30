module.exports = {
  registerUser,
  loginUser,
  changeUserData,

  getUserByUserId,
  getUserByEmail,
  generateToken,
  formatUser,
}


async function registerUser(newUserData) {
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

async function loginUser(userData) {
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

async function changeUserData(userData) {
  const userId = userData.userId
  const candidate = await getUserByUserId(userId)
  if (!candidate) {
    throw new Error(`No user with id ${userId}`)
  }

  if (!userData.firstName || !userData.lastName) {
    throw new Error(`Not valid data`)
  }

  const sqlCommand = `UPDATE user
                      SET first_name = '${userData.firstName}',
                          last_name  = '${userData.lastName}'
                      WHERE user_id = ${userId}`
  await sendDataBaseQuery(sqlCommand)

  return getUserByUserId(userId)
}


async function getUserByUserId(userId) {
  const sqlCommand = `SELECT *
                      FROM user
                      WHERE user_id LIKE '${userId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows[0]
}

async function getUserByEmail(email) {
  const sqlCommand = `SELECT *
                      FROM user
                      WHERE email LIKE '${email}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows[0]
}

function generateToken(payload) {
  const expiresIn = 60 * 60
  return "Bearer " + jsonwebtoken.sign(payload, jsonwebtokenKey, {expiresIn})
}


function formatUser(user) {
  return {
    userId: user["user_id"],
    email: user.email,
    password: user.password,
    firstName: user["first_name"],
    lastName: user["last_name"],
    avatar: user["avatar"]
  }
}


const jsonwebtoken = require("jsonwebtoken")
const jsonwebtokenKey = require("./../../appConfig").jsonwebtokenKey
const {createInsertSqlCommand, sendDataBaseQuery} = require("./../dataBase");