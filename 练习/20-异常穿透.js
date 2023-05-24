// 异常穿透

Promise.reject(0)
  .then((data)=>{
    console.log(data);
  })
  .catch((err)=>{
    console.log('异常');
    return 10
  })
  .then((data)=>{
    console.log(typeof data);
    console.log('step1 ' + data);
  })
  .then((data)=>{
    console.log('step2 ' + data);
  })