// 异常穿透：如果catch方法没有返回值，则会默认返回一个状态为成功的promise对象。此对象值就是函数的返回值
Promise.reject(0)
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log('异常')
    return 10 // 会用Promise.resolve(10)进行包装后在返回
  })
  .then((data) => {
    console.log('step 1', data)
  })
  .then((data) => {
    console.log('step 2', data)
  })
