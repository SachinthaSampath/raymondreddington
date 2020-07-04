const handleProfile=(req,res,knex)=>{
	let {id} =req.params;	
	knex.select("*").from("users").where({id})
	.then(user=>{
		if(user.length){
			res.json(user[0]);
		}else{
			res.status(400).json("Not found");
		}
	})
}
module.exports={
	handleProfile
}