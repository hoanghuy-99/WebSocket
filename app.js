const express = require('express')
const WebSocket = require('ws')
const PORT = process.env.PORT || 3000
const app = express()

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.use(express.static('views'))



const serverWebSocket = new WebSocket.Server({ server })
serverWebSocket.on('connection', (ws) => {
    ws.on('message', (data) => {
        serverWebSocket.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN){
                client.send(data)
            }
        })
    })
})