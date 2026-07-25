//Собрал все турели в один файл для удобства
Log.info("[md] [blue]Файл turrets.js запущен[]");

//md-cannon
try{

	const cannon = extend(ItemTurretType, {})

} catch(error){
	Log.info("[md] [scarlet]Cannon не запустился, т.к:[]");
	if(error.stack){
		Log.info("[#eaff00]" + error.stack + "[]");
	}
}