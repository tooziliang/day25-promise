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

// 一起读取1.txt 2.txt 3.txt内容
const promise1 = readFilePromise('./1.txt')
const promise2 = readFilePromise('./22222222.txt')
const promise3 = readFilePromise('./3.txt')

// 并行请求
const promise = Promise.all([promise2, promise3, promise1])

promise
  .then((data) => {
    // 所有的promise状态都为成功才执行
    console.log(data) // [222,333,111] 所有的promise对象的结果，结果顺序和上面all传参顺序保持一致
  })
  .catch((err) => {
    // 只要有一个失败，则执行
    console.log(err.message)
  })
