const {readFile} = require('fs')

// 封装函数
function readFilePromise(path) {
  return new Promise((resolve,reject)=>
    // 异步代码
    readFile(path,'utf-8',(err,data)=>{
      if(err){
        reject(err)
      }
      resolve(data)
    })
  )
}

const promise = readFilePromise('./练习/178.txt')

promise.then((data)=>{
   console.log(data);
}).catch((err)=>{
   console.log(err.message);
})
