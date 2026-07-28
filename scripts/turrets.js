let logger = require("libs/logger");

//Собрал все турели в один файл для удобства
//Log.info("[green][md][] [blue]Файл turrets.js запущен[]");
logger.fileRead("turrets.js");

//md-cannon / Пушка
try{

	const cannon = extend(ItemTurret,"cannon", {
		health: 800,
		size: 3,
		range: 27.5 * 8,
		reload: 1.25 * 60,
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
		// md-tesla / Турель Тесла
	const tesla = extend(PowerTurret, "tesla", {
		description: "An advanced electric turret that strikes a target and unleashes a cascading chain of lightning. [W.I.P.]",
		health: 1200,
		size: 2,
		range: 160, 
		reload: 50,  
		targetAir: true,
		targetGround: true,
		hasPower: true,
		recoil: 0,   
		category: Category.turret,
		buildVisibility: BuildVisibility.shown,

		init() {
			this.requirements = ItemStack.with(
				Items.silicon, 80,
				Items.titanium, 60,
				Vars.content.getByName(ContentType.item, "md-Steel") || Items.graphite, 50
			);

			// Задаем потребление энергии (6 единиц в тик)
			this.consumePower(6.0);

			// ИСПРАВЛЕНО: Создаем пулю через LightningBulletType. 
			// Для PowerTurret это легальный тип пули, peekAmmo() не вернет null и игра НЕ крашнется!
			this.shootType = extend(LightningBulletType, {
				damage: 0,              // Наша основная пуля наносит 0 урона
				lightningLength: 1,     // Делаем визуальный луч невидимым
				lightningLengthRand: 0,
				shootEffect: Fx.lightningCharge,
				smokeEffect: Fx.none,
				hitEffect: Fx.none,
				despawnEffect: Fx.none
			});

			this.super$init();
		}
	});

	tesla.buildType = () => extend(PowerTurret.PowerTurretBuild, tesla, {
		// ИСПРАВЛЕНО: Используем правильную Java-перегрузку метода shoot для зданий на карте!
		// В Java у здания сигнатура: void shoot(BulletType type)
		shoot(type) {
			this.super$shoot(type); // Запускаем базовую вспышку на стволе

			// Поскольку это PowerTurret, таргет-система игры теперь РАБОТАЕТ и находит врагов!
			if (this.target != null) {
				let tx = this.target.getX();
				let ty = this.target.getY();
				let angle = this.angleTo(this.target);

				// ЛУЧ 1: Основная молния из турели во врага (18 сегментов)
				Lightning.create(this.team, Color.sky, 35, this.x, this.y, angle, 18);

				// ЛУЧ 2: Цепной веер молний из самого врага по его соседям (8 сегментов)
				Lightning.create(this.team, Color.sky, 25, tx, ty, angle, 8);
				
				Sounds.spark.at(this.x, this.y);
			}
		}
	});

}catch(e){
	logger.blockError("Tesla", e);
}