//ПРИЗНАЮ, КОД НАПИСАН ИИ, ПО ЭТОМУ Я НЕ ПОЛНОСТЬЮ ЕГО ПОНИМАЮ

function customTeslaLightning(team, color, damage, startX, startY, baseAngle, length, maxWiggle) {
    let x = startX;
    let y = startY;
    let currentAngle = baseAngle;
    let stepLength = 8; // Шаг молнии равен ровно 1 блоку (8 единиц)
    
    // Создаем массив точек для визуальной отрисовки эффекта Fx.lightning
    let lines = new Packages.arc.struct.Seq();
    lines.add(new Packages.arc.math.geom.Vec2(x, y));

    const Angles = Packages.arc.math.Angles;
    const Mathf = Packages.arc.math.Mathf;
    const World = Packages.mindustry.core.World;

    for (let i = 0; i < length; i++) {
        // 1. РАДАР С ЯВНЫМ ПРИВЕДЕНИЕМ ТИПОВ ДЛЯ ЮНИТОВ
        let jX = java.lang.Float.valueOf(x);
        let jY = java.lang.Float.valueOf(y);
        let jRadius = java.lang.Float.valueOf(20.0); // Радиус захвата целей (2.5 блока)

        let targetUnit = Units.closestEnemy(team, jX, jY, jRadius, boolf(u => !u.dead));

        if (targetUnit != null) {
            currentAngle = Angles.angle(x, y, targetUnit.getX(), targetUnit.getY());
        } else {
            currentAngle += Mathf.range(maxWiggle);
        }

        // Вычисляем координаты следующей точки шага
        x += Angles.trnsx(currentAngle, stepLength);
        y += Angles.trnsy(currentAngle, stepLength);

        // 2. ПРОВЕРКА НА СТЕНЫ ЧЕРЕЗ ПРЯМОЕ ПОКЛЕТОЧНОЕ СКАНИРОВАНИЕ МИРА
        let tileX = World.toTile(x);
        let tileY = World.toTile(y);
        let tile = Vars.world.tile(tileX, tileY);
        let hitWall = false;

        if (tile != null && tile.solid() && tile.team() != team) {
            hitWall = true;
            x = tileX * Vars.tilesize + 4; 
            y = tileY * Vars.tilesize + 4;
        }

        lines.add(new Packages.arc.math.geom.Vec2(x, y));

        // Спавним встроенную невидимую пулю урона
        Bullets.damageLightning.create(null, team, x, y, currentAngle, damage, 1, 1, null);

        // Если обнаружили стену — прерываем цикл, молния заземлилась
        if (hitWall) {
            // ИСПРАВЛЕНО: Заменили несуществующий Fx.lightningHit на ванильный Fx.hitLase
            Fx.none.at(x, y, color); 
            break;
        }
    }

    // ТЕПЕРЬ ОНО ГАРАНТИРОВАННО ВЫПОЛНИТСЯ: Отрисовываем красивую текстуру молнии по всей цепочке созданных точек
    Fx.lightning.at(x, y, currentAngle, color, lines);
}
//а не, понимаю
module.exports = {
    customLightning: customTeslaLightning
}