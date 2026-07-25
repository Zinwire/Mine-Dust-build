//Функции логирования в консоль игры в одном файле
//Использовать можно через [переменная] = require("libs/logger");

function OnBlockError(blockName, exception) {
	Log.info("[green][md][] [scarlet]Блок @ не был запущен, так как:[]", blockName); //scarlet алый
	Log.err("[red]@[]", exception.toString()); 								//red более тусклый
	if(exception.stack){
		Log.info("[#eaff00]@[]", exception.stack);
	}
}

module.exports = {
	blockError: OnBlockError
}