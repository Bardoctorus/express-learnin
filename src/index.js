import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import uuidv4 from 'uuid/v4';
import express from 'express';
import fs from 'fs';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let rawlads = fs.readFileSync('mansandlengs.json');
let madlads = JSON.parse(rawlads);


//----GETTA

app.get ('/lads', (req,res) => {
   return res.send(Object.values(madlads.lads));
});

app.get ('/lads/:userId', (req,res) => {
    return res.send(madlads.lads[req.params.userId]);
});

app.get ('/lengs', (req, res) =>{
    return res.send(Object.values(madlads.lengs));
});
app.get ('/lengs/:lengId', (req, res) =>{
    return res.send(madlads.lengs[req.params.userId]);
});

//---POSTY


app.post('/users', (req,res)=> {
    return res.send('posty, manna posty');
});

app.post('/lads', (req,res)=>{
    console.log(req.body);
    const id = uuidv4();
    const payload = {
        id,
        name: JSON.parse(req.body),
    };
    madlads.lads[id] = payload;
    console.log(madlads);
    return res.send(payload);
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



app.listen(process.env.PORT, () => {
    console.log('Me Listnin\' on '+process.env.PORT);
});

console.log('This should be arses');

console.log(process.env.SECRET_PASS);

let fish = 5;
let banana = 18;
console.log('quick maths: '+ (fish+banana));

