var mongoose=require('mongoose')
var esquema=mongoose.Schema
var uniqueValidator=require('mongoose-unique-validator')
var tipoUsuario=new esquema({
	nombre:{type:String,required:[true,'El campo nombre es requerido'],unique:true},
	descripcion:{type:String,required:[true,'El campo descripcion es requerdio']}
})

tipoUsuario.plugin(uniqueValidator,{message:"EL {PATH} debe ser unico."})

module.exports=mongoose.model('TipoUsuario',tipoUsuario)

