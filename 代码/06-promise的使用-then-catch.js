const { readFile } = require('fs')

const promise = new Promise((resolve, reject) => {
  // 这里面执行一些异步代码
  readFile('./1.txt', 'utf-8', (err, data) => {
    if (err) {
      // 失败了  异步失败调用reject(错误信息)
      reject(err)
      // throw new Error('失败了')
    } else {
      // 成功了 ，异步成功调用resolve(成功的数据)
      resolve(data)
    }
  })
})

// .then(successCb,[,failCb]): 如果状态变为成功（fulfilled）,就会触发then第一个回调
// .catch(failCb)： 如果状态变为失败（reject）, 就会触发catch里面回调

// promise.then((data) => {
//   console.log('data:', data)
// })

// promise.catch((err) => {
//   console.log('err:')
// })

// then同时指定成功或失败的回调
promise.then(
  (data) => {
    console.log('data:', data)
  },
  (err) => {
    console.log('err：', err.message)
  }
)
