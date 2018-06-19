var express=require('express')
var app=express()
var productoSchema=require('../modelo/productos.modelo')


/*//////////////////////
 Agregar  productos
/////////////////////////*/
app.post('/',(req,res)=>{
	var body=req.body
	var producto=new productoSchema({
		nombre:body.nombre,
		descripcion:body.descripcion,
		cantidad:body.cantidad,
		precio:body.precio,
		suplidor:body.suplidor
	})

	producto.save((err,productoGuardado)=>{
		if(err){
			return res.status(500).json({
				ok:false,
				mensaje:'Error al registar el producto',
				errors:err
			})
			}

			res.status(200).json({
				ok:true,
				mensaje:`El producto ${productoGuardado.nombre} se ha registrado correctamente.`

			})
		
	})



})


/*//////////////////////
 Obtener Productos
/////////////////////////*/

app.get('/',(req,res)=>{
productoSchema.find({})
.populate('suplidor').
exec((err,productosDB)=>{
	if(err){
		return res.status(500).json({
				ok:false,
				error:'Error al traer los productos',
				errors:err
			})
	}

		res.status(200).json({
			ok:true,
			datos:productosDB
		})
})
	
})

/*//////////////////////
 Obtener un  Productos
/////////////////////////*/
app.get('/:id',(req,res)=>{
	let id=req.params.id
	productoSchema.findById(id,(err,productoDB)=>{
		if(err){
			return res.status(500).json({
				ok:false,
				error:'Error al traer los productos',
				errors:err
			})
		}

	        res.status(200).json({
			ok:true,
			datos:productoDB
		})
	})
})


/*//////////////////////
 Modificar un  Productos
/////////////////////////*/
app.put('/:id',(req,res)=>{
	let id=req.params.id
	let body=req.body
	 productoSchema.findById(id,(err,productosDB)=>{
	 	if(err){
			return res.status(500).json({
				ok:false,
				error:'Error al traer los productos',
				errors:err
			})
		}

		productosDB.nombre=body.nombre                   
		productosDB.descripcion=body.descripcion                   
		productosDB.cantidad=body.cantidad                   
		productosDB.precio=body.precio                   
		productosDB.suplidor=body.suplidor 

		productosDB.save((err,productoModificado)=>{
			 	if(err){
			   return res.status(500).json({
				ok:false,
				error:'Error al traer los productos',
				errors:err
			})
		}

			res.status(200).json({
				ok:true,
				mensaje:`El producto ${productoModificado.nombre} se ha modificado correctamente.`,
				productoModificado:productoModificado
			})
		})
	 	
	 })
})


app.delete('/:id',(req,res)=>{
	let id=req.params.id
	productoSchema.findByIdAndRemove(id,(err,productoBorrado)=>{
			 	if(err){
			   return res.status(500).json({
				ok:false,
				error:'Error al eliminar el productos',
				errors:err
			})
		}
			res.status(200).json({
				ok:true,
				mensaje:`El producto ${productoBorrado.nombre} se ha eliminado correctamente.`,
				productoBorrado:productoBorrado
			})

	})
})

module.exports=app