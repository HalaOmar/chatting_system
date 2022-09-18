const mongoose = require('mongoose');
const logger   = require('../logger/pinologger')

mongoose.connect(process.env.MONGODB_URL)
.then(
    connection => console.log('The database connected successfully :>> ')
).catch(error => logger.error(error))