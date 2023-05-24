Promise.resolve('在一起')
  .then((data) => {
    console.log('看电影')
    return Promise.reject('梦醒了') // 中断promise链
  })
  .then((data) => {
    console.log('吃饭')
  })
  .then((data) => {
    console.log('旅游')
  })
  .then((data) => {
    console.log('买房')
  })
  .then((data) => {
    console.log('买车')
  })
  .catch((err) => {
    console.log('刷新洗脸上班')
  })
