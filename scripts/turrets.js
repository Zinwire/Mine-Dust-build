//Собрал все турели в один файл для удобства

//md-cannon
try{

	const cannon = extend(ItemTurretType, {})

} catch(error){
	Log.info("[md] Cannon doesn't load");
	if(error.stack){
		Log.info(error.stack);
	}
}