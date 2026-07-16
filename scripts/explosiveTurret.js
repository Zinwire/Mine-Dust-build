
//Создание шаблона пули
const exploBulletType = extend(BasicBulletType, {

	damage: 1,
	speed: 1.0,
	width: 1,
	height: 1,
	lifetime: 1,

	homingPower: 1,
	homingRange: 40,

	splashDamage: 1,
	splashDamageRadius: 10,

//Будет обновляться позже
	hitEffect: Fx.blastExplosion,
	despawnEffect: Fx.blastExplosion
});


//Сама турель
const cannon = extend(ItemTurret, "Cannon", {

	description: "A big turret with a good blast bullets",
	health: 800,
	size: 3,
	range: 120,
	reload: 75,
	targetAir: false,
	targetGround: true,
	ammoPerShot: 3,
	maxAmmo: 10,
	inaccuracy: 12,

	//shootSound = [sound]
	//shootEffect = [Fx.effect]
	//smokeEffect = [Fx.effect]
	//recoil = [int]
	//recoilTime = [int]
	//rotateSpeed = [int]
	
});