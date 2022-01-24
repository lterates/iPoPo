const express = require('express'); 
require('dotenv').config();
const app = express(); 
const port = process.env.PORT || 3000;
const path = require('path')
const router_users = require('./routes/users.routes'); 
const router_messages = require('./routes/messages.routes'); 
const router_rides = require('./routes/rides.routes');
const router_auth = require('./routes/auth.routes');

//*CALL ALL TABLES
const usersModel = require('./models/users.model');
const userRidesModel = require('./models/user_rides.model');
const userPlacesModel = require('./models/user_places.model');
const ridesModel = require('./models/rides.model');
const messagesModel = require('./models/messages.model');
const favPlacesModel = require('./models/fav_places.model');
const paymentMethodModel = require('./models/payment_method.model');
//*END CALLING ALL TABLES


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
app.use('/messages', router_messages)
app.use('/rides', router_rides)
app.use('/auth', router_auth);

app.listen(port, () => {
    console.log('Server Running at http://localhost:' + port);
})