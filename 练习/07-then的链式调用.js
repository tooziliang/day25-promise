const { readFile } = require('fs')

const promise = new Promise((resolve, reject) => {
  readFile('./练习/1.txt', 'utf-8', (err, data) => {
    if (err) {
      reject(err) // 将状态改为失败
    }
    resolve(data) // 将状态改为成功
  })
})

// 链式调用
promise.then((data)=>{
  console.log(data); // 默认返回promise对象
})
.catch((err)=>{
  console.log(err.message);
})



