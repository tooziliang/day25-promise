const { promisify } = require('util')
const { writeFile, rename } = require('fs')

// 将writeFile异步api转成promise风格
const writeFilePromise = promisify(writeFile)
const renamePromise = promisify(rename)

// writeFilePromise('./5.txt', '我在小小花园里，挖呀挖呀挖')
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

renamePromise('./1.txt', '111.txt')
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err.message)
  })
