var mongoose=require('mongoose')
var esquema=mongoose.Schema

var productoSchema=new esquema({
	nombre:{type:String,required:[true,'El nombre del producto es requerido.']},
	descripcion:{type:String,required:[true,'La descripcion del producto es requerida.']},
	cantidad:{type:Number,required:[true,'La cantidad del producto es requerida.']},
	precio:{type:Number,required:[true,'El precio del producto es requerido.']},
	suplidor:{type:mongoose.Schema.Types.ObjectId,ref:'Suplidor',required:[true,'El suplidor es requerido']}

})

module.exports=mongoose.model('Productos',productoSchema)