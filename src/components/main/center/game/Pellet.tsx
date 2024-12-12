import GraphicObject from "./GraphicObject";

/**
 * Represents a Pellet object in the game.
 * 
 * @extends GraphicObject
 */
export default class Pellet extends GraphicObject {
    /**
     * A boolean indicating if the pellet is big.
     */
    isBig: boolean;

    /**
     * Creates an instance of Pellet.
     * 
     * @param position - The position of the pellet with x and y coordinates.
     * @param size - The size of the pellet with width and height.
     * @param Image - The image source for the pellet.
     * @param isBig - A boolean indicating if the pellet is big.
     */
    constructor(position: { x: number, y: number }, size: { width: number, height: number }, Image: CanvasImageSource, isBig: boolean) {
        super(position, size, Image);
        this.isBig = isBig;
    }
}