// 需求：异步的按顺序依次去读取1.txt、2.txt、3.txt文件的内容。
const { readFile } = require('fs')

// 将readFile封装成一个promise风格
function readFilePromise(path) {
  // 1. 返回一个promise对象
  return new Promise((resolve, reject) => {
    // 2. 在promise中的构造函数中执行异步操作，成功调用resolve,失败reject
    readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

// 原理：在上一个 then 方法中返回一个新的 Promise 对象，以便在下一个 then 方法中处理它的异步操作结果。
// 如果then没有返回值，则会返回一个成功状态的promise对象的值，值为函数的返回值
// 需求：异步的按顺序依次去读取1.txt、2.txt、3.txt文件的内容
readFilePromise('./1.txt')
  .then((data) => {
    console.log('data:', data)
    return readFilePromise('./2.txt')
  })
  .then((data) => {
    console.log('data:', data) //
    return readFilePromise('./3.txt')
  })
  .then((data) => {
    console.log('data:', data) // 333
  })
