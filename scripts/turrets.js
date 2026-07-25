//Собрал все турели в один файл для удобства
Log.info("[md] turrets.js запущен");

//md-cannon
try{

	const cannon = extend(ItemTurretType, {})

} catch(error){
	Log.info("[md] Cannon не запустился");
	if(error.stack){
		Log.info(error.stack);
	}
}