export class CheckForWall {
    public static collision(x: number, y: number, width: number, height: number) {
        if (x <= 0 || x >= width-30 || y <= 0 || y >= height-40) {
            return true;
        }
        return false
    }
}