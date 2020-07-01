const 
    apiRouter = require('./server/apiRouter.js'),
    express = require('express'),
    path = require('path'),
    server = express(),
    port = process.env.PORT || 8080,
    schedule = require('node-schedule')
 
// schedule.scheduleJob('* * 3 * *', function(){
//   console.log('The answer to life, the universe, and everything!');
// });

var dir = path.join(process.cwd(), 'client/build');
var firePlots = path.join(process.cwd(), 'public/images');

server.use(express.static(dir))
server.use(express.static(firePlots))

server.use('/api', (req, res, next) => {
    console.log("api")
    next()
}, apiRouter);

server.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

server.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
