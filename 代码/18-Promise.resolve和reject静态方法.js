// const promise = new Promise((resolve, reject) => {
// //   resolve('在一起')
//     reject('彩礼高')
// })

// const promise = Promise.resolve('在一起') // 成功状态
const promise = Promise.reject('彩礼高') // 失败状态
console.log(promise);

promise
  .then((data) => {
    console.log(data + '并结婚')
  })
  .catch((err) => {
    console.log(err + '等你赚钱')
  })
