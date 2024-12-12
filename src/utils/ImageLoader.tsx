export default function loadImages(sources: { [key: string]: string }) {
    const images: { [key: string]: HTMLImageElement } = {};
    const promises = Object.keys(sources).map(key => {
        return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = sources[key];
            img.onload = () => {
                images[key] = img;
                resolve();
            };
        });
    });
    return Promise.all(promises).then(() => images);
}
