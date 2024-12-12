import Ghost from "./Ghost";
import GraphicObject from "./GraphicObject";
/**
 * Represents the Inky ghost character in the game, extending the Ghost class.
 * Inky has a unique chasing behavior based on the target's position and the walls in the game.
 */
export default class Inky extends Ghost {
    /**
     * Creates an instance of Inky.
     * @param position - The initial position of Inky, with x and y coordinates.
     * @param size - The size of Inky, with width and height.
     * @param animation - An array of images used for Inky's animation.
     * @param speed - The speed at which Inky moves.
     */
    constructor(position: { x: number, y: number }, size: { width: number, height: number }, animation: CanvasImageSource[], speed: number) {
        super(position, size, animation, speed);
    }
    /**
     * Determines Inky's movement direction based on the target's position and the walls in the game.
     * This is the only ghost that doesn't match the original game's behavior.
     * Instead of the location of another ghost, Inky chases the player and it's own positinos midpoint.
     * @param target - The target object that Inky is chasing, which has a position property.
     * @param walls - An array of GraphicObject representing the walls in the game.
     */
    Chase(target, walls: GraphicObject[]) {
        const midpoint = {
            x: (this.position.x + target.position.x) / 2,
            y: (this.position.y + target.position.y) / 2
        };

        const distX = midpoint.x - this.position.x - this.velocity.x;
        const distY = midpoint.y - this.position.y - this.velocity.y;

        this.targetDistances = {
            up: Math.sqrt(distX * distX + (distY + this.size.height) * (distY + this.size.height)),
            down: Math.sqrt(distX * distX + (distY - this.size.height) * (distY - this.size.height)),
            left: Math.sqrt((distX + this.size.width) * (distX + this.size.width) + distY * distY),
            right: Math.sqrt((distX - this.size.width) * (distX - this.size.width) + distY * distY)
        };

        this.targetDistances.up = walls.some(wall => this.willCollide(wall, { x: 0, y: -1 })) ? Infinity : this.targetDistances.up;
        this.targetDistances.down = walls.some(wall => this.willCollide(wall, { x: 0, y: 1 })) ? Infinity : this.targetDistances.down;
        this.targetDistances.left = walls.some(wall => this.willCollide(wall, { x: -1, y: 0 })) ? Infinity : this.targetDistances.left;
        this.targetDistances.right = walls.some(wall => this.willCollide(wall, { x: 1, y: 0 })) ? Infinity : this.targetDistances.right;

        const previousDirection = this.velocity;
        if (previousDirection.y === 1) {
            this.targetDistances.up = Infinity;
        } else if (previousDirection.y === -1) {
            this.targetDistances.down = Infinity;
        } else if (previousDirection.x === 1) {
            this.targetDistances.left = Infinity;
        } else if (previousDirection.x === -1) {
            this.targetDistances.right = Infinity;
        }

        const direction = [this.targetDistances.up, this.targetDistances.down, this.targetDistances.left, this.targetDistances.right];
        var min = Math.min(...direction);

        if (direction[0] == min && previousDirection.y <= 1) {
            this.velocity = { x: 0, y: -1 };
        } else if (direction[1] == min && previousDirection.y >= -1) {
            this.velocity = { x: 0, y: 1 };
        } else if (direction[2] == min && previousDirection.x <= 1) {
            this.velocity = { x: -1, y: 0 };
        } else if (direction[3] == min && previousDirection.x >= -1) {
            this.velocity = { x: 1, y: 0 };
        }
    }
}