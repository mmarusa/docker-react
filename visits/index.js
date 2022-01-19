//we require and import libraries that were added as dependencies
//in the package.json file
const express = require('express');
const redis = require('redis');
const process = require('process');

//we make a new instance of the express application
const app = express();

//we set up a connection to the redis server
const client = redis.createClient({
    host: 'redis-server', //name of container from docker compose file, usually with no docker we have to specify an address/URL
    port: 6379 //default port number of redis
});

//initialize number of visits
client.set('visits',0);

//we add in  a route handler for our root route, we're going to call this callback 
//function and inside of there we're going to attempt to use this client connection over
//to the redis server to get the current number of times our page has been visited
app.get('/' , (req,res) => {
    process.exit(10);
    client.get('visits',(err,visits) => { //as a second argument will add in a callback that gets called with a possible error object and
        res.send('Number of visits is ' + visits); //send the response back to whoever made the original request
        client.set('visits',parseInt(visits)+1); //update the number of times this page has been visited
    });
});

//application starts to listen
app.listen(8081, () => {
    console.log('Listening on port 4001');
});