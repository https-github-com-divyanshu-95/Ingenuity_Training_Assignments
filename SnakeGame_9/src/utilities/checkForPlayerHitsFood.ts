export class PlayerHitsFood {
    public static collision(r1:any, r2:any) {
        let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
        hit = false;
        //Find the center 
        r1.centerX = r1.x + r1.width / 2;
        r1.centerY = r1.y + r1.height / 2;
        r2.centerX = r2.x + r2.width / 2;
        r2.centerY = r2.y + r2.height / 2;
        //Find the half-widths 
        r1.halfWidth = r1.width / 2;
        r1.halfHeight = r1.height / 2;
        r2.halfWidth = r2.width / 2;
        r2.halfHeight = r2.height / 2;
        //Calculate the distance 
        vx = r1.centerX - r2.centerX;
        vy = r1.centerY - r2.centerY;
        
        combinedHalfWidths = r1.halfWidth + r2.halfWidth;
        combinedHalfHeights = r1.halfHeight + r2.halfHeight;
        //x
        if (Math.abs(vx) < combinedHalfWidths) {
            //collide
            if (Math.abs(vy) < combinedHalfHeights) {
                //when collide is done
                hit = true;
            } else {
                //y axis
                hit = false;
            }
        } else {
            //x axis 
            hit = false;
        }
        return hit;//when hit to wall
    };
}