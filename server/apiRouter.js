require('dotenv').config();
const express = require('express');
const router = express.Router();
const { exec } = require('child_process')
const fs = require('fs')

router.get('/:photoName', async (req, res, next) => {
    try {
        const user = await getUser(req.params.email).catch(err => {
            console.log('err', err)
            throw err
        })

        res.status(200).send(`commits made`)
    } catch (err) {
        console.log('endpoint catch', err)
        res.status(500).json(err)
    }
})

router.post('/user', async (req, res, next) => {
    console.log('saving new user:', req.body)
    try {
        addUser(req.body).then(user => {
            res.status(201).json(user)
        }).catch(err => {
            throw err
        })
    } catch (err) {
        console.log('endpoint catch', err)
        res.status(500).json(err)
    }
})

router.put('/user', async (req, res, next) => {
    console.log('updating user: ', req.body)
    try {
        const updatedUser = await updateUser(req.body).catch(err => {
            console.log('err', err)
            throw err
        })
        console.log('updated user', updatedUser)
        res.status(200).send(`user updated`)
    } catch (err) {
        console.log('endpoint catch', err)
        res.status(500).json(err)
    }
})

router.get('/:email', async (req, res, next) => {
    try {
        const user = await getUser(req.params.email)
        console.log('get user', user)
        if(user[0]){
            res.send(user) 
        } else {
            res.status(204).json(null)
        }
    } catch (err) {
        console.log('endpoint catch', err)
        res.status(500).json(err)
    }
})

module.exports = router;
