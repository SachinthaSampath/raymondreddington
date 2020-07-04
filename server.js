const express = require("express");
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const ap =new  Clarifai.App({
  apiKey:"9b3812e96ef44a7996a327720fae6575",
});

const handleApiCall=(req,res)=>{
	ap.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	.then(data=>res.json(data))
	.catch(err=>res.status(400).json("unable to work with api"));
}

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '1234',
    database : 'smartbrain'
  }
});


const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cors());


app.get('/',(req,res)=>{
	bcrypt.compare("apples", "$2a$10$RGGkCZdElVX/SHqhqlJ8jOQCkRaYLkuzzV4Gm64lkzer.2kHYzbk.", function(err, res) {
		console.log(res);
	});
	bcrypt.compare("bacon", "$2a$10$RGGkCZdElVX/SHqhqlJ8jOQCkRaYLkuzzV4Gm64lkzer.2kHYzbk.", function(err, res) {
		console.log(res);
	});
	res.send(database.users);
})

app.post('/signin',signin.handleSignin(knex,bcrypt));

app.post('/register',(req,res)=>{register.handleRegister(req,res,knex,bcrypt)});	 

app.get("/profile/:id",(req,res)=>{profile.handleProfile(req,res,knex)})

app.put('/image',(req,res)=>{image.handleImage(req,res,knex)});
app.post('/imageurl',(req,res)=>{handleApiCall(req,res)});

app.listen(process.env.PORT||3000,()=>{
	console.log('app is listening at port ${process.env.PORT}');
});

// /signin ->post = success/fail
// /register -> post = user
// /profile/:userId ->GET = user


// const http = require("http");
// const server = http.createServer((req,res)=>{
// 	console.log(JSON.stringify(req.body));
// 	res.end(JSON.stringify(req.query));
// });
 

// server.listen(444);



// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });