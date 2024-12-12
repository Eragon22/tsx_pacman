import Ghost from "./Ghost";
import GraphicObject from "./GraphicObject";

/**
 * Represents the Blinky ghost character in the game, extending the Ghost class.
 * Blinky chases the target based on the shortest distance while avoiding walls.
 */
export default class Blinky extends Ghost {
    /**
     * Creates an instance of Blinky.
     * @param position - The initial position of Blinky.
     * @param size - The size of Blinky.
     * @param animation - The animation frames for Blinky.
     * @param speed - The speed of Blinky.
     */
    constructor(position: { x: number, y: number }, size: { width: number, height: number }, animation: CanvasImageSource[], speed: number) {
        super(position, size, animation, speed);
    }

    /**
     * Determines the direction Blinky should move to chase the target while avoiding walls.
     * @param target - The target object Blinky is chasing.
     * @param walls - An array of wall objects that Blinky needs to avoid.
     */
    Chase(target, walls: GraphicObject[]) {
        const distX = target.position.x - this.position.x - this.velocity.x;
        const distY = target.position.y - this.position.y - this.velocity.y;

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