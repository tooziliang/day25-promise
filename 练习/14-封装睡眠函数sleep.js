// 封装睡眠函数
function sleep(wait){
  return new Promise((resolve)=>{
      setTimeout(resolve,wait)
  })
}

sleep(3000).then(()=>{
  console.log('已睡醒');
})
