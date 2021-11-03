const http = require('http');
const fs = require('fs')
const hostname = '0.0.0.0';
const port = 80;
const express = require('express');
const app = express();
//Include express and set up the server to host outward (0.0.0.0)'
//Function to read from the state file (Make sure this is manually created, you can use "echo off > state.txt" on any bash system) in the working directory (./)
function getS() {
    fs.readFile('./state.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data);
        return data; //return what is read
    })
}
//Function that makes the state the opposite of waht it was
function writeS(x) {
    fs.readFile('./state.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        if (data == "on") {
            fs.writeFile('./state.txt', 'off', err=> {
                if (err) {
                    return;
                }
                return "off";
            })
        } else {
            fs.writeFile('./state.txt', 'on', err=> {
                if (err) {
                    return;
                }
                return "on";
            })
        }


})
}
app.get('/', (req, res) => { //the index is useful for testing
    res.send('Hello world');
});
app.get('/api/getState', (req, res) => { //Sets up the get state endpoint
    console.log("test3");
    val = getS();
    console.log(val);
    fs.readFile('./state.txt', 'utf8', (err, data) => {
        //console.log("test2");
        if (err) {
            console.error(err);
            return;
        }
       // console.log("test");
        console.log(data);
        res.send(data);
    })
});
app.get('/api/changeState', (req, res) => {  //Sets up the change state endpoint
    val = getS();
    console.log(val);
    res.send(writeS(val));

});
app.listen(port, hostname, () => { //Listens
    console.log(`Example app listening at http://0.0.0.0:${port}`)
});