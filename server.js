const express = require('express'); 
const app = express(); 
const port = 3000;
const path = require('path')
const router_users = require('./routes/routes_users'); 

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

app.listen(port, () => {
    console.log('Server Running at http://localhost:' + port);
})