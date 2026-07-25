let logger = require("libs/logger");

//Собрал все турели в один файл для удобства
Log.info("[green][md][] [blue]Файл turrets.js запущен[]");

//md-cannon / Пушка
try{

	const cannon = extend(ItemTurret,"cannon", {
		description: "A big turret with homing explode bullets [W.I.P.]",
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

        	//Угольные пт
        	const coalBullet = extend(BasicBulletType, {
        		damage: sbullet.damage,
        		speed: sbullet.speed,
        		width: sbullet.width,
        		height: sbullet.height,
        		homingPower: sbullet.homingPower, homingRange: sbullet.homingRange,
        		splashDamage: sbullet.splashDamage, splashDamageRadius: sbullet.splashDamageRadius,
        		hitEffect: Fx.blastExplosion, despawnEffect: Fx.blastExplosion,
        		status: StatusEffects.burning, statusDuration: 5 * 60
        		/*ДОБАВИТЬ ЭФФЕКТЫ И ЦВЕТА ПУЛЯМ В БУДУЩЕМ*/
        	});
			coalBullet.lifetime = cannon.range / coalBullet.speed;

			//Взрывчатые пт
			const blastBullet = extend(BasicBulletType, {
				damage: sbullet.damage - 25,
        		speed: sbullet.speed,
        		width: sbullet.width,
        		height: sbullet.height,
        		homingPower: sbullet.homingPower, homingRange: sbullet.homingRange,
        		splashDamageRadius: sbullet.splashDamageRadius + 6,
        		hitEffect: Fx.blastExplosion, despawnEffect: Fx.blastExplosion,
        		status: StatusEffects.blasted, statusDuration: 5 * 60
        		/*ДОБАВИТЬ ЭФФЕКТЫ И ЦВЕТА ПУЛЯМ В БУДУЩЕМ*/
			});
			blastBullet.lifetime = cannon.range / blastBullet.speed;
			blastBullet.splashDamage = blastBullet.damage * 2.25;

			//Ториевые пт
			const thoriumBullet = extend(BasicBulletType, {
				damage: sbullet.damage + 40,
        		speed: sbullet.speed,
        		width: sbullet.width - 1,
        		height: sbullet.height - 1,
        		homingPower: sbullet.homingPower, homingRange: sbullet.homingRange,
        		splashDamageRadius: sbullet.splashDamageRadius - 5,
        		hitEffect: Fx.blastExplosion, despawnEffect: Fx.blastExplosion,
        		status: radiationY, statusDuration: 30 * 60
        		/*ДОБАВИТЬ ЭФФЕКТЫ И ЦВЕТА ПУЛЯМ В БУДУЩЕМ*/
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
        		splashDamageRadius: sbullet.splashDamageRadius,
        		hitEffect: Fx.blastExplosion, despawnEffect: Fx.blastExplosion,
        		status: radiationY, statusDuration: 5 * 60 * 60
        		/*ДОБАВИТЬ ЭФФЕКТЫ И ЦВЕТА ПУЛЯМ В БУДУЩЕМ*/
			});
			uraniumBullet.lifetime = cannon.range / uraniumBullet.speed;
			uraniumBullet.splashDamage = uraniumBullet.damage * 0.5;

			this.ammo(
				Items.coal, coalBullet,
				Items.blastCompound, blastBullet,
				Items.thorium, thoriumBullet,
				uranium, uraniumBullet);

			this.shoot.shots = 3;
			this.shoot.shotDelay = 5;

			cannon.consume(new Packages.mindustry.world.consumers.ConsumeCoolant(0.3, true, false)).update = false;			

			this.super$init();
		}
	});

} catch(err){
	logger.blockError("Cannon", err);
}