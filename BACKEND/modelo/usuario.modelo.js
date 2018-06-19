var mongoose=require('mongoose')
var esquema=mongoose.Schema
var uniqueValidator=require('mongoose-unique-validator')

var usuario=new esquema({
	'nombre':{type:String,required:[true,'El campo nombre es requerido']},
	'clave':{type:String,required:[true,'El campo clave es requerido']},
	'correo':{type:String,required:[true,'El campo correo es requerido'],unique:true},
	'estado':{type:Boolean,required:[true,'El estado es requerido'],default:false},
	'tipo_usuario':{type:mongoose.Schema.Types.ObjectId,ref:'TipoUsuario',required:[true,'El tipo de usuario es requerido']}

})
//PATH es la propiedad que debe ser unica
usuario.plugin(uniqueValidator,{message:'El {PATH} debe ser unico'} )

module.exports=mongoose.model('Usuario',usuario)