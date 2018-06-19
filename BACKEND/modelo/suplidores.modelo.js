var mongoose=require('mongoose')
var esquema=mongoose.Schema


var SuplidorSchema=new esquema({
	'nombre':{type:String,required:[true,'El nombre del suplidor es requerido']},
	'direccion':{type:String,required:[true,'La direccion del suplidor es requerida']},
	'estado':{type:Boolean,default:true,required:[true,'La estado del suplidor es requerido']}
})


module.exports=mongoose.model('Suplidor',SuplidorSchema)