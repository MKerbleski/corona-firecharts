const 
apiRouter = require('./server/apiRouter.js'),
express = require('express'),
path = require('path'),
server = express(),
port = process.env.PORT || 8080,
schedule = require('node-schedule'),
cp = require("child_process")

 
// schedule.scheduleJob('* * 3 * *', function(){
	// runs at 3 am daily
      
    // Parameters passed in spawn - 
    // 1. type_of_script 
    // 2. list containing Path of the script 
    //    and arguments for the script  
      
    // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will 
    // so, first name = Mike and last name = Will 
     let runScript = cp.exec('jupyter nbconvert --ExecutePreprocessor.timeout=None --to notebook --execute ./7_fire_plots__3_.ipynb'); 
	//  let runScript = cp.exec('python 2+2'); 
    //  let runScript = cp.exec('jupyter nbconvert --version')
//   runScript()
    // Takes stdout data from script which executed 
    // with arguments and send this data to res object 
    runScript.stdout.on('data', function(data) { 

		console.log("data", data.toString())
        // res.send(data.toString()); 
    } ) 
//   console.log('The answer to life, the universe, and everything!');
// });

var dir = path.join(__dirname, 'public');
console.log("dir", dir)
server.use(express.static(dir));


// server.use(express.json());

// server.use(express.static(path.join(__dirname, 'client/build')));

// server.use('/api', apiRouter);

server.get('/test', (req, res) => {
	res.send('working')
})

// server.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

server.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
