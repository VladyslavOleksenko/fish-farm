const express = require("express")
const {createInsertSqlCommand, sendDataBaseQuery} = require("./../dataBase");

const router = express.Router()
router.get("/ownFarms", getOwnFarms)


async function getOwnFarms(request, response) {
  console.log("/api/ownFarms requested")
  response.json({message: "/api/ownFarms requested"})
}


module.exports = {
  router: router
}