const { readFile } = require('fs')

const promise = new Promise((resolve, reject) => {
  readFile('./1.txt', 'utf-8', (err, data) => {
    if (err) {
      reject(err) // 将状态改为失败
    }
    resolve(data) // 将状态改为成功
  })
})

promise
  .then((data) => {
    console.log('data:', data)
  })
  .catch((err) => {
    console.log('err:', err.message)
  })
// 如果promise状态为成功（fulFilled）,调用then
// 如果promise状态为失败（rejected）,调用catch
