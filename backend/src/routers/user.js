const express = require("express")
const {registerUser, loginUser, generateToken, formatUser} = require("../controllers/user")
const logError = require("../errorHandler")

const router = express.Router()
router.post("/register", registerUserRequest)
router.post("/login", loginUserRequest)


async function registerUserRequest(request, response) {
  try {
    const newUserData = request.body
    const newUser = await registerUser(newUserData)
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

async function loginUserRequest(request, response) {
  try {
    const userData = request.body
    const user = await loginUser(userData)
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


module.exports = router