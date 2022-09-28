const express = require('express');
const db = require('mysql');
const parser = require('body-parser')
const cors = require('cors');
const fs = require('fs');
const http = require('http');
app = express();
app.use(cors())

let newAccUser = ''
let newAccPassword = ''

const server = http.createServer(app);

const io = require('socket.io')(server,{
    cors:{
        origin: "*"
    }
})

const urlParser = parser.json({
    extended: false
})

database = db.createConnection({
    host: 'localhost',
    user: 'dotadmin',
    password: 'dot.Admin',
    database: 'dotusers'
});

database.connect((err) => {
    if (err) throw err;
    console.log('Database connected');
});

var userNames = {}


// app.get('/profileImg',(req,res)=>{
//     const url = req.query.url;
//     const fullUrl = `./userfiles/${url}/profile.jpg`

//     fs.readFile(fullUrl, (err, data)=>{
//          if (err) throw err;
//          res.send(data);
//      })
// })


/*Example testing for image */
app.get('/profileImg', (req, res) => {
    const fullUrl = './userfiles/gagneesh7018616153/profile.jpg'

    fs.readFile(fullUrl, (err, data) => {
        if (err) throw err;
        res.send(data);
    })
})

/*Adding messages to the database */
app.post('/addMesg',urlParser,(req,res)=>{
    const message = req.body.message;
    const sender = req.body.sender;
    const reciver = req.body.receiver;

    console.log('Username message is: ',message,sender,reciver)

    let query = `INSERT INTO ${sender}chats(username,message,status) VALUES('${reciver}','${message}','sent')`;

    let queryAdd = `INSERT INTO ${reciver}chats(username,message,status) VALUES('${sender}','${message}','rec')`;

    database.query(query, (err, result)=>{
        if (err) throw err;
        console.log('Adding message successfull')
    })
    database.query(queryAdd,(err,result)=>{
        if (err) throw err;
        console.log('Adding mesg to other successful')
    })
})

/*Sending array of message */
app.post('/chats',urlParser,(req,res)=>{
    const username = req.body.currentUsername;
    const myUsername = req.body.myUsername;
    
    let query = `SELECT * FROM ${myUsername}chats WHERE username='${username}'`;

    database.query(query, (err, result)=>{
        if(err) throw err;
        res.send(result);
    })
});

/*Code for user contacts details */
app.post('/usercontacts',urlParser, (req, res) => {
    const myUsername = req.body.myUsername;

    const squer = `SELECT username FROM rusers`

    database.query(squer, (err, result) => {
        if (err) throw err;
        res.send(result);
    }
    )
})

/*Code for dealing with login page */
app.post('/userlogin', urlParser, (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    const squer = `SELECT * FROM rusers WHERE username="${username}"`;
    const pquer = `SELECT * FROM rusers WHERE username="${username}" AND password="${password}"`;

    const user = database.query(squer, (err, result) => {
        console.log('Url is called');
        if (err) throw err;
        if (result.length != 0) {
            const pass = database.query(pquer, (err, result) => {
                if (err) throw err;

                if (result != 0) {
                    res.json({ "login": "true", "phone": `${result[0].phone}` })
                    console.log('Login Successfull')
                }
                else {
                    res.json({ "login": "false", "type": "invalidPassword" })
                    console.log('Unsuccessfull, Invalid Password')
                }
            })
        } else {
            res.json({ "login": "false", "type": "No Username Found" });
            console.log('Login Failed, No username found');
        }
    })
})

function addAccount(susername,spassword){
    const addChats = `CREATE TABLE "${susername}"chats(username VARCHAR(20), message TEXT(400),status VARCHAR(10) , date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`
    const addUrl = `CREATE TABLE "${susername}"recurl(username VARCHAR(10), url TEXT(200))`
    const insert = `INSERT INTO rusers(username, password) VALUES("${susername}","${spassword}")`

        // database.query(insert, (err, result)=>{
        //     if(err) throw err;
        // })
        // database.query(addUrl, (err, result)=>{
        //     if (err) throw err;
        // })
        // database.query(addChats, (err, result)=>{
        //     if (err) throw err;
        // })
}

app.post('/signup', urlParser, (req, res) => {
    newAccUser = req.body.susername;
    newAccPassword = req.body.spassword;

    if(newAccUser===''){
        res.send('No username entered')
        return
    }

    database.query('SELECT username FROM rusers', (err, result) => { 
        console.log('We are before the execution')
        if (err) throw err;
        console.log('Username is : ', newAccUser)
        for(let i = 0; i<result.length;i++){
            if(newAccUser===result[i].username){
                console.log('Account exists')
                res.send('Account already exists')
                return
            }
        }
        console.log("Before account function")
        addAccount(newAccUser, newAccPassword);
        console.log('The code is executed successfully')
        res.send('Successfully logged in');
    })

})


const userId = (username)=>{
    let usId = userNames[username];
    return usId;
}

const addMessage = (message)=>{
    mesQuery = `INSERT INTO ${message.sender}chats(username,message,status) VALUES('${message.receiver}','${message.message}','sent')`;
    mesQuery2 = `INSERT INTO ${message.receiver}chats(username,message,status) VALUES('${message.sender}','${message.message}','rec')`;

    database.query(mesQuery,(err, result)=>{
        if (err) throw err;
    });
    database.query(mesQuery2, (err, result)=>{
        if (err) throw err;
    });
}

// Creating sockets here only
io.on('connection',(socket)=>{
    let username = socket.handshake.query['username']
    let id = socket.id;

    userNames[username] = id;

    socket.on(`privateMessage`,(message)=>{
        console.log('Private message is called');
        uid = userId(message.receiver);
        message['time'] = Date.now();
        socket.to(uid).emit('privateMessage', message);
        addMessage(message);
    })
})

server.listen(5000, () => { console.log('Server is listening...') });