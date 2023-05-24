const { unlink } = require('fs')

// 将unlink异步函数封装成一个promise风格
function unlinkPromise(path) {
  return new Promise((resolve, reject) => {
    unlink(path, (err) => {
      if (err) {
        reject(err)
      }
      resolve('ok')
    })
  })
}

unlinkPromise('./demo.txt')
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log('err:', err.message)
  })
