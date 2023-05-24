// 值穿透：如果then没有返回值，则返回一个状态为成功的promise对象。会将函数的返回值成功状态的值
Promise.resolve('hello')
  .then((data) => {
    console.log('step 1', data)
    // 隐式返回： return Promise.resolve(undefined)
    return Promise.resolve(100)
  })
  .then((data) => {
    console.log('step 2', data)
  })
  .then((data) => {
    console.log('step 3', data)
  })
