/**
 * Represents a graphical object that can be drawn on a canvas.
 */
export default class GraphicObject {
    /**
     * The position of the graphical object on the canvas.
     */
    position: { x: number, y: number };

    /**
     * The size of the graphical object.
     */
    size: { width: number, height: number };

    /**
     * The image to be drawn for the graphical object.
     */
    image: CanvasImageSource;

    /**
     * Creates an instance of GraphicObject.
     * @param position - The position of the graphical object on the canvas.
     * @param size - The size of the graphical object.
     * @param Image - The image to be drawn for the graphical object.
     */
    constructor(position: { x: number, y: number }, size: { width: number, height: number }, Image: CanvasImageSource) {
        this.position = position;
        this.size = size;
        this.image = Image;
    }

    /**
     * Draws the graphical object on the provided canvas rendering context.
     * @param c - The canvas rendering context on which to draw the graphical object.
     */
    draw(c: CanvasRenderingContext2D) {
        c.imageSmoothingEnabled = false;
        c.drawImage(this.image, this.position.x, this.position.y, this.size.width, this.size.height);
    }

    /**
     * Determines if this graphical object collides with another graphical object.
     * @param other - The other graphical object to check for collision.
     * @returns True if the objects collide, otherwise false.
     */
    collides(other: GraphicObject) {
        return this.position.x < other.position.x + other.size.width &&
            this.position.x + this.size.width > other.position.x &&
            this.position.y < other.position.y + other.size.height &&
            this.position.y + this.size.height > other.position.y;
    }
}