const express = require("express")
const router = express.Router()


router.get("/user", (req, res) => {
  res.send("You`ve just requested to /api/user/")
})



module.exports = router