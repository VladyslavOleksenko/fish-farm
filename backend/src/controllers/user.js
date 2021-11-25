const express = require("express")
const jsonwebtoken = require("jsonwebtoken")
const jsonwebtokenKey = require("./../../appConfig").jsonwebtokenKey
const {createInsertSqlCommand, sendDataBaseQuery} = require("./../dataBase");

const router = express.Router()
router.post("/register", register)
router.post("/login", login)


async function register(request, response) {
  const candidate = await findUserByEmail(request.body.email)
  if (candidate) {
    return response.status(409).json({
      message: `User with email ${request.body.email} already exists`
    })
  }

  try {
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

    const newUser = await findUserByEmail(request.body.email)
    const token = generateToken({
      userId: newUser.userId,
      email: newUser.email
    })
    response.status(200).json({token, user: createUserObject(newUser)})
  } catch (exception) {
    response.status(500).json({message: exception.message})
  }
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

  const token = generateToken({
    userId: candidate.userId,
    email: candidate.email
  })

  response.status(200).json({token, user: createUserObject(candidate)})
}

function generateToken(payload) {
  const expiresIn = 60 * 60
  return "Bearer " + jsonwebtoken.sign(payload, jsonwebtokenKey, {expiresIn})
}

async function findUserByEmail(email) {
  const sqlCommand = `SELECT * FROM user WHERE email LIKE '${email}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)

  if (dataBaseResponse && dataBaseResponse.rows && dataBaseResponse.rows.length) {
    return dataBaseResponse.rows[0]
  }
  return null
}

async function findUserByUserId(userId) {
  const sqlCommand = `SELECT * FROM user WHERE user_id LIKE '${userId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)

  if (dataBaseResponse && dataBaseResponse.rows && dataBaseResponse.rows.length) {
    return dataBaseResponse.rows[0]
  }
  return null
}


function createUserObject(dataBaseUser) {
  try {
    return {
      userId: dataBaseUser["user_id"],
      email: dataBaseUser.email,
      password: dataBaseUser.password,
      firstName: dataBaseUser["first_name"],
      lastName: dataBaseUser["last_name"],
      avatar: dataBaseUser["avatar"]
    }
  } catch (exception) {
    console.log("Can't create user object")
    console.log(exception)
  }
}


module.exports = {
  router,
  findUserByEmail,
  findUserByUserId,
  createUserObject
}