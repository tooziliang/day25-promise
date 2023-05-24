const promise = new Promise((resolve, reject) => {
  resolve('在一起')
  //   reject('没钱')
  throw new Error('脚踏两只船')
})

promise
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err.message)
  })
