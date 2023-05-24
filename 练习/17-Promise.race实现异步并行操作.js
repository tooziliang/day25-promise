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

const promise1 = readFilePromise('./练习/1.txt')
const promise2 = readFilePromise('./练习/2.txt')
const promise3 = readFilePromise('./练习/3.txt')

// 并行请求，仅获取最快哪个异步结果
Promise.race([promise1, promise2, promise3])
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err.message)
  })
