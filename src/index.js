const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const multer = require('multer')

const app = express()
const port = process.env.PORT

// const upload = multer({
//     dest : 'images/',
//     limits :{
//         fileSize : 1000000,

//     },
//     fileFilter(req, file, cb){
//         // cb(new Error('File must be a PDF'))
//         // cb(undefined,true)
//         // cb(undefined, false)
//         // if(!file.originalname.endsWith('.pdf')){
//         //     return cb(new Error('Please upload a PDF'))
//         // }
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('Please upload word dcument'))
//         }
//         cb(undefined, true)
//     }
// })
// const errorMiddleware = (req, res, next) =>{
//     throw new Error('from my middle ware')
// }
// app.post('/upload', upload.single('uploads'), (req, res) =>{
//     res.send()
// }, (error, req, res, next) =>{
//     res.status(400).send({
//         error: error.message
//     })
// })

//middleware function
// app.use((req, res, next) =>{
//     if(req.method === 'GET'){
//         res.send('GET Request are Disable')
//     }else{
//         next()
//     }
// // console.log(req.method, req.path)
// // next()
// })

// app.use((req,res, next) =>{
//     res.status(503).send('Site is currently down. Check back soon!')
// })
 
//Creating resources for REST API'S
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
// app.post('/users', async (req, res) =>{
//     const user = new User(req.body)
//     try {
//         await user.save()
//         res.status(201).send(user)
//     } catch (e) {
//         res.status(400).send(e)
//     }
    
//     // user.save().then(() =>{
//     //     res.send(user)
//     // }).catch((e) =>{
//     //     res.status(400)
//     //     res.send(e)
//     // })

// })
// //Reading Resources of End point
// app.get('/users', async (req, res) =>{
//     try {
//         const user = await User.find({})
//         res.status(200).send(user)
//     } catch (e) {
//         res.status(401).send(e)
        
//     }
//     // User.find({}).then((user)=>{
//     //     res.send(user)
//     // }).catch((e)=>{
//     //     res.status(500).send(e) 
//     //    })
// })

// app.get('/users/:id', async (req, res) =>{
//     const _id = req.params.id
//     try {
//         const user = await User.findById(_id)
//         if(!user){
//             return res.status(404).send()
//         }
//         else{
//             res.status(200).send(user)
//         }a
//     } catch (error) {
//         res.status(500).send(error)
        
//     }
//     // User.findById(_id).then((user) =>{
//     //     if(!user){
//     //         return res.status(404).send()
//     //     }
//     //     else{
//     //     res.send(user)}
//     // }).catch((e) =>{
//     //      res.status(500).send(e)

//     // })
// })

// app.post('/tasks', async (req, res) =>{
//     const task = new Task(req.body)
//     try {
//         await task.save()

//         res.status(201).send(task)

//     } catch (error) {
//         res.status(400).send(error)
//     }
//     // task.save().then(() =>{
//     //     res.send(task)
//     // }).catch((e) =>{
//     //     res.status(400).send(e)
//     // })
// })

// app.get('/tasks',async (req, res) =>{
//     try {
//         const task = await Task.find({})
//         res.status(200).send(task)
//     } catch (error) {
//         res.status(400).send(error)
//     }
//     // Task.find({}).then((task)=>{
//     //     res.send(task)
//     // }).catch((e) =>{
//     //     res.status(500).send(e)
//     // })
// })

// app.get('/tasks/:id', async (req, res) =>{
//     const _id = req.params.id
//     try {
//         const task = await Task.findById(_id)
//         if(!task) {
//             return res.status(400).send()
//         }
//         else {
//             res.status(200).send(task)
//         }
//     } catch (error) {
//         res.status(500).send(error)
//     }
//     // Task.findById(_id).then((task)=>{
//     //     if(!task){
//     //         return res.status(400).send()
//     //     }
//     //     else{
//     //         res.send(task)
//     //     }
//     // }).catch((e) =>{
//     //     res.status(500).send(e)
//     // })
// })

//updating existing data

// app.patch('/users/:id', async (req, res) =>{
//     const updates = Object.keys(req.body)
//     const allowUpdates = ['name', 'email', 'password', 'age']
//     const isValidOperation = updates.every((update) => allowUpdates.includes(update))

//     if(!isValidOperation){
//         return res.status(400).send({Error  : 'Invalid updates'})
//     }
//     try {
//         const user = await User.findByIdAndUpdate(req.params.id, req.body, {new :true, runValidators : true})
//         if(!user) {
//             return res.status(404).send()
//         }   
//         res.status(200).send(user)
//     } catch (error) {
//         res.status(400).send(error)
        
//     }
 

// })

// app.patch('/tasks/:id', async (req, res) =>{
//     const updates = Object.keys(req.body)
//     const allowUpdates = ['description', 'completed']
//     const isValidOperation = updates.every((update) => allowUpdates.includes(update))

//     if(!isValidOperation){
//         return res.status(400).send({Error  : 'Invalid updates'})
//     }
//     try {
//         const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new :true, runValidators : true})
//         if(!task) {
//             return res.status(404).send()
//         }   
//         res.status(200).send(task)
//     } catch (error) {
//         res.status(400).send(error)
        
//     }
 

// })

//Deleting the user data
// app.delete('/users/:id', async (req, res) =>{
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)
//         if(!user){
//             return res.status(404).send()
//         }
//         else{
//             res.status(200).send(user)
//         }

//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

// app.delete('/tasks/:id', async (req, res) =>{
//     try {
//         const task = await Task.findByIdAndDelete(req.params.id)
//         if(!task){
//             return res.status(404).send()
//         }
//         else{
//             res.status(200).send(task)
//         }

//         res.status(500).send(error)
//     }
// })

// const bcrypt = require('bcryptjs')

// const myFunction = async ()=>{
//     const password = 'Red324567'
//     const hashPassword = await bcrypt.hash(password,8)

//     console.log(password)
//     console.log(hashPassword)
//     const isMatch = await bcrypt.compare(password, hashPassword)
//     console.log(isMatch)
// }

// myFunction()
// const jwt  = require('jsonwebtoken')

// const myFunction = async () =>{
//     const token = jwt.sign({_id:'2345'},'thisismynewcourse', {expiresIn:'7 days'})
// console.log(token)

// const data = jwt.verify(token,'thisismynewcourse')

// console.log(data)
// }
// myFunction()

// const pet = {
//     name : 'Hel'
// }
// pet.toJSON  = function (){
//     // console.log(this)
//     // return this
//     return {}
// }
// console.log(JSON.stringify(pet))

// const task = require('./models/task')

// const main = async () =>{
//     // const task = await Task.findById('5e4a75b88192463620f65619')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('5e4a747f8192463620f65617')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }
// main()

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})
