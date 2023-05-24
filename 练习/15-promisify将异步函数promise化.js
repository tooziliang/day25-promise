const util = require('util')
const fs = require('fs')

const renamePromise = util.promisify(fs.rename)

renamePromise('./练习/1.txt', './练习/199.txt')
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err.message)
  })
