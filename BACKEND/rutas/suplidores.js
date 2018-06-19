var express=require('express')
var app=express()
var suplidoresSchema=require('../modelo/suplidores.modelo')

/*//////////////////////
 Agregar  suplidores
/////////////////////////*/
app.post('/',(req,res)=>{
	let body=req.body
	let suplidores=new suplidoresSchema({
		nombre:body.nombre,
		direccion:body.direccion
	})
	suplidores.save((err,suplidorGuardado)=>{
		if(err){
			return res.status(500).json({
				ok:false,
				error:'Error al registrar el suplidores',
				errors:err
			})
		}

		res.status(200).json({
			ok:true,
			mensaje:`El suplidor ${suplidorGuardado.nombre} se ha registrado correctamente.`,
			suplidorGuardado:suplidorGuardado
		})

	})

})


app.get('/',(req,res)=>{
suplidoresSchema.find({estado:true},(err,suplidorDB)=>{
	if(err){
		return res.status(500).json({
				ok:false,
				error:'Error al traer los suplidores',
				errors:err
			})
	}

		res.status(200).json({
			ok:true,
			datos:suplidorDB
		})
})
	
})

/*//////////////////////
 Obtener  un suplidor
/////////////////////////*/
app.get('/:id',(req,res)=>{
	var id=req.params.id
	suplidoresSchema.findById(id,{estado:true},(err,suplidorDB)=>{
		if(err){
			return res.status(500).json({
				ok:false,
				mensaje:"Error al buscar el suplidor",
				errors:err
			})
		}

		if(suplidorDB==undefined){
			return res.status(400).json({
			ok:true,
			'mensaje':'No existe un suplidor con ese id'
		})
		}

		return res.status(200).json({
			ok:true,
			datos:suplidorDB
		})
	})
})


/*//////////////////////
 Modificar  un suplidor
/////////////////////////*/

app.put('/:id',(req,res)=>{
	let id=req.params.id
	let body=req.body
	suplidoresSchema.findById(id,{},(err,suplidorDB)=>{
		if(err){
			return res.status(500).json({
				ok:false,
				mensaje:"Error al buscar el suplidor",
				errors:err
			})
		}

			if(suplidorDB==undefined){
			return res.status(400).json({
			ok:true,
			'mensaje':'No existe un suplidor con ese id'
		})
		}

		suplidorDB.nombre=body.nombre
		suplidorDB.clave=body.clave
		suplidorDB.correo=body.correo
		suplidorDB.estado=body.estado
		suplidorDB.tipo_usuario=body.tipo_usuario

		suplidorDB.save((err,suplidorModificado)=>{
			if(err){
				return res.status(500).json({
				ok:false,
				mensaje:"Error al modificar el suplidor",
				errors:err
			})
			}

			res.status(200).json({
				ok:true,
				mensaje:`Suplidor ${suplidorModificado.nombre} modificado correctamente`
			})	


		})

	})

})


/*//////////////////////
 Eliminar  un suplidor
/////////////////////////*/


app.delete('/:id',(req,res)=>{
	let id=req.params.id
	suplidoresSchema.findByIdAndUpdate(id,{ $set: {estado:false}},(err,suplidorBorrado)=>{
		if(err){
				return res.status(500).json({
				ok:false,
				mensaje:"Error al eliminar el suplidor",
				errors:err
			})
				
		}

		res.status(200).json({
			ok:true,
			mensaje:`El suplidor ${suplidorBorrado.nombre} ha sido eliminado correctamente`
		})
	})
})




module.exports=app