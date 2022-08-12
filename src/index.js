require('./middleware/init')

require('./db/mongoose')

const express = require('express')

const chalk = require('chalk')

const cors = require('cors')

const path = require('path')

const buyGetRouter = require('./routers/buyGet')

const _404Router = require('./routers/404')

const delay = require('./middleware/delay')

const port = process.env.PORT

const isProduction = process.env.IS_PRODUCTION === 'true'


// Acquire an instance of Express
const app = express()


// Automatically parse incoming reqests
app.use(express.json({ limit: "20mb" }))


// Automatically parse form body and encodes
app.use(express.urlencoded({ extended: true }))


// Automatically allow incomming incoming cors
app.use(cors())


// One second delay for local development
if (!isProduction) { app.use(delay) }


// Automatically allows task routers
app.use(buyGetRouter)


// Automatically allows 404 routers
app.use(_404Router)


// Listening Server
app.listen(port, () => {

  console.log(chalk.hex('#009e00')(`Server started successfully on port ${port}`));

  console.log(chalk.cyanBright(`Server time: ${new Date().toLocaleString()}`));

})
