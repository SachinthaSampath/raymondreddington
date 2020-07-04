const express = require("express");
const app = express();
const bodyparser= require("body-parser");

app.get('/',(req,res)=>{
	res.json(req.body);
})

app.use(bodyparser.json());
app.listen(3000,()=>{console.log("server is running!")});