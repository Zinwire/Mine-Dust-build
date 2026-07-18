Log.info("Турель считывается");

// 1. Создаем сам блок турели
const cannon = extend(ItemTurret, "cannon", {
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
    recoil: 2,
    recoilTime: 37,

    init() {
        const radiationY = Vars.content.getByName(ContentType.status, "md-radiation-y");
        const uranium = Vars.content.getByName(ContentType.item, "md-uranium");

        // ---- КОД ДЛЯ УГЛЯ ----
        const coalBullet = extend(BasicBulletType, {
            damage: 45, speed: 4, width: 5, height: 5, lifetime: 32,
            homingPower: 0.15, homingRange: 40,
            splashDamage: 45 * 0.4, splashDamageRadius: 10,
            hitEffect: Fx.blastExplosion, despawnEffect: Fx.blastExplosion,
            status: StatusEffects.burning, statusDuration: 5 * 60
        });
        this.ammo(Items.coal, coalBullet);

        // ---- КОД ДЛЯ ВЗРЫВЧАТОЙ СМЕСИ ----
        const bbDamage = 45 - 25;
        const blastBullet = extend(BasicBulletType, {
            damage: bbDamage, speed: 4, width: 5, height: 5, lifetime: 32,
            homingPower: 0.15, homingRange: 40,
            splashDamage: bbDamage * 1.25, splashDamageRadius: 10 + 4,
            hitEffect: Fx.blastExplosion, despawnEffect: Fx.blastExplosion,
            status: StatusEffects.blasted, statusDuration: 5 * 60
        });
        this.ammo(Items.blastCompound, blastBullet);

        // ---- КОД ДЛЯ ТОРИЯ ----
        const tbDamage = 45 + 40;
        const thoriumBullet = extend(BasicBulletType, {
            damage: tbDamage, speed: 4, width: 5, height: 5, lifetime: 32,
            homingPower: 0.15, homingRange: 40,
            splashDamage: tbDamage * 0.2, splashDamageRadius: 10 - 2,
            hitEffect: Fx.blastExplosion, despawnEffect: Fx.blastExplosion
        });
        if (radiationY != null) {
            thoriumBullet.status = radiationY;
            thoriumBullet.statusDuration = 30 * 60;
        }
        this.ammo(Items.thorium, thoriumBullet);
        
        // ---- КОД ДЛЯ УРАНА ----
        if (uranium != null) {
            const ubDamage = 45 + 20;
            const uraniumBullet = extend(BasicBulletType, {
                damage: ubDamage, speed: 4, width: 5, height: 5, lifetime: 32,
                homingPower: 0.15, homingRange: 40,
                splashDamage: ubDamage * 0.4, splashDamageRadius: 9,
                hitEffect: Fx.blastExplosion, despawnEffect: Fx.blastExplosion
            });
            if (radiationY != null) {
                uraniumBullet.status = radiationY;
                uraniumBullet.statusDuration = 5 * 60 * 60;
            }
            this.ammo(uranium, uraniumBullet);
        }

        // Настройка очереди выстрелов
        this.shoot.shots = 3;
        this.shoot.shotDelay = 5;

        this.super$init();
    }
});

// 2. ИСПРАВЛЕНИЕ ИСЧЕЗНОВЕНИЯ: Принудительно привязываем к турели класс её физического здания на карте.
// Теперь игра четко поймет, как ставить её в игровом мире, и она БОЛЬШЕ НЕ БУДЕТ ИСЧЕЗАТЬ при постройке!
cannon.buildType = () => extend(ItemTurret.ItemTurretBuild, cannon, {});

// 3. Настройка охлаждения
cannon.consume(new Packages.mindustry.world.consumers.ConsumeCoolant(0.3 / 60, true, false)).update = false;

// 4. ИСПРАВЛЕНИЕ ОТОБРАЖЕНИЯ: Заставляем UI-движок игры зарегистрировать турель во всех списках 
// строго в момент окончания загрузки клиента игры.
Events.on(ClientLoadEvent, () => {
    const diamond = Vars.content.getByName(ContentType.item, "md-diamond");

    cannon.category = Category.turret;
    cannon.buildVisibility = BuildVisibility.shown;

    cannon.requirements = ItemStack.with(
        Items.copper, 150,
        Items.silicon, 70,
        Items.graphite, 70,
        Items.titanium, 80,
        diamond, 50
    );
});
