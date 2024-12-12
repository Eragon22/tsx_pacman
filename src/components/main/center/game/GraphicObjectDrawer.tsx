import GraphicObject from './GraphicObject';
import loadImages from '../../../../utils/ImageLoader';

/**
 * Draws graphic objects on a canvas based on a tile map and image sources.
 *
 * @param c - The canvas rendering context where the graphic objects will be drawn.
 * @param imageSources - An object containing the image sources with keys as image identifiers and values as image URLs.
 * @param tiles - A 2D array representing the tile map, where each string corresponds to an image identifier from `imageSources`.
 * @param tileSize - The size of each tile in pixels.
 * @param storage - An optional array to store the created `GraphicObject` instances.
 *
 * @returns A promise that resolves when all images are loaded and the graphic objects are drawn.
 */
export default function GraphicObjectDrawer(c: CanvasRenderingContext2D, imageSources: { [key: string]: string }, tiles: string[][], tileSize: number, storage?: GraphicObject[]) {
    const imagesPromise = loadImages(imageSources);

    imagesPromise.then(images => {
        tiles.forEach((row, y) => {
            row.forEach((tile, x) => {
                const image = images[tile];
                if (image) {
                    const object = new GraphicObject({ x: x * tileSize, y: y * tileSize }, { width: tileSize, height: tileSize }, image);
                    object.draw(c);
                    if (storage) storage.push(object);
                }
            });
        });
    });
}