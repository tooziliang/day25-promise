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

// 解决回调地狱
readFilePromise('./练习/1.txt')
  .then((data)=>{   
    console.log(data);
    return readFilePromise('./练习/2.txt') // 返回一个promise对象
  })
  .then((data)=>{
    console.log(data);
    return readFilePromise('./练习/3.txt')
  })
  .then((data)=>{
    console.log(data);
  })

