//Файл для референсов по работе с ui блоков

const logger = require("libs/logger");

logger.fileRead("testBlock.js");

try{

	const testBlock = extend(Wall, "tw", {

		description: "A test block. Sandbox Only",
		health: 1,
		size: 2,
		category: Category.effect,

		//Так как тестовый блок, показ выключен
		//раскомментировать строку ниже для включения блока в игру
		buildVisibility: BuildVisibility.sandboxOnly,

		configurable: true, //В теории, блок может быть настраиваемым

		init(){

			this.requirements = ItemStack.with(Items.copper, 1);

			this.super$init();

		}
	});
	testBlock.buildType = () => extend(Wall.WallBuild, testBlock, {

		wallMode: 0,

		buildConfiguration(table){

			table.clear();
			//table.background(Styles.black6);

			//table.button(Icon.steam, Styles.cleari, run(() => { для чистой кнопки (Как у процессора)
			table.button(new TextureRegionDrawable(Icon.steam.getRegion()), 24, run(() => {

				let healthPerc = this.health / this.maxHealth;

				this.wallMode = 0;
				this.maxHealth = 10000;
				this.health = this.maxHealth * healthPerc;
				Fx.blockCrash.at(this.x, this.y);
				Log.info("Блок с юишкой работает");
			})).size(50).tooltip("[accent]TextTEXTтекстТЕКСТ[]");

			//table.button(Icon.power, Styles.cleari, run(() => { для чистой кнопки
			table.button(new TextureRegionDrawable(Icon.power.getRegion()), 24, run(() => {

				let healthPerc = this.health / this.maxHealth;

				this.wallMode = 1;
				this.maxHealth = 10;
				this.health = this.maxHealth * healthPerc;
				Fx.blastExplosion.at(this.x, this.y);
				Log.info("[green]Блок с юишкой работает 2[]");
			})).size(50).tooltip("ЕЩЁтекстеЩёТЕКСТтеКст");

		},

		updateTile(){
			this.super$updateTile();

			if (this.wallMode === 1 && Math.random() < 0.02) { 
        		// Ищем ближайшего врага в радиусе 80 единиц (10 блоков)
        		let target = Units.closestEnemy(this.team, this.x, this.y, 80, run(u => !u.dead));
        
        		if (target != null) {
            		// Создаем настоящую игровую молнию
            		Lightning.create(this.team, Color.sky, 15, this.x, this.y, this.angleTo(target), 5);
        		}
    		}
		},

		draw(){
			this.super$draw();

			if (this.wallMode === 1) {
        		Draw.color(Color.sky);
        		Draw.rect(Icon.power.getRegion(), this.x, this.y, 8, 8);
        		Draw.reset(); // Обязательно сбрасываем цвет рисования движка!
    		}
		},

		config() {
            return java.lang.Integer.valueOf(this.wallMode);
        },

        write(write){
        	this.super$write(write);
        	write.b(this.wallMode);
        },

        read(read, revision){
        	this.super$read(read, revision);
        	this.wallMode = read.b();

        	if(this.wallMode === 0){
        		this.maxHealth = 10000;
        	} else{
        		this.maxHealth = 10;
        	}
        }
	});

} catch(e){
	logger.blockError("TestBlock", e);
}