const express = require("express")
const jsonwebtoken = require("jsonwebtoken")
const jsonwebtokenKey = require("./../../appConfig").jsonwebtokenKey
const {createInsertSqlCommand, sendDataBaseQuery} = require("./../dataBase");
const logError = require("../errorHandler")

const router = express.Router()
router.post("/register", registerRequest)
router.post("/login", loginRequest)


async function registerRequest(request, response) {
  try {
    const newUserData = request.body
    const newUser = await register(newUserData)
    const token = generateToken({
      userId: newUser.userId,
      email: newUser.email
    })
    response.status(200).json({token, user: formatUser(newUser)})
  } catch (exception) {
    const message = "Can't register"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function loginRequest(request, response) {
  try {
    const userData = request.body
    const user = await login(userData)
    const token = generateToken({
      userId: user.userId,
      email: user.email
    })
    const userFormatted = formatUser(user)
    response.status(200).json({token, user: userFormatted})
  } catch (exception) {
    const message = "Can't login"
    response.status(400).json({message})
    logError(message, exception)
  }
}


async function register(newUserData) {
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

async function login(userData) {
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


module.exports = {
  router,
  getUserByUserId,
  formatUser
}