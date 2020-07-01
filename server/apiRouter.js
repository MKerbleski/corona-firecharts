const  fs  = require('fs');

require('dotenv').config();
const 
    express = require('express'),
    router = express.Router(),
    spawn = require("child_process").spawn,
    exec = require("child_process").exec,
    path = require("path")
    
console.log("dirname", __dirname)
console.log("process.cwd()", process.cwd())

router.get('/refresh', (req, res) => {
    console.log("refresh")
        let runScript = spawn('python', ['./server/firePlots.py', `${path.join(process.cwd(), 'public/images')}`])
    runScript.stdout.on('data', function(data) { 

		console.log("data", data.toString())
        // res.send(data.toString()); 
    }) 
    runScript.stderr.on('data', (data) => { 

		console.log("data", data.toString())
        // res.send(data.toString()); 
    }) 
    // res.send('working')
})

router.get('/list', (req, res) => {
    console.log("list")
    let files = fs.readdirSync(path.join(process.cwd(), 'public/images'), (err) => {
        console.log("err", err)
        if(err){
            res.status(500).json({ err })
        }
    })
    console.log("files", files)
    res.send(files)
})

module.exports = router
