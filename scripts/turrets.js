const logger = require("libs/logger");
const cLightning = require("libs/customLightning");
const STATS = require("STATS/turretsSTATS");

//Собрал все турели в один файл для удобства
//Log.info("[green][md][] [blue]Файл turrets.js запущен[]");
logger.fileRead("turrets.js");


//md-cannon / Пушка
try{

	const CANNON_health = STATS.cannon.health;
	const CANNON_range = STATS.cannon.range;
	const CANNON_reload = STATS.cannon.reload;

	const cannon = extend(ItemTurret,"cannon", {
		health: CANNON_health,
		size: 3,
		range: CANNON_range * 8,
		reload: CANNON_reload * 60,
		targetAir: false,
		targetGround: true,
		ammoPerShot: 3,
		maxAmmo: 30,
		inaccuracy: 12,
		hasLiquids: true,
		recoil: 2,
		recoilTime: 37,
		category: Category.turret,

		init(){
        	const radiationY = Vars.content.getByName(ContentType.status, "md-Radiation-Y");
        	const uranium = Vars.content.getByName(ContentType.item, "md-Uranium");
        	const diamond = Vars.content.getByName(ContentType.item, "md-Diamond");
        	const steel = Vars.content.getByName(ContentType.item, "md-Steel");

        	const sbullet = {
				damage: 45,
				speed: 3.3,
				width: 8,
				height: 8,
				homingPower: 0.15, homingRange: 40,
				splashDamage: 0, splashDamageRadius: 16,
				hitEffect: Fx.blastExplosion,
				despawnEffect: Fx.blastExplosion
			};
			sbullet.splashDamage = sbullet.damage * 0.4;

        	this.requirements = ItemStack.with(
        		Items.silicon, 70,
        		Items.graphite, 70,
        		Items.titanium, 85,
        		steel, 100,
        		diamond, 50
        	);

        	this.buildVisibility = BuildVisibility.shown;

        	//Угольные пт
        	const coalBullet = extend(BasicBulletType, {
        		damage: sbullet.damage + 5,
        		speed: sbullet.speed,
        		width: sbullet.width,
        		height: sbullet.height,
        		homingPower: sbullet.homingPower, homingRange: sbullet.homingRange,
        		splashDamage: sbullet.splashDamage, splashDamageRadius: sbullet.splashDamageRadius,
        		hitEffect: Fx.blastExplosion, despawnEffect: Fx.blastExplosion,
        		status: StatusEffects.melting, statusDuration: 5 * 60,
        		ammoMultiplier: 2,
        		//frontColor: Color.valueOf();
        		//backColor: Color.valueOf();
        		hitSound: Sounds.explosion
        	});
			coalBullet.lifetime = cannon.range / coalBullet.speed;

			//Взрывчатые пт
			const blastBullet = extend(BasicBulletType, {
				damage: sbullet.damage - 25,
        		speed: sbullet.speed,
        		width: sbullet.width,
        		height: sbullet.height,
        		homingPower: sbullet.homingPower, homingRange: sbullet.homingRange,
        		splashDamageRadius: sbullet.splashDamageRadius + 14,
        		hitEffect: Fx.blastExplosion, despawnEffect: Fx.blastExplosion,
        		status: StatusEffects.blasted, statusDuration: 5 * 60,
        		ammoMultiplier: 3,
        		frontColor: Color.valueOf("f06666"),
        		backColor: Color.valueOf("DB1515"),
        		hitSound: Sounds.explosion
			});
			blastBullet.lifetime = cannon.range / blastBullet.speed;
			blastBullet.splashDamage = blastBullet.damage * 2.8;

			//Ториевые пт
			const thoriumBullet = extend(BasicBulletType, {
				damage: sbullet.damage + 30,
        		speed: sbullet.speed,
        		width: sbullet.width - 1,
        		height: sbullet.height - 1,
        		homingPower: sbullet.homingPower, homingRange: sbullet.homingRange,
        		splashDamageRadius: sbullet.splashDamageRadius - 5,
        		hitEffect: Fx.blastExplosion, despawnEffect: Fx.blastExplosion,
        		status: radiationY, statusDuration: 30 * 60,
        		ammoMultiplier: 1,
        		frontColor: Color.valueOf("f9a3c7"),
        		backColor: Color.valueOf("c8486d"),
        		hitSound: Sounds.explosion
			});
			thoriumBullet.lifetime = cannon.range / thoriumBullet.speed;
			thoriumBullet.splashDamage = thoriumBullet.damage * 0.2;

			//Урановые пт
			const uraniumBullet = extend(BasicBulletType, {
				damage: sbullet.damage + 40,
        		speed: sbullet.speed,
        		width: sbullet.width,
        		height: sbullet.height,
        		homingPower: sbullet.homingPower, homingRange: sbullet.homingRange,
        		splashDamageRadius: sbullet.splashDamageRadius - 2,
        		hitEffect: Fx.blastExplosion, despawnEffect: Fx.blastExplosion,
        		status: radiationY, statusDuration: 5 * 60 * 60,
        		ammoMultiplier: 3,
        		frontColor: Color.valueOf("65f07c"),
        		backColor: Color.valueOf("0C7D1F"),
        		hitSound: Sounds.explosion
			});
			uraniumBullet.lifetime = cannon.range / uraniumBullet.speed;
			uraniumBullet.splashDamage = uraniumBullet.damage * 0.5;

			this.ammo(
				Items.coal, coalBullet,
				Items.blastCompound, blastBullet,
				Items.thorium, thoriumBullet,
				uranium, uraniumBullet);

			this.shoot.shots = 3;
			this.shoot.shotDelay = 7;

			cannon.consume(new Packages.mindustry.world.consumers.ConsumeCoolant(0.3, true, false)).update = false;			

			this.super$init();
		}
	});

} catch(err){
	logger.blockError("Cannon", err);
}

