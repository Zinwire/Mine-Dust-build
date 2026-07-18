
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


		const coalBullet = extend(BasicBulletType, Object.assign({}, exploBulletType, {
            status: StatusEffects.burning,
            statusDuration: 5 * 60
        }));
        this.ammo(Items.coal, coalBullet);


		const bbDamage = exploBulletType.damage - 25;
        const blastBullet = extend(BasicBulletType, Object.assign({}, exploBulletType, {
            damage: bbDamage,
            splashDamage: bbDamage * 1.25,
            splashDamageRadius: exploBulletType.splashDamageRadius + 4,
            status: StatusEffects.blasted,
            statusDuration: 5 * 60
        }));
        this.ammo(Items.blastCompound, blastBullet);
        

		const tbDamage = exploBulletType.damage + 40;
        const thoriumBullet = extend(BasicBulletType, Object.assign({}, exploBulletType, {
            damage: tbDamage,
            splashDamage: tbDamage * 0.2,
            splashDamageRadius: exploBulletType.splashDamageRadius - 2
        }));
        if (radiationY != null) {
            thoriumBullet.status = radiationY;
            thoriumBullet.statusDuration = 30 * 60;
        }
        this.ammo(Items.thorium, thoriumBullet);
		

		if (uranium != null) {
            const ubDamage = exploBulletType.damage + 20;
            const uraniumBullet = extend(BasicBulletType, Object.assign({}, exploBulletType, {
                damage: ubDamage,
                splashDamage: ubDamage * 0.4,
                splashDamageRadius: 9
            }));
            if (radiationY != null) {
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

cannon.consume(new ConsumeCoolant(0.3)).update = false;