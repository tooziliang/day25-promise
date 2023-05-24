Promise.resolve(100)
  .then((data) => {
    console.log('step 1')
    // 中断promise链
    return Promise.reject(9)
    // 或 抛出一个错误
    // throw new Error(0)
  })
  .then((data) => {
    console.log('step 2')
  })
  .then((data) => {
    console.log('step 3')
  })
  .catch((err) => {
    console.log('err')
  })
