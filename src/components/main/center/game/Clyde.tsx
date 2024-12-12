import Ghost from './Ghost';
import GraphicObject from './GraphicObject';

/**
 * Represents the Clyde ghost character in the game.
 * Clyde is a subclass of the Ghost class.
 */
export default class Clyde extends Ghost {
    /**
     * Creates an instance of Clyde.
     * @param position - The initial position of Clyde.
     * @param size - The size of Clyde.
     * @param animation - The animation frames for Clyde.
     * @param speed - The speed of Clyde.
     */
    constructor(position: { x: number, y: number }, size: { width: number, height: number }, animation: CanvasImageSource[], speed: number) {
        super(position, size, animation, speed);
    }

    /**
     * Determines the direction Clyde should move in to chase the target.
     * @param target - The target object Clyde is chasing.
     * @param walls - An array of wall objects that Clyde needs to avoid.
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
        if (min < 150) {
            const validDirections = direction.filter(d => d !== Infinity);
            const randomDirection = validDirections[Math.floor(Math.random() * validDirections.length)];
            min = randomDirection;
        }

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