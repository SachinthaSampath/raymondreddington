const handleRegister=(req,res,knex,bcrypt)=>{
	let {name,email,password}=req.body; 
	if(!name||!email||!password){
		res.status(400).json("incorrect form submission");
		return;
	}
	const hash = bcrypt.hashSync(password); 

	knex.transaction((trx) =>{
		trx.insert({hash,email})
	    .into('login')
	    .returning("email")
	    .then((loginemail)=>{
	      return trx('users')
			.returning("*")
			.insert({
				name:name,
				email:loginemail[0], 
				joined:new Date()		
			}).then(user=>{
				res.json(user[0]);	
			})
	    })
	    .then(trx.commit)
    	.catch(trx.rollback);
	})
	.catch(err=>{console.log(err); res.status(400).json(false);})	
}
module.exports={
	handleRegister
}