var express=require('express')
var app=express()
var tipoUsuarioSchema=require('../modelo/tiposUsuario.modelo')
var usuarioSchema=require('../modelo/usuario.modelo')






/*//////////////////////
 Mostrar tipo de usuario
/////////////////////////*/
app.get('/',(req,res)=>{
	tipoUsuarioSchema.find({},(err,tipoDB)=>{
		if(err){
			return res.status(500).json({
				ok:false,
				mensaje:"Error al traer el tipo de usuario",
				errors:err
			})
		}

		return res.status(200).json({
			ok:true,
			datos:tipoDB
		})
	})
})


/*//////////////////////
 Obtener  un Tipo usuario
/////////////////////////*/
app.get('/:id',(req,res)=>{
	var id=req.params.id
	tipoUsuarioSchema.findById(id,{},(err,tipoDB)=>{
		if(err){
			return res.status(500).json({
				ok:false,
				mensaje:"Error al buscar el tipo de usuario",
				errors:err
			})
		}

		if(tipoDB==undefined){
			return res.status(400).json({
			ok:true,
			'mensaje':'No existe un tipo de usuario con ese id'
		})
		}

		return res.status(200).json({
			ok:true,
			datos:tipoDB
		})
	})
})


/*//////////////////////
 Agregar tipo de usuario
/////////////////////////*/
app.post('/',(req,res)=>{
	var body=req.body

	var tipoUsuario=new tipoUsuarioSchema({
		'nombre':body.nombre,
		descripcion:body.descripcion
	})
	tipoUsuario.save((err,tipoGuardado)=>{
		if(err){
			return res.status(500).json({
				ok:false,
				mensaje:"Error al registrar el tipo de usuario.",
				erros:err
			})
		}

		res.status(200).json({
			ok:true,
			mensaje:`El tipo de usuario ${tipoGuardado.nombre} se a registrado correctamente.`,
			tipoUsuario:tipoGuardado
		})
	})

})


/*//////////////////////
 Modificar tipo de usuario
/////////////////////////*/
app.put('/:id',(req,res)=>{
	var body=req.body
	var id=req.params.id
	tipoUsuarioSchema.findById(id,{},(err,tipoDB)=>{
		if(err){
			return res.status(500).json({
				ok:false,
				mensaje:"Error el buscar el tipo de usuario.",
				errors:err
			})
		}

		if(tipoDB==undefined){
			return res.status(400).json({
				ok:false,
				mensaje:"No existe un tipo de usuario con el id " + id,
				errors:{menssage:"No existe un tipo de usuario con ese id."}
			})
		}

		tipoDB.nombre=body.nombre
		tipoDB.descripcion=body.descripcion

		tipoDB.save((err,tipoModificado)=>{
			if(err){
				return res.status(500).json({
					ok:false,
					mensaje:"Error al modificar el tipo de usuario.",
					errors:err
				})
			}

			res.status(200).json({
				ok:true,
				mensaje:`El tipo de usuario ${tipoModificado.nombre} se ha modificado correctamente.`,
				tipoModificado:tipoModificado

			})
		})

	})

})


/*//////////////////////
 Eliminar tipo de usuario
/////////////////////////*/

app.delete('/:id',(req,res)=>{
	var id=req.params.id

	usuarioSchema.find({tipo_usuario:id},(err,usuarioDB)=>{
		if(err){
			return res.status(500).json({
					ok:false,
					mensaje:"Error al buscar el usuario.",
					errors:err
				})
		}

		if(usuarioDB.length>0){
			return res.status(500).json({
					ok:false,
					mensaje:"No puede eliminar ese tipo de usuario porque esta en uso.",
					errors:{menssage:"No puede eliminar ese tipo de usuario"}
				})

		}


	tipoUsuarioSchema.findByIdAndRemove(id,(err,tipoBorrado)=>{
		if(err){
			return res.status(500).json({
					ok:false,
					mensaje:"Error al eliminar el tipo de usuario.",
					errors:err
				})
		}

		if(tipoBorrado==undefined){
			return res.status(400).json({
				ok:false,
				mensaje:"No existe un tipo de usuario con el id " + id,
				errors:{menssage:"No existe un tipo de usuario con ese id."}
			})
		}

		res.status(200).json({
				ok:true,
				tipoBorrado:tipoBorrado

			})
	})


	})



})

module.exports=app