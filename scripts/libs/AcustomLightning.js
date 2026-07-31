//Я ебучий вайбкодер

// Функция отрисовки визуальной линии молнии между двумя точками
function drawLightningLine(color, startX, startY, endX, endY, maxWiggle) {
    let lines = new Packages.arc.struct.Seq();
    lines.add(new Packages.arc.math.geom.Vec2(startX, startY));
    
    let dist = Packages.arc.math.Mathf.dst(startX, startY, endX, endY);
    let steps = Math.max(1, Math.floor(dist / 8)); 
    
    for (let i = 1; i < steps; i++) {
        let progress = i / steps;
        let tx = Packages.arc.math.Mathf.lerp(startX, endX, progress) + Packages.arc.math.Mathf.range(maxWiggle);
        let ty = Packages.arc.math.Mathf.lerp(startY, endY, progress) + Packages.arc.math.Mathf.range(maxWiggle);
        lines.add(new Packages.arc.math.geom.Vec2(tx, ty));
    }
    
    lines.add(new Packages.arc.math.geom.Vec2(endX, endY));
    let baseAngle = Packages.arc.math.Angles.angle(startX, startY, endX, endY);
    Fx.lightning.at(endX, endY, baseAngle, color, lines);
}

// ПЕРЕДЕЛАННАЯ ФУНКЦИЯ ЦЕПНОЙ МОЛНИИ С ЗАЗЕМЛЕНИЕМ
function customTeslaLightning(team, color, damage, startX, startY, baseAngle, firstHitRangeBlocks, maxWiggle, maxHits) {
    let currentX = startX;
    let currentY = startY;
    let currentAngle = baseAngle;
    
    let hitTargets = new Set();
    let firstHitRangePixels = firstHitRangeBlocks * 8;
    let bounceRadius = java.lang.Float.valueOf(80.0); // 10 блоков для прыжка

    for (let hit = 0; hit < maxHits; hit++) {
        let targetUnit = null;
        let currentSearchRadius = (hit == 0) ? java.lang.Float.valueOf(firstHitRangePixels) : bounceRadius;

        // 1. Ищем ближайшего юнита-врага
        targetUnit = Units.closestEnemy(team, java.lang.Float.valueOf(currentX), java.lang.Float.valueOf(currentY), currentSearchRadius, boolf(u => {
            return !u.dead && !hitTargets.has(u.id);
        }));

        let targetX = currentX + Packages.arc.math.Angles.trnsx(currentAngle, currentSearchRadius);
        let targetY = currentY + Packages.arc.math.Angles.trnsy(currentAngle, currentSearchRadius);
        let hasTargetUnit = false;

        if (targetUnit != null) {
            targetX = targetUnit.getX();
            targetY = targetUnit.getY();
            hasTargetUnit = true;
        }

        // 2. ПРОВЕРКА НА СТЕНЫ И ПОСТРОЙКИ (ЗАЗЕМЛЕНИЕ) через ванильный raycast мира
        let hitWall = false;
        let wallX = targetX;
        let wallY = targetY;

        // Попиксельно или поблочно проверяем луч от текущей точки до цели на наличие твердых блоков
        Vars.world.raycast(
            Packages.mindustry.core.World.toTile(currentX), 
            Packages.mindustry.core.World.toTile(currentY), 
            Packages.mindustry.core.World.toTile(targetX), 
            Packages.mindustry.core.World.toTile(targetY), 
            interface((tx, ty) => {
                let tile = Vars.world.tile(tx, ty);
                // Если блок твердый (solid) и принадлежит чужой команде (или это нейтральный камень/руда)
                if (tile != null && tile.solid() && tile.team() != team) {
                    hitWall = true;
                    // Центрируем точку взрыва на блоке
                    wallX = tx * Vars.tilesize + 4;
                    wallY = ty * Vars.tilesize + 4;
                    return true; // Прерываем луч, нашли ближайшую стену
                }
                return false;
            })
        );

        if (hitWall) {
            // Рисуем молнию строго до стены
            drawLightningLine(color, currentX, currentY, wallX, wallY, maxWiggle);
            
            // Наносим урон блоку стены (или постройке)
            let angleToWall = Packages.arc.math.Angles.angle(currentX, currentY, wallX, wallY);
            Bullets.damageLightning.create(null, team, wallX, wallY, angleToWall, damage, 1, 1, null);
            
            // Визуальный эффект заземления (вспышка лазера на постройке)
            Fx.hitLase.at(wallX, wallY, color);
            
            break; // ЦЕПЬ ОБРЫВАЕТСЯ: молния ушла в заземление через стену!
        }

        // 3. ЕСЛИ СТЕНЫ НЕТ — ОБЫЧНЫЙУДАР ПО ЮНИТУ ИЛИ В ВОЗДУХ
        if (hasTargetUnit) {
            drawLightningLine(color, currentX, currentY, targetX, targetY, maxWiggle);
            
            let angleToTarget = Packages.arc.math.Angles.angle(currentX, currentY, targetX, targetY);
            Bullets.damageLightning.create(null, team, targetX, targetY, angleToTarget, damage, 1, 1, null);

            hitTargets.add(targetUnit.id);

            // Переносим точку старта на текущего поджаренного врага для следующего прыжка
            currentX = targetX;
            currentY = targetY;
        } else {
            // Холостой выстрел в воздух на первом шаге, если никого нет
            if (hit == 0) {
                drawLightningLine(color, currentX, currentY, targetX, targetY, maxWiggle);
            }
            break; // Нет целей и нет стен — цепь закончена
        }
    }
}

module.exports = {
    customLightning: customTeslaLightning
};
