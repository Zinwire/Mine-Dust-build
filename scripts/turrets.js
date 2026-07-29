const logger = require("libs/logger");
const cLightning = require("libs/customLightning");

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
	
	const tesla = extend(PowerTurret, "tesla", {

		//json параметры
		size: 2,
		health: 10,
		range: 8 * 20,
		reload: 20,
		targetAir: true,
		category: Category.turret,

		init(){
			this.requirements = ItemStack.with(Items.copper, 1); //Доработать позже

			this.shootType = extend(BasicBulletType, {
				damage: 0,
				lifetime: 0,
				speed: 0,
				shootEffect: Fx.none,
				smokeEffect: Fx.none,
				hitEffect: Fx.none,
				despawnEffect: Fx.none
			});
		}
	});
	tesla.buildType = () => extend(PowerTurret.PowerTurretBuild, tesla, {

		shoot(type){
			this.super$shoot(type);

			let damage = 20;

			if (this.isControlled()) {
    			let shootX = this.targetPos.x;
    			let shootY = this.targetPos.y;
			} else if (this.target != null){
				let shootX = this.target.getX();
				let shootY = this.target.getY();
			} else{
				let shootX = this.x + Angles.trnsx(this.rotation, this.range());
    			let shootY = this.y + Angles.trnsy(this.rotation, this.range());
			}

			let comingRange = Math.sqrt(Math.pow(shootX - this.x, 2) + Math.pow(shootY - this.y, 2));

			cLightning(this.team, Color.sky, damage, this.x, this.y, this.rotation, comingRange + 1, 4);

			//Добавить звук выстрела

			let currentTarget = this.target;
			let chainInt = 4;
			let chainRad = 2.5 * 8;

			for(let j = 1; j < chainInt; j++){
				let delay = j * 4;

				Time.run(delay, run(() => {

					if (this.dead || currentTarget == null || currentTarget.dead) return;

					let fromX = currentTarget.getX();
					let fromY = currentTarget.getY();


					// Фиксируем типы Java-float для стабильности радара
					let jX = java.lang.Float.valueOf(fromX);
					let jY = java.lang.Float.valueOf(fromY);
					let jRadius = java.lang.Float.valueOf(chainRad);

					let nextTarget = Units.closestEnemy(this.team, jX, jY, jRadius, boolf(u => !u.dead && u != currentTarget));

					
					if (nextTarget != null) {
						damage = damage * 0.8; // Затухание тока на 20%
						
						// Вычисляем угол от старого врага к новому
						let jumpAngle = Packages.arc.math.Angles.angle(fromX, fromY, nextTarget.getX(), nextTarget.getY());

						// ПУСКАЕМ СЛЕДУЮЩУЮ МОЛНИЮ ИЗ ТЕЛА СТАРОГО ВРАГА В НОВОГО
						// Ставим длину 6 блоков, так как враги обычно стоят кучно
						customTeslaLightning(this.team, Color.sky, currentDamage, fromX, fromY, jumpAngle, chainRad, 4);

						// Переключаем указатель: теперь этот новый враг станет источником для следующего прыжка!
						currentTarget = nextTarget;
					}
				}));
			}

		}

	});

}catch(e){
	logger.blockError("Tesla", e);
}