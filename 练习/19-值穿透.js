// 值穿透

Promise.resolve('success')
  .then((data)=>{
    console.log('step1 ' + data);
    return Promise.resolve(100)
  })
  .then((data)=>{
    console.log('step2 ' + data);
    // 隐式返回 Promise.resolove(undefined)
  })
  .then((data)=>{
    console.log('step3 ' + data);
  })

