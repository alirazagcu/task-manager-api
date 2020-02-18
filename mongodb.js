// import { ObjectID } from "mongodb"

//CRUD Create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const objectID = mongodb.objectID 

//short code of above three line
const {MongoClient , ObjectID} = require('mongodb')
const id = new ObjectID()
// console.log(id)
// console.log(id.id.length)
// console.log(id.getTimestamp())
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
MongoClient.connect(connectionURL, {useNewUrlParser : true}, (error, client) => {
    if(error){
       return console.log('Unable to connect to database!')
      //return console.log(error)
    }

    const db = client.db(databaseName)

    //Retrieve a data for one user
    // db.collection('users').findOne({_id : new ObjectID("5e4105ce3edc710b3c8bf0b7")}, (error, user) =>{
    //   if(error){
    //     return console.log('Unable to retrieve data')
    //   }
    //   else{
    //     return console.log(user)
    //   }

    // })
    
          // retrieve data for multiple user
          // db.collection('users').find({age : 20}).toArray((error, user) => {
          //   console.log(user)
          // })
          // db.collection('users').find({age : 20}).count((error, count) => {
          //   console.log(count)
          // })
    // db.collection('tasks').findOne({_id : new ObjectID("5e410730f388a229d80329d5")}, (error, task) =>{
    //   if(error){
    //     return console.log('Unable to fetch the task')
    //   }
    //   else{
    //     return console.log(task)
    //   }
    // })


    //  db.collection('tasks').find({completed : false}).toArray((error, tasks) => {
    //    if(error){
    //      return console.log('Unable to fecth the task')
    //    }else{ 
    //      return console.log(tasks)
    //    }
    //  })
    
    
    //Updating the document
    // const updatePromise = db.collection('users').updateOne({
    //   _id : new ObjectID("5e41000a55822d17b0aee7cd")
    // },
    // {
    //   $set : {
    //     name : 'Owais Ali'
    //   }
    // })

    // updatePromise.then((result) =>{
    //   console.log(result)
    // }).catch((error) =>{

    //   console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //   completed : false
    // },
    // {
    //   $set : {
    //     completed : true
    //   }
    // }).then((result) => {
    //   console.log(result.modifiedCount)
    // }).catch((error) =>{
    //   console.log(error)
    // })

    //Deleting Data
    db.collection('users').deleteMany({
      age : 20
    }).then((result) =>{
      console.log(result)
    }).catch((error) =>{
      console.log(error)
    })
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //Creating a data
    // db.collection('users').insertOne({
    //   name : 'Ali Raza',
    //   age: 20
    // }, (errror, result) =>{
    //   if(error){
    //     return console.log('Unable to inserrt user')
    //   }
    //   console.log(result.ops)
    // })
    // console.log('Connected  correctly!')

    // db.collection('users').insertMany([
    //   {
    //     name : 'AAAA',
    //     age : 30
    //   },
    //   {
    //     name : 'BBBB',
    //     age : 15
    //   },
    //   {
    //     name : 'CCCC',
    //     age : 45
    //   }
    // ], (error, result) =>{
    //   if(error){
    //    return console.log('Unable to inserts users')
    //   }
    //   else{
    //     return console.log(result.ops)
    //   }
    // })

    // db.collection('tasks').insertMany([
    //   {
    //     description : 'Hereis the description of the  first task',
    //     completed : true

    //   },
    //   {
    //     description : 'Here is the description of the 2nd task',
    //     completed : false
    //   }
    // ], (error, result) =>{
    //   if(error){
    //     return console.log('Unable to insert the descriptions of the task')
    //   }
    //   else{
    //     return console.log(result.ops)
    //   }
    // })
})
