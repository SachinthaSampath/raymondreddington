const handleSignin=(knex,bcrypt)=>(req,res)=>{ 
	let {email,password}=req.body; 
	if(!email||!password){
		res.status(400).json("incorrect form submission");
		return;
	}
	knex.select("email","hash").from("login")
	.where("email","=",req.body.email)
	.then(result=>{
		let isValid = bcrypt.compareSync(req.body.password, result[0].hash); 
		if(isValid){
			return knex.select("*").from("users")
			.where("email","=",req.body.email)
			.then(user=>{
				console.log(user);  
				res.json(user[0]);
			})
			.catch(err=>res.status(400).json("Unable to get user"));
		}else{
			res.status(400).json("wrong credentials inserted");
		}
	})
	.catch(err=>res.status(400).json("wrong credentials "));
}

module.exports={
	handleSignin
}