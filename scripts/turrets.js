let logger = require("libs/logger");

//Собрал все турели в один файл для удобства
Log.info("[green][md][] [blue]Файл turrets.js запущен[]");

//md-cannon
try{

	const cannon = extend(ItemTurretType, {})

} catch(err){
	logger.blockError("Cannon", err);
}