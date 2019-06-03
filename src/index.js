//just fpollowing this for a lark https://www.robinwieruch.de/node-express-server-rest-api/

import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import uuidv4 from 'uuid/v4';
import express from 'express';
import fs from 'fs';
import models from './models';



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// by moving the data into a separate models dir we
// make it distinct from the main index. 
// models could  be a db interface eventually
app.use((req,res,next) => {
req.context = {
    models,
    me: models.users[1],
};
next();
});




//----GETTA



app.get('/session', (req, res) => {
    return res.send(req.context.models.users[req.context.me.id]);
});

app.get ('/users', (req,res) => {
   return res.send(Object.values(req.context.models.users));
});

app.get ('/users/:userId', (rlseq,res) => {
    return res.send(req.context.models.users[req.params.userId]);
});

app.get ('/messages', (req, res) => {
    return res.send(Object.values(req.context.model.messages));
});
app.get ('/messages/:messageId', (req, res) =>{
    return res.send(req.context.model.messages[req.params.messageId]);
});

//---POSTY


app.post('/users', (req,res)=> {
    return res.send('posty, manna posty');
});

app.post('/messages', (req,res)=>{
    console.log(req.body);
    const id = uuidv4();
    const message = {
        id,
        text: req.body.text,
        userId: req.context.me.id,
    };


    req.context.models.messages[id] = message;
    console.log(message);
    return res.send(message);
});


//---puttaputta
app.put('/users/:userId', (req,res)=> {
    return res.send(
        `PUT PUTTA MAKIN da user/${req.params.userId} BUTTA`,
    );
});



///---------- DELETE MY FACE
app.delete('/users/:userId', (req,res)=> {
    return res.send(
        `users iz dead jim user/${req.params.userId}`,
    );
});

app.delete('/messages/:messageId', (req, res) => {
    const {
        [req.params.messageId]: message,
        ...otherMessages
    } = req.context.models.messages;


    req.context.models.messages = otherMessages;
    console.log(messages);
    return res.send(message);
})



app.listen(process.env.PORT, () => {
    console.log('Me Listnin\' on '+process.env.PORT);
});

console.log('This should be arses');

console.log(process.env.SECRET_PASS);

let fish = 5;
let banana = 18;
console.log('quick maths: '+ (fish+banana));

