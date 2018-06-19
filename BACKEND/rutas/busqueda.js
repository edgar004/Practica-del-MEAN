var express=require('express')
var app=express()
var tipoUsuarioSchema=require('../modelo/tiposUsuario.modelo')
var usuarioSchema=require('../modelo/usuario.modelo')
var suplidoresSchema=require('../modelo/suplidores.modelo')
var productosSchema=require('../modelo/productos.modelo')

app.get('/:tabla/:termino',(req,res)=>{
	var tabla=req.params.tabla
	var termino=req.params.termino
	let terminoRXG=new RegExp(termino,'i')
	if(tabla=="usuario"){
		buscarUsuario(terminoRXG).then(usuario=>{
		return res.status(200).json({
		ok:true,
		datos:usuario
	})
	})

	}else if(tabla=="tipoUsuario"){
		buscarTipo(terminoRXG).then(tipoUsuarios=>{
			return res.status(200).json({
				ok:true,
				datos:tipoUsuarios
			})
		})
	}else if(tabla=='suplidores'){
		buscarSuplidores(terminoRXG).then(suplidores=>{
			return res.status(200).json({
				ok:true,
				datos:suplidores
			})
		})
	}

	else if(tabla=='productos'){
		buscarProductos(terminoRXG).then(productos=>{
			return res.status(200).json({
				ok:true,
				datos:productos
			})
		})
	}
	
	



})



function buscarUsuario(terminoRxg){

	return new Promise ((resolver,reject)=>{
		tipoUsuarioSchema.find({},'_id').or([{'nombre':terminoRxg}])
	.exec((err,nombreTipo)=>{
		if(err){
			resolver("Error al buscar el tipo de usuario")
			
		}
	

		usuarioSchema.find({},'nombre correo estado tipo_usuario')
		.or([{nombre:terminoRxg},{correo:terminoRxg},{tipo_usuario:nombreTipo}])
		.populate('tipo_usuario')
		.exec((err,UsuarioDB)=>{
			if(err){
			 resolver("Error al buscar el usuario")
			}
			resolver(UsuarioDB)

		})

	})


	})
	
}

function buscarTipo(terminoRxg){
	return new Promise((resolver,reject)=>{
		tipoUsuarioSchema.find({},'nombre descripcion').or([{'nombre':terminoRxg},{'descripcion':terminoRxg}])
		.exec((err,tipoDB)=>{
			if(err){
				 resolver("Error al buscar el Tipo de usuario")
			}

			resolver(tipoDB)

		})
		
	})

}

function buscarSuplidores(terminoRxg){
	return new Promise((resolver,reject)=>{
		suplidoresSchema.find({estado:true}).or([{'nombre':terminoRxg},{'direccion':terminoRxg}])
		.exec((err,suplidorDB)=>{
				if(err){
				 resolver("Error al buscar el suplidor")
			}

			resolver(suplidorDB)
		})
	})

}


function buscarProductos(terminoRxg){
             
	return new Promise ((resolver,reject)=>{
		suplidoresSchema.find({},'_id').or([{'nombre':terminoRxg}])
	.exec((err,nombreSupli)=>{
		if(err){
			resolver("Error al buscar el tipo de suplidor")
			
		}
	

		productosSchema.find({},)
		.or([{nombre:terminoRxg},{descripcion:terminoRxg},{suplidor:nombreSupli}])
		.populate('tipo_usuario')
		.exec((err,productoDB)=>{
			if(err){
			 resolver("Error al buscar el producto")
			}
			resolver(productoDB)

		})

	})



	})

	

}




module.exports=app