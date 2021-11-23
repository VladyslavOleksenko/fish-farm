const express = require("express")
const jsonwebtoken = require("jsonwebtoken")
const jsonwebtokenKey = require("./../../appConfig").jsonwebtokenKey
const {createInsertSqlCommand, sendDataBaseQuery} = require("./../dataBase");

const router = express.Router()
router.post("/register", register)
router.post("/login", login)


async function register(request, response) {
  const candidate = findUserByEmail(request.body.email)
  if (candidate) {
    return response.status(409).json({
      message: `User with email ${request.body.email} already exists`
    })
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
    request.body.email,
    request.body.password,
    request.body.firstName,
    request.body.lastName,
    null
  ]

  const sqlCommand = createInsertSqlCommand(tableName, fieldNames, fieldValues)
  await sendDataBaseQuery(sqlCommand)

  response.status(200).json({message: "success registration"})
}

async function login(request, response) {
  const candidate = await findUserByEmail(request.body.email)

  if (!candidate) {
    return response.status(404).json({
      message: `No user with email ${request.body.email}`
    })
  }

  const isPasswordCorrect = (request.body.password === candidate.password)
  if (!isPasswordCorrect) {
    return response.status(401).json({
      message: "Wrong password"
    })
  }

  const tokenExpiresIn = 60 * 60
  const token = jsonwebtoken.sign({
    userId: candidate.userId,
    email: candidate.email
  }, jsonwebtokenKey, {expiresIn: tokenExpiresIn})

  response.status(200).json({
    token: `Bearer ${token}`
  })
}

async function findUserByEmail(email) {
  const sqlCommand = `SELECT * FROM user WHERE email LIKE '${email}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)

  if (dataBaseResponse.rows.length) {
    return dataBaseResponse.rows[0]
  }
  return null
}


module.exports = {
  router: router
}