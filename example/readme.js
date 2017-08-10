const userPackages = require('../lib/user-packages')

const user = 'npm'
const npmPackages = userPackages.createStream(user)

npmPackages.on('data',console.log)
