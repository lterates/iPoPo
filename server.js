const express = require('express'); 
require('dotenv').config();
const app = express(); 
const port = 3000;
const path = require('path')
const router_users = require('./routes/routes_users'); 
//const router_messages = require('./routes/routes_messages'); 
//const router_rides = require('./routes/routes_rides'); 

let options = {
    root: path.join(__dirname + /views/)
}

app.use(express.json()); 
app.get('/', function(req, res) {
    res.sendFile("home.html", options, function(err) {
        if (err) {
            console.log("ERROR: " + err)
        } else {
            console.log("SENT FILE")
        }
    })
})

app.use('/users', router_users)
//app.use('/messages', router_messages)
//app.use('/rides', router_rides)

app.listen(port, () => {
    console.log('Server Running at http://localhost:' + port);
})