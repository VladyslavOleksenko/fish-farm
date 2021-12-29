const SerialPort = require("serialport")
const ReadLine = require("@serialport/parser-readline")
const http = require('http')

const port = new SerialPort("COM5", { baudRate: 9600 })

const parser = new ReadLine()
port.pipe(parser)


parser.on("data", async portLine => await processPortLine(portLine))


async function processPortLine(portLine) {
  const deviceData = getDeviceData(portLine)
  console.log(deviceData)
  await sendDeviceDataToServer(deviceData)
}

function getDeviceData(portLine) {
  const portDataArray = portLine.split(";")
  return {
    deviceId: parseInt(portDataArray[0]),
    temperature: parseFloat(portDataArray[1]),
    temperatureMark: parseInt(portDataArray[2])
  }
}

async function sendDeviceDataToServer(deviceData) {
  const body = {
    deviceId: deviceData.deviceId,
    poolData: {
      temperature: deviceData.temperature
    }
  }
  const data = new TextEncoder().encode(JSON.stringify(body))

  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/pool/indicators',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }

  const req = http.request(options, () => console.log("sent"))

  req.on('error', error => {
    console.error(error)
  })

  req.write(data)
  req.end()
}