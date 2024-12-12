import { useEffect, useRef } from 'react';
import GraphicObjectDrawer from './GraphicObjectDrawer';
import GraphicObject from './GraphicObject';
import EntityAnimator from './EntityAnimator';
import PacMan from './PacMan';

import map from '../../../../data/map.json';
import wallImageSource from '../../../../data/wallImageSources.json';
import spawnImageSource from '../../../../data/spawnImageSources.json';
import pelletImageSource from '../../../../data/pelletImageSources.json';

import PacManImageSource from '../../../../data/pacmanImageSource.json';
import ClydeImageSource from '../../../../data/clydeImageSource.json';
import InkyImageSource from '../../../../data/inkyImageSources.json';
import PinkyImageSource from '../../../../data/pinkyImageSources.json';
import BlinkyImageSource from '../../../../data/blinkyImageSources.json';
import Clyde from './Clyde';
import Inky from './Inky';
import Blinky from './Blinky';
import Pinky from './Pinky';
import Pellet from './Pellet';
import PelletDrawer from './PelletDrawer';

const ghostImageSources = [ClydeImageSource, InkyImageSource, PinkyImageSource, BlinkyImageSource];

/**
 * Initializes the game canvas and various game entities such as walls, barriers, pellets, Pac-Man, ghosts, and spawn points.
 *
 * @param wallsRef - A reference to store the array of wall graphic objects.
 * @param barrierRef - A reference to store the array of barrier graphic objects.
 * @param pelletsRef - A reference to store the array of pellet objects.
 * @param pacmanRef - A reference to store the Pac-Man entity.
 * @param ghostsRef - A reference to store the array of ghost entities (Clyde, Blinky, Inky, Pinky).
 * @param scattersRef - A reference to store the array of scatter points for the ghosts.
 * @param spawnRef - A reference to store the spawn point for Pac-Man.
 * @param spawnTilesRef - A reference to store the array of spawn tiles for the ghosts.
 *
 * @remarks
 * This function uses the `useEffect` hook to ensure that the initialization code runs only once when the component mounts.
 * It sets up the canvas dimensions, draws the game objects on the canvas, and initializes the game entities with their respective properties.
 */
export default function Initialize(wallsRef, pelletsRef, pacmanRef, ghostsRef, scattersRef, spawnRef, spawnTilesRef) {
    useEffect(() => {
        const mapCanvas = document.getElementById('gameArea') as HTMLCanvasElement;
        const c = mapCanvas.getContext('2d');

        mapCanvas.width = 840;
        mapCanvas.height = 930;

        const walls: GraphicObject[] = [];
        GraphicObjectDrawer(c, wallImageSource, map, 30, walls);
        wallsRef.current = walls;

        const spawnTiles: GraphicObject[] = [];
        GraphicObjectDrawer(c, spawnImageSource, map, 30, spawnTiles);
        spawnTilesRef.current = spawnTiles;

        const pellets: Pellet[] = [];
        PelletDrawer(c, pelletImageSource, map, 30, pellets);
        pelletsRef.current = pellets;

        const pacmanFrames = [new Image(), new Image(), new Image(), new Image()];
        EntityAnimator(PacManImageSource, pacmanFrames);

        const pacman = new PacMan({ x: 408, y: 690 }, { width: 30, height: 30 }, pacmanFrames, 3);
        pacmanRef.current = pacman;

        const clydeFrames = [new Image(), new Image(), new Image()];
        EntityAnimator(ClydeImageSource, clydeFrames);
        const clyde = new Clyde({ x: 420, y: 330 }, { width: 30, height: 30 }, clydeFrames, 2.5);
        const blinkyFrames = [new Image(), new Image(), new Image()];
        EntityAnimator(BlinkyImageSource, blinkyFrames);
        const blinky = new Blinky({ x: 420, y: 420 }, { width: 30, height: 30 }, blinkyFrames, 2.5);
        const inkyFrames = [new Image(), new Image(), new Image()];
        EntityAnimator(InkyImageSource, inkyFrames);
        const inky = new Inky({ x: 390, y: 420 }, { width: 30, height: 30 }, inkyFrames, 1.5);
        const pinkyFrames = [new Image(), new Image(), new Image()];
        EntityAnimator(PinkyImageSource, pinkyFrames);
        const pinky = new Pinky({ x: 390, y: 330 }, { width: 30, height: 30 }, pinkyFrames, 1.5);
        ghostsRef.current = [clyde, blinky, inky, pinky];

        const clydeSpawn = new GraphicObject({ x: 0, y: 0 }, { width: 0, height: 0 }, new Image());
        const BlinkySpawn = new GraphicObject({ x: 840, y: 930 }, { width: 0, height: 0 }, new Image());
        const InkySpawn = new GraphicObject({ x: 840, y: 0 }, { width: 0, height: 0 }, new Image());
        const PinkySpawn = new GraphicObject({ x: 0, y: 930 }, { width: 0, height: 0 }, new Image());
        scattersRef.current = [clydeSpawn, BlinkySpawn, InkySpawn, PinkySpawn];

        const spawn = new GraphicObject({ x: 408, y: 420 }, { width: 30, height: 30 }, new Image());
        spawnRef.current = spawn;
    }, []);
}