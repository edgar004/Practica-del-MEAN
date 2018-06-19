var express=require('express')

//Inicializar variables
var app=express()

app.get('/',(req,res)=>{
	return res.status(200).json({
		ok:true,
		mensaje:"Estas en la raiz"
	})
})


module.exports=app