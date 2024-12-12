import Entity from "./Entity";
import EntityAnimator from "./EntityAnimator";
import GraphicObject from "./GraphicObject";
import ghostImageSource from '../../../../data/ghostImageSource.json';
import deadImageSource from '../../../../data/deadImageSource.json';

const EnmMode = { CHASE: 0, SCATTER: 1, FRIGHTENED: 2, DEAD: 3 };

/**
 * Represents a Ghost entity in the game.
 * Extends the Entity class.
 */
export default class Ghost extends Entity {
    /**
     * The target GraphicObject that the ghost is interacting with.
     */
    target: GraphicObject;

    /**
     * Distances to the target in four directions: up, down, left, and right.
     */
    targetDistances: { up: number, down: number, left: number, right: number };

    /**
     * Array of images for the ghost's animation.
     */
    ghostAnimation: CanvasImageSource[];

    /**
     * Array of images for the ghost's dead animation.
     */
    deadAnimation: CanvasImageSource[];

    /**
     * The current mode of the ghost.
     * 0: Chase, 1: Scatter, 2: Frightened, 3: Dead
     */
    Mode: number = EnmMode.SCATTER;

    /**
     * The time when the ghost was frightened.
     */
    FrightenTime: number = 0;

    /**
     * The temporary speed of the ghost.
     */
    tempSpeed: number = 0;

    /**
     * The time the ghost spent in scatter mode.
     */
    scatterTime: number = 0;

    /**
     * The time the ghost spent in chase mode.
     */
    chaseTime: number = 0;


    /**
     * Creates an instance of Ghost.
     * @param position - The initial position of the ghost.
     * @param size - The size of the ghost.
     * @param animation - The animation frames for the ghost.
     * @param speed - The speed of the ghost.
     */
    constructor(position: { x: number, y: number }, size: { width: number, height: number }, animation: CanvasImageSource[], speed: number) {
        super(position, size, animation, speed);
        this.ghostAnimation = [new Image(), new Image(), new Image()];
        EntityAnimator(ghostImageSource, this.ghostAnimation);
        this.deadAnimation = [new Image(), new Image(), new Image()];
        EntityAnimator(deadImageSource, this.deadAnimation);
        this.tempSpeed = speed;
    }

    /**
     * Updates the ghost's position and animation based on its current mode.
     * @param c - The canvas rendering context.
     */
    update(c: CanvasRenderingContext2D) {
        this.position.x += (this.velocity.x * this.speed);
        this.position.y += (this.velocity.y * this.speed);
        if (this.Mode == EnmMode.CHASE || this.Mode == EnmMode.SCATTER) {
            super.draw(c);

        } else if (this.Mode == EnmMode.FRIGHTENED) {
            if (this.animationFrame % 5 === 0) { // Change frame every 5 draws
                this.image = this.ghostAnimation[(this.animationFrame / 5) % this.ghostAnimation.length];
                if (Date.now() - this.FrightenTime >= 7000) {
                    this.Mode = EnmMode.CHASE;
                    this.FrightenTime = 0;
                    this.velocity = { x: -this.velocity.x, y: -this.velocity.y };
                    this.position.x = Math.floor(this.position.x / 30) * 30;
                    this.position.y = Math.floor(this.position.y / 30) * 30;
                }
                if (Date.now() - this.FrightenTime >= 5000) {
                    if (Date.now() % 500 < 250) // Blinking effect
                        this.image = this.animation[(this.animationFrame / 5) % this.ghostAnimation.length];
                }
            }
            this.animationFrame++;
            c.drawImage(this.image, this.position.x, this.position.y, this.size.width, this.size.height);

        } else if (this.Mode == EnmMode.DEAD) {
            if (this.animationFrame % 5 === 0) { // Change frame every 5 draws
                this.image = this.deadAnimation[(this.animationFrame / 5) % this.deadAnimation.length];
            }
            this.animationFrame++;
            c.drawImage(this.image, this.position.x, this.position.y, this.size.width, this.size.height);
        }
    }

