import Entity from './Entity';

export default class PacMan extends Entity {
    angle: number;

    /**
     * Creates an instance of PacMan.
     * @param position - The initial position of PacMan with x and y coordinates.
     * @param size - The size of PacMan with width and height.
     * @param animation - An array of images used for PacMan's animation.
     * @param speed - The speed at which PacMan moves.
     */
    constructor(position: { x: number, y: number }, size: { width: number, height: number }, animation: CanvasImageSource[], speed: number) {
        super(position, size, animation, speed);
        this.angle = 0;
    }

    /**
     * Updates PacMan's position and renders it on the canvas.
     * @param c - The canvas rendering context used to draw PacMan.
     */
    update(c: CanvasRenderingContext2D) {
        if (this.velocity.x != 0 || this.velocity.y != 0)
            this.angle = Math.atan2(this.velocity.y, this.velocity.x);
        c.save();
        c.translate(this.position.x + this.size.width / 2, this.position.y + this.size.height / 2);
        c.rotate(this.angle);
        c.translate(-this.position.x - this.size.width / 2, -this.position.y - this.size.height / 2);
        super.draw(c);
        c.restore();
        this.position.x += this.velocity.x * this.speed;
        this.position.y += this.velocity.y * this.speed;
    }
}
