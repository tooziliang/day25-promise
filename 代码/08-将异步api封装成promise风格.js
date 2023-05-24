const { readFile } = require('fs')

// 封装一个函数；将readFile转成promise风格
function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(err) // 将状态改为失败
      }
      resolve(data) // 将状态改为成功
    })
  })
}

const promise = readFilePromise('./1.txt')
promise
  .then((data) => {
    console.log('data:', data)
  })
  .catch((err) => {
    console.log('err:', err.message)
  })
