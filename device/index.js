const SerialPort = require("serialport")
const ReadLine = require("@serialport/parser-readline")
const RequestParams = require("./RequestParams")
const sendServerRequest = require("./serverRequest")

const port = new SerialPort("COM5", { baudRate: 9600 })

const parser = new ReadLine()
port.pipe(parser)


parser.on("data", async portLine => await processPortLine(portLine))


async function processPortLine(portLine) {
  const temperature = getTemperatureByPortLine(portLine)
  if (temperature) {
    await sendTemperatureToServer(temperature)
  }
}

function getTemperatureByPortLine(portLine) {
  if (portLine[0] !== "T") {
    return
  }

  return parseFloat(portLine.substr(1))
}

async function sendTemperatureToServer(temperature) {
  const requestParams = new RequestParams(
    "POST",
    "http://localhost:5000/api/",
    {temperature}
  )

  await sendServerRequest(requestParams)
}