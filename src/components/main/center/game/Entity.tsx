import GraphicObject from "./GraphicObject";

/**
 * Represents an entity in the game that extends the GraphicObject class.
 * Handles the entity's speed, velocity, animation, and collision detection.
 */
export default class Entity extends GraphicObject {
    /**
     * The speed of the entity.
     */
    speed: number;

    /**
     * The velocity of the entity, represented as an object with x and y components.
     */
    velocity: { x: number, y: number };

    /**
     * The current frame of the entity's animation.
     */
    animationFrame: number;

    /**
     * The array of images used for the entity's animation.
     */
    animation: CanvasImageSource[];

    /**
    * Creates an instance of the Entity class.
    * @param position - The initial position of the entity.
    * @param size - The size of the entity.
    * @param animation - The array of images used for the entity's animation.
    * @param speed - The speed of the entity.
    */
    constructor(position: { x: number, y: number }, size: { width: number, height: number }, animation: CanvasImageSource[], speed: number) {
        super(position, size, animation[0]);
        this.speed = speed;
        this.velocity = { x: 0, y: 0 };
        this.animationFrame = 0;
        this.animation = animation;
    }

    /**
     * Draws the entity on the provided canvas rendering context.
     * @param c - The canvas rendering context on which to draw the entity.
     */
    draw(c: CanvasRenderingContext2D) {
        if (this.animationFrame % 5 === 0) { // Change frame every 5 draws
            this.image = this.animation[(this.animationFrame / 5) % this.animation.length];
        }
        this.animationFrame++;
        c.drawImage(this.image, this.position.x, this.position.y, this.size.width, this.size.height);
    }

    /**
     * Determines if the entity will collide with another graphic object given a certain velocity.
     * @param other - The other graphic object to check for collision.
     * @param velocity - The velocity to check for collision.
     * @returns A boolean indicating whether a collision will occur.
     */
    willCollide(other: GraphicObject, velocity: { x: number, y: number }) {
        var collides = false;
        if (velocity.x > 0 && velocity.y == 0)
            collides =
                this.position.x + this.size.width + velocity.x > other.position.x &&
                this.position.x < other.position.x + other.size.width &&
                this.position.y < other.position.y + other.size.height &&
                this.position.y + this.size.height > other.position.y;
        else if (velocity.x < 0 && velocity.y == 0)
            collides =
                this.position.x + velocity.x < other.position.x + other.size.width &&
                this.position.x + this.size.width > other.position.x &&
                this.position.y < other.position.y + other.size.height &&
                this.position.y + this.size.height > other.position.y;
        else if (velocity.y > 0 && velocity.x == 0)
            collides =
                this.position.y + this.size.height + velocity.y > other.position.y &&
                this.position.y < other.position.y + other.size.height &&
                this.position.x < other.position.x + other.size.width &&
                this.position.x + this.size.width > other.position.x;
        else if (velocity.y < 0 && velocity.x == 0)
            collides =
                this.position.y + velocity.y < other.position.y + other.size.height &&
                this.position.y + this.size.height > other.position.y &&
                this.position.x < other.position.x + other.size.width &&
                this.position.x + this.size.width > other.position.x;
        return collides;
    }
}