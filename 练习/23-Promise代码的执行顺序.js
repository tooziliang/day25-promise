console.log(1);

const promise = new Promise((resolve,reject)=>{
  // Promise的回调函数中的代码是同步的
  console.log(3);
  resolve('success')
})

// then中的代码是异步的
promise.then((data)=>{
  console.log(5);
})

console.log(2);
