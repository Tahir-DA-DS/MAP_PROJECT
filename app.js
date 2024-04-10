const express = require("express")
const app = express()
const cors = require('cors')
require("dotenv").config()
const connectDB = require("./db/connect")
const bodyParser = require('body-parser');
const customerRouter = require('./router/customerData')
const paymentRouter = require('./router/paymentConfirmation')
const port = process.env.PORT||3000

app.use(express.json())

app.use(bodyParser.json())

app.use(cors())
app.use('/', customerRouter)
app.use('/', paymentRouter)

const start = async ()=> {
    try {
        await connectDB(process.env.URI)
        app.listen(port, ()=>{
            console.log(`connected to the db sucessfully`);
            console.log(`app is listening on port ${port}`);
        })
    } catch (error) {
        console.log("error starting app", error)
    }
    
}

start()