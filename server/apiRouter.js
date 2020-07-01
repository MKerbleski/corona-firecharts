const  fs  = require('fs');

require('dotenv').config();
const 
    express = require('express'),
    router = express.Router(),
    spawn = require("child_process").spawn,
    exec = require("child_process").exec,
    path = require("path")


let runScript = exec('jupyter nbconvert --ExecutePreprocessor.timeout=None --to notebook --execute ./server/firePlots.ipynb', (err, stdout, stderr) => {
    console.log(err)
    console.log(stdout)
    console.log(stderr)
})

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
    let files = fs.readdirSync(path.join(__dirname, 'figures/fire'), (err) => {
        console.log("err", err)
        if(err){
            res.status(500).json({ err })
        }
    })
    console.log("files", files)
    res.send(files)
})

module.exports = router
