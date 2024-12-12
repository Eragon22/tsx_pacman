import Pellet from './Pellet';
import loadImages from '../../../../utils/ImageLoader';

/**
 * Draws pellets on a canvas based on the provided tile map and image sources.
 *
 * @param c - The canvas rendering context where the pellets will be drawn.
 * @param imageSources - An object containing the image sources for the pellets, where the key is the tile identifier and the value is the image URL.
 * @param tiles - A 2D array representing the tile map, where each element is a string corresponding to a tile identifier.
 * @param tileSize - The size of each tile in pixels.
 * @param storage - An optional array to store the created Pellet objects.
 *
 * @returns A promise that resolves when all images are loaded and the pellets are drawn.
 */
export default function PelletDrawer(c: CanvasRenderingContext2D, imageSources: { [key: string]: string }, tiles: string[][], tileSize: number, storage?: Pellet[]) {
    const imagesPromise = loadImages(imageSources);

    imagesPromise.then(images => {
        tiles.forEach((row, y) => {
            row.forEach((tile, x) => {
                const image = images[tile];
                if (image) {
                    const object = new Pellet({ x: x * tileSize, y: y * tileSize }, { width: tileSize, height: tileSize }, image, false);
                    if (tile.toString() === 'b') {
                        object.isBig = true;
                    }
                    object.draw(c);
                    if (storage) storage.push(object);
                }
            });
        });
    });
}