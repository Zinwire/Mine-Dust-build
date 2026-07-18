//Просто для теста сделал вывод в консоль игры текст
Log.info("Турель считывается");

//Создаю турель
const cannon = extend(ItemTurret, "cannon", {
	//Стандарт параметры как в JSON 
    description: "A big turret with a good blast bullets [W.I.P.]",
    health: 800,
    size: 3,
    range: 120,
    reload: 75,
    targetAir: false,
    targetGround: true,
    ammoPerShot: 3,
    maxAmmo: 30,
    inaccuracy: 12,
    hasLiquids: true,
    recoil: 2,
    recoilTime: 37,

    //метод при запуске игры в целом (То же самое, что Events.on(ClientLoadEvent, ());)
    init() {
    	//getByName(ContentType, string) ищет контент по системному названию
        const radiationY = Vars.content.getByName(ContentType.status, "md-Radiation-Y");
        const uranium = Vars.content.getByName(ContentType.item, "md-Uranium");

        //Патроны за уголь, мне лень расписывать
        const coalBullet = extend(BasicBulletType, {
            damage: 45, speed: 3.3, width: 5, height: 5, lifetime: 40,
            homingPower: 0.15, homingRange: 40,
            splashDamage: 45 * 0.4, splashDamageRadius: 10,
            hitEffect: Fx.blastExplosion, despawnEffect: Fx.blastExplosion,
            status: StatusEffects.burning, statusDuration: 5 * 60
            /* ДОБАВИТЬ ДРУГИЕ ЭФФЕКТЫ */
        });


        //Патроны за взрыв смесь
        const bbDamage = 45 - 25;
        const blastBullet = extend(BasicBulletType, {
            damage: bbDamage, speed: 3.3, width: 5, height: 5, lifetime: 40,
            homingPower: 0.15, homingRange: 40,
            splashDamage: bbDamage * 1.25, splashDamageRadius: 10 + 4,
            hitEffect: Fx.blastExplosion, despawnEffect: Fx.blastExplosion, //Эффекты всякие
            status: StatusEffects.blasted, statusDuration: 5 * 60
            /* ДОБАВИТЬ ДРУГИЕ ЭФФЕКТЫ */
        });


        //Патроны за торий
        const tbDamage = 45 + 40;
        const thoriumBullet = extend(BasicBulletType, {
            damage: tbDamage, speed: 3.3, width: 5, height: 5, lifetime: 40,
            homingPower: 0.15, homingRange: 40,
            splashDamage: tbDamage * 0.2, splashDamageRadius: 10 - 2,
            hitEffect: Fx.blastExplosion, despawnEffect: Fx.blastExplosion
            /* ДОБАВИТЬ ДРУГИЕ ЭФФЕКТЫ */
        });
        if (radiationY != null) { 				//Проверка для дебага ошибок, чтобы не было вылета
            thoriumBullet.status = radiationY;
            thoriumBullet.statusDuration = 30 * 60;
        }

        
        //Урановые патроны
        if (uranium != null) {
            const ubDamage = 45 + 20;
            const uraniumBullet = extend(BasicBulletType, {
                damage: ubDamage, speed: 3.3, width: 5, height: 5, lifetime: 40,
                homingPower: 0.15, homingRange: 40,
                splashDamage: ubDamage * 0.4, splashDamageRadius: 9,
                hitEffect: Fx.blastExplosion, despawnEffect: Fx.blastExplosion
                /* ДОБАВИТЬ ДРУГИЕ ЭФФЕКТЫ */
            });
            if (radiationY != null) { 						//Проверка для того же
                uraniumBullet.status = radiationY;
                uraniumBullet.statusDuration = 5 * 60 * 60;
            }


            //Задаю патроны по типу ("Предмет", "Объект пули")
            this.ammo   (Items.coal, coalBullet,
            			Items.blastCompound, blastBullet,
            			Items.thorium, thoriumBullet,
           				uranium, uraniumBullet);
        }

        // Настройка очереди выстрелов
        this.shoot.shots = 3; //Общее кол-во выстрелов
        this.shoot.shotDelay = 6; //Задержка между выстрелами

        this.super$init(); //Вызов стандартного метода класса
    }
});

// ИСПРАВЛЕНИЕ ИСЧЕЗНОВЕНИЯ: Принудительно привязываю к турели класс её физического здания на карте.
// Теперь игра четко поймет, как ставить её в игровом мире, и она БОЛЬШЕ НЕ БУДЕТ ИСЧЕЗАТЬ при постройке
cannon.buildType = () => extend(ItemTurret.ItemTurretBuild, cannon, {});

// Настройка охлаждения (упоротое говнище)
cannon.consume(new Packages.mindustry.world.consumers.ConsumeCoolant(0.3, true, false)).update = false;


// На всякий точно когда всё загрузилось уже назначаю категорию, требования, и принудительный показ блока
Events.on(ClientLoadEvent, () => {
    const diamond = Vars.content.getByName(ContentType.item, "md-Diamond");

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
