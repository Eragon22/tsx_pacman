import Entity from './Entity';
import loadImages from '../../../../utils/ImageLoader';

/**
 * EntityAnimator is a function that loads a set of images and assigns them to frames for animation.
 *
 * @param imageSources - An object where the keys are identifiers and the values are the URLs of the images.
 * @param frames - An array that will be populated with the loaded images in the order they are provided in imageSources.
 *
 * The function first loads all images from the provided URLs. Once all images are loaded, it assigns each image to the corresponding frame.
 * The images are loaded asynchronously, and the frames array is updated once all images are fully loaded.
 */
export default function EntityAnimator(imageSources: { [key: string]: string }, frames) {
    const imagesPromise = loadImages(imageSources);

    imagesPromise.then(images => {
        const elementImages = Object.keys(images).map(key => images[key]);
        Object.keys(images).forEach((key, index) => {
            const image = images[key];
            elementImages[index].src = image.src;
            image.onload = () => {
                elementImages[index] = image;
            };
        });

        for (var i = 0; i < frames.length; i++) {
            frames[i] = elementImages[i];
        }
    });
}