var express=require('express')
var appPrincial=require('./rutas/app')
var mongoose=require('mongoose')
var bodyParser = require('body-parser');
//Inicializar variables
var app=express()
var usuario=require('./rutas/usuarios')
var Tipousuario=require('./rutas/tiposUsuarios')
var busqueda=require('./rutas/busqueda')
var suplidores=require('./rutas/suplidores')
var productos=require('./rutas/productos')

mongoose.connection.openUri('mongodb://localhost:27017/EjercicioMean',(err,conexion)=>{
	if(err) throw err;

	console.log('Conexion correctamente.')

})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  
  next();
});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/usuario',usuario)
app.use('/tipoUsuario',Tipousuario)
app.use('/busqueda',busqueda)
app.use('/suplidores',suplidores)
app.use('/productos',productos)
app.use('/',appPrincial)
app.listen(3000,()=>{
	console.log('Puerto 3000')
})




