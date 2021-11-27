const express = require("express")
const userController = require("../controllers/user")
const logError = require("../errorHandler")

const router = express.Router()
router.post("/register", registerUserRequest)
router.post("/login", loginUserRequest)


async function registerUserRequest(request, response) {
  try {
    const newUserData = request.body
    const newUser = await userController.registerUser(newUserData)
    const newUserFormatted = userController.formatUser(newUser)
    const token = userController.generateToken({
      userId: newUser.userId,
      email: newUser.email
    })
    response.status(200).json({token, user: newUserFormatted})
  } catch (exception) {
    const message = "Can't register"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function loginUserRequest(request, response) {
  try {
    const userData = request.body
    const user = await userController.loginUser(userData)
    const userFormatted = userController.formatUser(user)
    const token = userController.generateToken({
      userId: user.userId,
      email: user.email
    })
    response.status(200).json({token, user: userFormatted})
  } catch (exception) {
    const message = "Can't login"
    response.status(400).json({message})
    logError(message, exception)
  }
}


module.exports = router