var express=require('express')
var UsuarioSchema=require('../modelo/usuario.modelo')
//Inicializar variables
var app=express()
/*//////////////////////
 Agregar  usuario
/////////////////////////*/
app.post('/',(req,res)=>{
	var body=req.body
	var usuario=new UsuarioSchema({
		nombre:body.nombre,
		correo:body.correo,
		tipo_usuario:body.tipo_usuario,
		clave:body.clave
	})

	usuario.save((err,usuarioGuardado)=>{
		if(err){
			return res.status(500).json({
				ok:false,
				mensaje:"Error al registrar el usuario",
				errros:err
			})
		}

		return res.status(200).json({
			ok:true,
			usuario:usuarioGuardado,
			mensaje:`El usuario ${usuarioGuardado.nombre} se a registrado correctamente.`
		})
	})

})


/*//////////////////////
 Mostrar  usuario
/////////////////////////*/
app.get('/',(req,res)=>{
	UsuarioSchema.find({},)
	.populate('tipo_usuario')
	.exec((err,usuarioDB)=>{
		if(err){
			return res.status(500).json({
				ok:false,
				mensaje:"Error al traer los usuarios",
				errors:err
			})
		}

		return res.status(200).json({
			ok:true,
			datos:usuarioDB
		})
	})
})

/*//////////////////////
 Obtener  un usuario
/////////////////////////*/
app.get('/:id',(req,res)=>{
	var id=req.params.id
	UsuarioSchema.findById(id,{},(err,usuarioDB)=>{
		if(err){
			return res.status(500).json({
				ok:false,
				mensaje:"Error al buscar el usuario",
				errors:err
			})
		}

		if(usuarioDB==undefined){
			return res.status(400).json({
			ok:true,
			'mensaje':'No existe un usuario con ese id'
		})
		}

		return res.status(200).json({
			ok:true,
			datos:usuarioDB
		})
	})
})

/*//////////////////////
 Modificar  un usuario
/////////////////////////*/

app.put('/:id',(req,res)=>{
	let id=req.params.id
	let body=req.body
	UsuarioSchema.findById(id,{},(err,usuarioDB)=>{
		if(err){
			return res.status(500).json({
				ok:false,
				mensaje:"Error al buscar el usuario",
				errors:err
			})
		}

			if(usuarioDB==undefined){
			return res.status(400).json({
			ok:true,
			'mensaje':'No existe un usuario con ese id'
		})
		}

		usuarioDB.nombre=body.nombre
		usuarioDB.clave=body.clave
		usuarioDB.correo=body.correo
		usuarioDB.estado=body.estado
		usuarioDB.tipo_usuario=body.tipo_usuario

		usuarioDB.save((err,usuarioModificado)=>{
			if(err){
				return res.status(500).json({
				ok:false,
				mensaje:"Error al modificar el usuario",
				errors:err
			})
			}

			res.status(200).json({
				ok:true,
				mensaje:`Usuario ${usuarioModificado.nombre} modificado correctamente`
			})	


		})

	})

})


/*//////////////////////
 Eliminar  un usuario
/////////////////////////*/


app.delete('/:id',(req,res)=>{
	let id=req.params.id
	UsuarioSchema.findByIdAndRemove(id,(err,usuarioBorrado)=>{
		if(err){
				return res.status(500).json({
				ok:false,
				mensaje:"Error al eliminar el usuario",
				errors:err
			})
				
		}

		res.status(200).json({
			ok:true,
			mensaje:`El usuario ${usuarioBorrado.nombre} ha sido eliminado correctamente`
		})
	})
})

module.exports=app