const { rename } = require('fs')

// 将rename异步函数封装成promise调用风格
function renamePromise(oldPath, newPath) {
  return new Promise((resolve, reject) => {
    rename(oldPath, newPath, (err) => {
      if (err) {
        reject(err)
      }
      resolve('ok')
    })
  })
}

const promise = renamePromise('./2.txt','22.txt')

promise
  .then((data) => {
    console.log('成功：', data)
  })
  .catch((err) => {
    console.log('失败：', err.message)
  })
