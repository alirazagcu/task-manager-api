const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser : true,
    useCreateIndex : true
})


// const me = new user({
//     name : 'ahsan',
//     email : 'afsdfdf@gmail.com', 
//     age : 30,
//     password : 'pasdfdsword111'
// })

// me.save().then(()=>{
// console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })

// const task = mongoose.model('Task', {
//   description : {
//       type : String,
//       required : true,
//       trim : true
//   },
//   completed : {
//       type : Boolean,
//       default : false,
//   }
// })

// const tsk = new task({
//     completed : true
// })


// tsk.save().then(() =>{
// console.log(tsk)
// }).catch((error)=>{
//     console.log(error)
// })