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

// Сама функция молнии
function customTeslaLightning(team, color, damage, startX, startY, baseAngle, firstHitRangeBlocks, maxWiggle, maxHits) {
    let currentX = startX;
    let currentY = startY;
    let currentAngle = baseAngle;
    
    let hitTargets = new Set();
    let firstHitRangePixels = firstHitRangeBlocks * 8;
    
    // Радиус прыжка между юнитами (10 блоков) и радиус зацепа от линии первого луча (3 блока)
    let bounceRadius = java.lang.Float.valueOf(80.0); 
    let lineGrabRadius = java.lang.Float.valueOf(24.0); 

    for (let hit = 0; hit < maxHits; hit++) {
        let targetX = currentX;
        let targetY = currentY;
        let targetUnit = null;
        let hitWall = false;
        let wallTile = null;

        if (hit == 0) {
            // --- ПЕРВЫЙ ВЫСТРЕЛ: Строго по линии направления турели ---
            let maxEndX = currentX + Packages.arc.math.Angles.trnsx(currentAngle, firstHitRangePixels);
            let maxEndY = currentY + Packages.arc.math.Angles.trnsy(currentAngle, firstHitRangePixels);
            
            targetX = maxEndX;
            targetY = maxEndY;

            // 1. Проверяем, нет ли стены на пути прямой линии ствола
            Vars.world.raycast(
                Packages.mindustry.core.World.toTile(currentX), 
                Packages.mindustry.core.World.toTile(currentY), 
                Packages.mindustry.core.World.toTile(maxEndX), 
                Packages.mindustry.core.World.toTile(maxEndY), 
                (tx, ty) => {
                    let tile = Vars.world.tile(tx, ty);
                    if (tile != null && tile.solid() && tile.build != null) {

                        let tileTeam = tile.team();

                        if(tileTeam != team){
                            hitWall = true;
                            wallTile = tile;
                            targetX = tx * Vars.tilesize + 4;
                            targetY = ty * Vars.tilesize + 4;
                            return true; // Нашли стену, прерываем линию
                        }
                    }
                    return false;
                }
            );

            // 2. Ищем юнита, который стоит ближе всего к ТРАЕКТОРИИ нашего луча
            // Ищем в радиусе lineGrabRadius вокруг конечной или промежуточных точек
            let checkDist = hitWall ? Packages.arc.math.Mathf.dst(currentX, currentY, targetX, targetY) : firstHitRangePixels;
            
            // Сканируем шагами по 16 пикселей вдоль луча, ищем врага рядом с линией
            for (let d = 8; d <= checkDist; d += 16) {
                let cx = currentX + Packages.arc.math.Angles.trnsx(currentAngle, d);
                let cy = currentY + Packages.arc.math.Angles.trnsy(currentAngle, d);
                
                let u = Units.closestEnemy(team, java.lang.Float.valueOf(cx), java.lang.Float.valueOf(cy), lineGrabRadius, boolf(e => !e.dead));
                if (u != null) {
                    // Если нашли врага рядом с лучом ДО того, как луч врезался в стену — цепляем его!
                    targetUnit = u;
                    targetX = u.getX();
                    targetY = u.getY();
                    hitWall = false; // Отменяем попадание в стену, так как молния срикошетила в юнита
                    break;
                }
            }

        } else {
            // --- ПОСЛЕДУЮЩИЕ ПРЫЖКИ: Обычный поиск в радиусе от прошлого врага ---
            targetUnit = Units.closestEnemy(team, java.lang.Float.valueOf(currentX), java.lang.Float.valueOf(currentY), bounceRadius, boolf(u => {
                return !u.dead && !hitTargets.has(u.id);
            }));

            if (targetUnit != null) {
                targetX = targetUnit.getX();
                targetY = targetUnit.getY();

                // Проверяем стены между прыжками юнитов
                Vars.world.raycast(
                    Packages.mindustry.core.World.toTile(currentX), 
                    Packages.mindustry.core.World.toTile(currentY), 
                    Packages.mindustry.core.World.toTile(targetX), 
                    Packages.mindustry.core.World.toTile(targetY), 
                    (tx, ty) => {
                        let tile = Vars.world.tile(tx, ty);
                        if (tile != null && tile.solid() && tile.build != null) {

                            let tileTeam = tile.team();

                            if(tileTeam != team){

                                hitWall = true;
                                wallTile = tile;
                                targetX = tx * Vars.tilesize + 4;
                                targetY = ty * Vars.tilesize + 4;
                                return true;
                            }
                        }
                        return false;
                    }
                );
            } else {
                break; // Нет целей для прыжка — цепь обрывается
            }
        }

        // --- ОБРАБОТКА РЕЗУЛЬТАТА ШАГА ---
        
        // Рисуем линию молнии до вычисленной точки (стены, юнита или конца луча)
        drawLightningLine(color, currentX, currentY, targetX, targetY, maxWiggle);

        if (hitWall && wallTile != null) {
            // Наносим гарантированный урон блоку напрямую через его build-объект
            if (wallTile.build != null) {
                wallTile.build.damage(team, damage);
            }
            Fx.none.at(targetX, targetY, color);
            break; // Заземление! Цепочка полностью прерывается

        } else if (targetUnit != null) {
            // Наносим урон юниту
            let angleToTarget = Packages.arc.math.Angles.angle(currentX, currentY, targetX, targetY);
            Bullets.damageLightning.create(null, team, targetX, targetY, angleToTarget, damage, 1, 1, null);
            
            hitTargets.add(targetUnit.id);

            // Обновляем координаты для следующего прыжка цепочки
            currentX = targetX;
            currentY = targetY;
        } else {
            // Если это был первый шаг и мы никого/ничего не задели — молния просто улетела в воздух и погасла
            break; 
        }
    }
}

module.exports = {
    customLightning: customTeslaLightning
};
