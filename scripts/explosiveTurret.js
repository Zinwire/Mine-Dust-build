
//Создание шаблона пули
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

//Может обновляться позже
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

		const coalBullet = exploBulletType.clone();
		coalBullet.status = StatusEffects.burning;
		coalBullet.statusDuration = 5 * 60;
		//Надо будет добавить цвета пули
		this.ammo(Items.coal, coalBullet);

		const blastBullet = exploBulletType.clone();
		blastBullet.status = StatusEffects.blasted;
		blastBullet.statusDuration = 5 * 60;
		blastBullet.damage -= 25;
		blastBullet.splashDamage = blastBullet.damage * 1.25;
		blastBullet.splashDamageRadius += 4;
		//Надо будет добавить цвета пули
		this.ammo(Items.blastCompound, blastBullet);

		const thoriumBullet = exploBulletType.clone();
		thoriumBullet.damage += 40;
		thoriumBullet.splashDamage = thoriumBullet.damage * 0.2;
		thoriumBullet.splashDamageRadius -= 2;
		//Надо будет добавить цвета пули
		if(radiationY != null){
			thoriumBullet.status = radiationY;
			thoriumBullet.statusDuration = 30 * 60;
		}
		this.ammo(Items.thorium, thoriumBullet);
		
		if(uranium != null){
			const uraniumBullet = exploBulletType.clone();
			uraniumBullet.damage += 20;
			uraniumBullet.splashDamage = uraniumBullet.damage * 0.4;
			uraniumBullet.splashDamageRadius -= 1;
			//надо будет добавить цвета пули
			if(radiationY != null){
				uraniumBullet.status = radiationY;
				uraniumBullet.statusDuration = 5 * 60 * 60;
			}
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

cannon.consume(new ConsumeCoolant(0.3 / 60)).update = false;