//md-tesla / Тесла
try{

	const TESLA_damage = STATS.tesla.damage;
	const TESLA_health = STATS.tesla.health;
	const TESLA_range = STATS.tesla.range;
	const TESLA_reload = STATS.tesla.reload;
	const TESLA_consumePower = STATS.tesla.consumePower;
	const TESLA_maxHits = STATS.tesla.maxHits;
	const TESLA_bounceRadius = STATS.tesla.bounceRadius;
	
	const tesla = extend(PowerTurret, "tesla", {

		//json параметры
		size: 2,
		health: TESLA_health,
		range: TESLA_range * 8,
		reload: TESLA_reload * 60,
		targetAir: true,
		category: Category.turret,
		buildVisibility: BuildVisibility.shown,

		setStats() {
        	this.super$setStats(); // Исполняем базовые поля
	
        	//Удаляем лишние поля
        	this.stats.remove(Stat.inaccuracy); 
        	this.stats.remove(Stat.ammo); 
	
        	// ДОБАВЛЯЕМ СВОИ СТРОКИ И ПЕРЕПИСЫВАЕМ СТАРЫЕ
        	// Переписываем Разброс в категорию "Действие" (StatCat.function) со своим значением
        	// Вместо градуса можем написать любое кастомное пояснение или число
        	this.stats.add(
            	Stat.inaccuracy, 
            	StatValues.string(Core.bundle.get("block.md-tesla.dontmiss"))
        	);
	
        	// StatCat.function - это категория "Действие" в меню
        	// Добавляем строку: Урон цепной молнии

        	/*
        	this.stats.add(
        		Stat.damage, 
        		StatValues.string(Core.bundle.format("stat.dmgPoints", TESLA_damage))
        	);
	
        	// Добавляем кастомную строку для количества прыжков
        	// Иcпользуем созданную вручную Stat-метрику, чтобы игра вывела нормальный текст
        	this.stats.add(
        		new Stat("customMaxHits", StatCat.function), 
        		StatValues.string(Core.bundle.format("stat.maxHits", TESLA_maxHits))
        	);
	
        	// Показываем радиус прыжка тока (10 блоков)
        	this.stats.add(
        		new Stat("customBounceRadius", StatCat.function), 
        		TESLA_bounceRadius, 
        		StatUnit.blocks
        	);
        	*/

        	 this.stats.add(Stat.ammo, extend(Packages.mindustry.world.meta.values.AmmoListValue, {
            // Метод display строит внутренности нашей рамки, и игра сама сделает обводку!
            display(table) {
                table.row();
                table.add("").width(10); // Аккуратный отступ слева под ванильный стиль

                // Создаем простую текстовую таблицу
                let contentTable = new Packages.arc.scene.ui.layout.Table();
                contentTable.left();

                // Строка 1: Урон
                contentTable.row();
                contentTable.add("[orange]" + TESLA_damage + "[] урон").left();

                // Строка 2: Макс. цели (Берем из динамического бандла)
                contentTable.row();
                contentTable.add(Core.bundle.format("stat.custommaxhits", TESLA_maxHits)).left();

                // Строка 3: Дальность прыжка
                contentTable.row();
                contentTable.add(Core.bundle.format("stat.custombounceradius", TESLA_bounceRadius)).left();

                // Строка 4: Статус-эффект
                contentTable.row();
                contentTable.add("[sky]⚡[] Шок").left();

                // Пакуем нашу готовую таблицу в рамку
                table.add(contentTable).left().padLeft(4);
            }
        }));
    	},

		init(){
			const steel = Vars.content.getByName(ContentType.item, "md-Steel");

			this.requirements = ItemStack.with(
				Items.lead, 120,
				Items.silicon, 60,
				Items.titanium, 80,
				steel, 80,
				Items.thorium, 90);
			this.consumePower(380 / 60); //Я не тупой, просто так легче понимать потребление энергии

			this.shootType = extend(BasicBulletType, {
				damage: 0,
				lifetime: 0,
				speed: 0,
				shootEffect: Fx.none,
				smokeEffect: Fx.none,
				hitEffect: Fx.none,
				despawnEffect: Fx.none,
				shootSound: Sounds.none
			});

			this.super$init()
		}
	});
	tesla.buildType = () => extend(PowerTurret.PowerTurretBuild, tesla, {

		shoot(type){
			this.super$shoot(type);

			let damage = 35;
        	let baseAngle = this.rotation;

        	Blocks.arc.shootSound.at(this.x, this.y, 0.75 + Packages.arc.math.Mathf.range(0.075), 1);

        	cLightning.customLightning(
        		this.team, //Тима молнии
        		Color.sky, //Цвет молнии
        		TESLA_damage, //Урон молнии
        		this.x, // Коорды "x" и "y" для спавна молнии
        		this.y, 
        		baseAngle, //Поворот молнии (0 это полное влево)
        		TESLA_range, // Длина первой молнии
        		4,  // Извилистость (maxWiggle)
        		TESLA_maxHits   // Максимальное количество ударов (цепочка из 5 врагов)
    		);

		}

	});

}catch(e){
	logger.blockError("Tesla", e);
}