const  fs  = require('fs');

require('dotenv').config();
const 
    express = require('express'),
    router = express.Router(),
    spawn = require("child_process").spawn

let runScript = spawn('python', ['./firePlots.py']); 

router.get('/refresh', (req, res) => {
    console.log("refresh")
    runScript.stdout.on('data', function(data) { 

		console.log("data", data.toString())
        // res.send(data.toString()); 
    }) 
    runScript.stderr.on('data', (data) => { 

		console.log("data", data.toString())
        // res.send(data.toString()); 
    }) 
    res.send('working')
})

router.get('/list', (req, res) => {
    console.log("list")
    let files = fs.readdirSync('./figures/fire', (err, files) => {
        console.log("err", err)
        // console.log("files", files)
        if(err){
            res.status(500).json({ err })
        }
    })
    console.log("files", files)
    res.send('hey')
})

module.exports = router
