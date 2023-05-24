const fs = require('fs')

function writeFilePromise(path,content){
    return new Promise((resolve,reject)=>{
        fs.writeFile(path,content,(err,data)=>{
            if(err){
                reject(err)
            }
            resolve('ok')
        })
    })
}

writeFilePromise('./1.txt','sssss').then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.log(err.message);
})


