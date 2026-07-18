

const exploBulletType = extend(BasicBulletType, {

	damage: 45,
	speed: 4,
	width: 5,
	height: 5,
	lifetime: 32,

	homingPower: 0.15,
	homingRange: 40,

	splashDamage: 45 * 0.4,
	splashDamageRadius: 10,

	hitEffect: Fx.blastExplosion,
	despawnEffect: Fx.blastExplosion
});


//Сама турель
const cannon = extend(ItemTurret, "Cannon", {

	description: "A big turret with a good blast bullets [W.I.P.]",
	health: 800,
	size: 3,
	range: 120,
	reload: 75,
	targetAir: false,
	targetGround: true,
	ammoPerShot: 3,
	maxAmmo: 10,
	inaccuracy: 12,
	hasLiquids: true,
	category: Category.turret,

	//shootSound = [sound]
	//shootEffect = [Fx.effect]
	//smokeEffect = [Fx.effect]
	recoil: 2,
	recoilTime: 37,
	//rotateSpeed = [float]

	init(){


		const radiationY = Vars.content.getByName(ContentType.status, "md-radiation-y");
		const uranium = Vars.content.getByName(ContentType.item, "md-uranium");
		const diamond = Vars.content.getByName(ContentType.item, "md-diamond");


		const coalBullet = extend(BasicBulletType, {
			damage: 45,
			speed: 4,
			width: 5,
			height: 5,
			lifetime: 32,

			homingPower: 0.15,
			homingRange: 40,

			splashDamage: 45 * 0.4,
			splashDamageRadius: 10,

			hitEffect: Fx.blastExplosion,
			despawnEffect: Fx.blastExplosion,

			status: StatusEffects.burning,
			statusDuration: 5 * 60
			//Надо будет добавить цвета пули
		});
		
		this.ammo(Items.coal, coalBullet);


		const bbDamage = exploBulletType.damage - 25;
		const blastBullet = extend(BasicBulletType, {
			damage: bbDamage,
			speed: 4,
			width: 5,
			height: 5,
			lifetime: 32,

			homingPower: 0.15,
			homingRange: 40,

			splashDamage: bbDamage * 1.25,
			splashDamageRadius: exploBulletType.splashDamageRadius + 4,

			hitEffect: Fx.blastExplosion,
			despawnEffect: Fx.blastExplosion,

			status: StatusEffects.blasted,
			statusDuration: 5 * 60
			//Надо будет добавить цвета пули
		});
		this.ammo(Items.blastCompound, blastBullet);




		const tbDamage = exploBulletType.damage + 40;
		const thoriumBullet = extend(BasicBulletType, {
			damage: tbDamage,
			speed: 4,
			width: 5,
			height: 5,
			lifetime: 32,

			homingPower: 0.15,
			homingRange: 40,

			splashDamage: tbDamage * 0.2,
			splashDamageRadius: exploBulletType.splashDamageRadius - 2,

			hitEffect: Fx.blastExplosion,
			despawnEffect: Fx.blastExplosion,

			status: radiationY,
			statusDuration: 30 * 60
			//Надо будет добавить цвета пули
		});
		this.ammo(Items.thorium, thoriumBullet);


		

		if(uranium != null){
			const ubDamage = exploBulletType.damage + 20;
			const uraniumBullet = extend(BasicBulletType, {
			damage: ubDamage,
			speed: 4,
			width: 5,
			height: 5,
			lifetime: 32,

			homingPower: 0.15,
			homingRange: 40,

			splashDamage: ubDamage * 0.4,
			splashDamageRadius: exploBulletType.splashDamageRadius - 1,

			hitEffect: Fx.blastExplosion,
			despawnEffect: Fx.blastExplosion,

			status: radiationY,
			statusDuration: 5 * 60 * 60
			//Надо будет добавить цвета пули
		});
			this.ammo(uranium, uraniumBullet);
		}
		


		this.shoot.shots = 3;
		this.shoot.shotDelay = 5;

		this.requirements = ItemStack.with(
			Items.copper, 150,
			Items.silicon, 70,
			Items.graphite, 70,
			Items.titanium, 80,
			diamond, 50
		);



		this.super$init();
	}

	
});

cannon.consume(new ConsumeCoolant(0.3)).update = false;