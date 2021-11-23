const router = require("express").Router()


router.post("/register", (req, res) => {
  res.send("POST request to to /api/user/register")
  console.log(req.body)
})

router.post("/login", (req, res) => {
  res.send("POST request to to /api/user/login")
})


module.exports = {
  router: router
}