const {readFile} = require('fs')

// 创建一个promise对象
const promise = new Promise((resolve,reject)=>{
    // 存放异步代码
    // 读取文件
  readFile('./练习/299.txt','utf-8',(err,data)=>{
    if(err){
      reject(err)
      return
      // throw new Error('读取失败') // 第二种方式
    }
    console.log('读取成功');
    resolve(data) //传值
  })
})

// .then(successCb,[,failCb]): 如果状态变为成功（fulfilled）,就会触发then第一个回调
promise.then(
  (data)=>{
    console.log(data);
  },
  (err)=>{
    console.log(err.message);
  }
)
