// Promise是一个构造函数
const promise = new Promise((resolve, reject) => {
  // 这里做一些异步操作
  //   console.log('执行了')
  //   console.log(resolve) // 是一个函数，将promise对象状态从pending改成fulfilled（成功）
  //   console.log(reject) // 是一个函数,将promise对象状态从pending改成reject(失败)
  resolve('ok') // 异步成功调用resolve
  reject('err') // 异步失败调用reject
})

console.log(promise)
