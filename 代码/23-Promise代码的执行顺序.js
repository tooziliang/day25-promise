console.log(1) 
const promise = new Promise((resolve, reject) => {
  // 1. 此构造函数中的代码是 同步 执行的！！！
  console.log(4)
  resolve(2)
})
promise.then((data) => {
    // 2. then中的回调是异步执行的
  console.log(data) // 2
})
console.log(3)
