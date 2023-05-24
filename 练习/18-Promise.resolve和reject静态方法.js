// const promise = new Promise((resolve, reject) => {
// //   resolve('在一起')
//     reject('彩礼高')
// })

// 直接使用Promise的静态方法   返回 Promise { <rejected> '彩礼高' }
const promise = Promise.resolve('同意了')
// const promise = Promise.reject('拒绝了')

promise.then((data)=>{
  console.log(data + '结婚');
}).catch((err)=>{
  console.log(err + '滚蛋');
})