    /**
     * Determines the ghost's path based on its current mode and targets.
     * @param target - The main target for the ghost.
     * @param spawntarget - The spawn target for the ghost.
     * @param scattertarget - The scatter target for the ghost.
     * @param walls - An array of walls that the ghost needs to avoid.
     */
    PathFind(target, spawntarget, scattertarget, walls: GraphicObject[], spawnTiles: GraphicObject[]) {
        if (this.Mode == EnmMode.FRIGHTENED) {
            this.speed = 1;
            this.Frighten(target, walls.concat(spawnTiles));
        } else if (this.Mode == EnmMode.DEAD) {
            this.speed = 3;
            this.Follow(spawntarget, walls);
            if (this.collides(spawntarget)) {
                if (this.chaseTime == 0) { // Reset the ghost to its original state
                    this.Mode = EnmMode.SCATTER;
                } else {
                    this.Mode = EnmMode.CHASE;
                }
                this.velocity = { x: 0, y: 0 };
                this.position.x = Math.floor(this.position.x / 30) * 30;
                this.position.y = Math.floor(this.position.y / 30) * 30;
            }
        } else if (this.Mode == EnmMode.CHASE) {
            this.speed = this.tempSpeed;
            this.Chase(target, walls.concat(spawnTiles));
            if (this.chaseTime == 0) {
                this.scatterTime = 0;
                this.chaseTime = Date.now();
            }
            if (Date.now() - this.chaseTime >= 20000) {
                this.Mode = EnmMode.SCATTER;
                this.chaseTime = 0;
            }
        } else if (this.Mode == EnmMode.SCATTER) {
            this.speed = this.tempSpeed;
            this.Follow(scattertarget, walls.concat(spawnTiles));
            if (this.scatterTime == 0) {
                this.chaseTime = 0;
                this.scatterTime = Date.now();
            }
            if (Date.now() - this.scatterTime >= 7000) {
                this.Mode = EnmMode.CHASE;
                this.scatterTime = 0;
            }
        }
    }

    /**
     * Handles the ghost's chasing behavior.
     * @param target - The target to chase.
     * @param walls - An array of walls that the ghost needs to avoid.
     */
    Chase(target, walls: GraphicObject[]) { }

    /**
     * Handles the ghost's frightened behavior.
     * @param target - The target to frighten.
     * @param walls - An array of walls that the ghost needs to avoid.
     */
    Frighten(target, walls: GraphicObject[]) {
        const distX = target.position.x - this.position.x - this.velocity.x;
        const distY = target.position.y - this.position.y - this.velocity.y;

        this.targetDistances = {
            up: Math.sqrt(distX * distX + (distY + this.size.height) * (distY + this.size.height)),
            down: Math.sqrt(distX * distX + (distY - this.size.height) * (distY - this.size.height)),
            left: Math.sqrt((distX + this.size.width) * (distX + this.size.width) + distY * distY),
            right: Math.sqrt((distX - this.size.width) * (distX - this.size.width) + distY * distY)
        };

        this.targetDistances.up = walls.some(wall => this.willCollide(wall, { x: 0, y: -1 })) ? -Infinity : this.targetDistances.up;
        this.targetDistances.down = walls.some(wall => this.willCollide(wall, { x: 0, y: 1 })) ? -Infinity : this.targetDistances.down;
        this.targetDistances.left = walls.some(wall => this.willCollide(wall, { x: -1, y: 0 })) ? -Infinity : this.targetDistances.left;
        this.targetDistances.right = walls.some(wall => this.willCollide(wall, { x: 1, y: 0 })) ? -Infinity : this.targetDistances.right;

        const previousDirection = this.velocity;
        if (previousDirection.y === 1) {
            this.targetDistances.up = -Infinity;
        } else if (previousDirection.y === -1) {
            this.targetDistances.down = -Infinity;
        } else if (previousDirection.x === 1) {
            this.targetDistances.left = -Infinity;
        } else if (previousDirection.x === -1) {
            this.targetDistances.right = -Infinity;
        }

        const direction = [this.targetDistances.up, this.targetDistances.down, this.targetDistances.left, this.targetDistances.right];
        var max = Math.max(...direction);

        if (direction[0] == max && previousDirection.y <= 1) {
            this.velocity = { x: 0, y: -1 };
        } else if (direction[1] == max && previousDirection.y >= -1) {
            this.velocity = { x: 0, y: 1 };
        } else if (direction[2] == max && previousDirection.x <= 1) {
            this.velocity = { x: -1, y: 0 };
        } else if (direction[3] == max && previousDirection.x >= -1) {
            this.velocity = { x: 1, y: 0 };
        }
    }

    /**
     * Handles the ghost's following behavior.
     * @param target - The target to follow.
     * @param walls - An array of walls that the ghost needs to avoid.
     */
    Follow(target, walls: GraphicObject[]) {
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

    /**
     * Sets the ghost's mode to frightened and reverses its velocity.
     */
    Fear() {
        this.Mode = EnmMode.FRIGHTENED;
        this.velocity = { x: -this.velocity.x, y: -this.velocity.y };
        this.FrightenTime = Date.now();
        this.position.x = Math.floor(this.position.x / 30) * 30;
        this.position.y = Math.floor(this.position.y / 30) * 30;
    }
}