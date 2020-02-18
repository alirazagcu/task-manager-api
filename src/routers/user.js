const express = require('express')
require('../db/mongoose')
const sharp = require('sharp')
const User = require('../models/user')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const multer = require('multer')
const {sendWelcomeEmail, sendCancelEmail} = require('../emails/account')

const router = new express.Router()

router.post('/users', async (req, res) =>{
    const user = new User(req.body)
    try {

        const token  = await user.generateAuthToken() 
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
    
    // user.save().then(() =>{
    //     res.send(user)
    // }).catch((e) =>{
    //     res.status(400) 
    //     res.send(e)
    // })

})

router.post('/users/login', async(req, res) =>{

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
        //res.send({user: user.getPublicProfile() , token})
    } catch (e) {
        res.status(400).send()
    }

})


router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


router.post('/users/logoutAll', auth, async (req, res) =>{
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        
        res.status(500).send()
        }
})


//Reading Resources of End point
router.get('/users/me', auth, async (req, res) =>{
    res.send(req.user)
    // try {
    //     const user = await User.find({})
    //     res.status(200).send(user)
    // } catch (e) {
    //     res.status(401).send(e)
        
    // }
    // User.find({}).then((user)=>{
    //     res.send(user)
    // }).catch((e)=>{
    //     res.status(500).send(e) 
    //    })
})

router.get('/users/:id', async (req, res) =>{
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        else{
            res.status(200).send(user)
        }a
    } catch (error) {
        res.status(500).send(error)
        
    }
    // User.findById(_id).then((user) =>{
    //     if(!user){
    //         return res.status(404).send()
    //     }
    //     else{
    //     res.send(user)}
    // }).catch((e) =>{
    //      res.status(500).send(e)

    // })
})
// router.patch('/users/:id', async (req, res)
router.patch('/users/me', auth,  async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({Error  : 'Invalid updates'})
    }
    try {
        // const user = await User.findById(req.user._id)

        updates.forEach((update) =>{
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.send(req.user)
        // // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new :true, runValidators : true})
        // if(!user) {
        //     return res.status(404).send()
        // }   
        // res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
        
    }
 

})
//router.delete('/users/:id', async (req, res) 
router.delete('/users/me', auth, async (req, res) =>{
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send()
        // }
        // else{
        //     res.status(200).send(user)
        // }
        await req.user.remove()
        sendCancelEmail(req.user.email, req.user.name)
        res.send(req.user)

    } catch (error) {
        res.status(500).send(error)
    }
})
const upload = multer({
    // dest : 'avatars',
    limits : {
        fileSize : 1000000
    },
    fileFilter(req, file, callback){
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
            return callback(new Error('Pleae upload imag'))
        }

        callback(undefined, true)
    }
})
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) =>{
    // req.user.avatar = req.file.buffer
    const buffer = await sharp(req.file.buffer).resize({width : 250, height : 250}).png().toBuffer()
    req.user.avatar  = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) =>{
    res.status(400).send({error : error.message})
} )

router.delete('/users/me/avatar', auth, async(req, res) =>{
    try {
        req.user.avatar = undefined
        await req.user.save()
        res.send()
    } catch (e) {
        
    }
})

router.get('/users/:id/avatar', async(req, res) =>{
    try {
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})
module.exports = router
