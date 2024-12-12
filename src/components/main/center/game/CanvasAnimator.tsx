import { useEffect } from 'react';
import Movement from './CanvasPacManMovement';
import Death from './CanvasPacManDeath';
import Ghost from './Ghost';
import GraphicObject from './GraphicObject';

/**
 * AnimateCanvas is a React functional component that handles the animation of the game canvas.
 * It uses the `useEffect` hook to start the animation loop when the component mounts.
 *
 * @param wallsRef - A reference to the walls in the game.
 * @param barrierRef - A reference to the barriers in the game.
 * @param pelletsRef - A reference to the pellets in the game.
 * @param pacmanRef - A reference to the Pacman character.
 * @param ghostsRef - A reference to the ghosts in the game.
 * @param scattersRef - A reference to the scatter points for the ghosts.
 * @param spawnRef - A reference to the spawn point for the ghosts.
 * @param directionRef - A reference to the current direction of Pacman.
 * @param livesRef - A reference to the number of lives remaining.
 * @param spawnTilesRef - A reference to the spawn tiles in the game.
 *
 * The animation loop clears the canvas, draws the game elements, updates the positions of Pacman and the ghosts,
 * and handles movement and death logic.
 */
export default function AnimateCanvas(wallsRef, pelletsRef, pacmanRef, ghostsRef, scattersRef, spawnRef, directionRef, livesRef, spawnTilesRef) {
    useEffect(() => {
        var previousDelta = 0,
            fpsLimit = Math.log2((Number(localStorage.getItem('speed')) + 1) * 2.5) * 30;

        const mapCanvas = document.getElementById('gameArea') as HTMLCanvasElement;
        const c = mapCanvas.getContext('2d');
        function animate(currentDelta) {
            requestAnimationFrame(animate);

            var delta = currentDelta - previousDelta;

            if (fpsLimit && delta < 1000 / fpsLimit) {
                return;
            }

            if (pacmanRef.current && wallsRef.current && pelletsRef.current && ghostsRef.current) {
                c.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
                wallsRef.current?.forEach(wall => wall.draw(c));
                spawnTilesRef.current?.forEach(tile => tile.draw(c));
                pelletsRef.current?.forEach(pellet => pellet.draw(c));
                pacmanRef.current.update(c);

                if (directionRef.current !== null) {
                    (ghostsRef.current[0] as Ghost).PathFind(pacmanRef.current, spawnRef.current, scattersRef.current[0], wallsRef.current, spawnTilesRef.current);
                    (ghostsRef.current[1] as Ghost).PathFind(pacmanRef.current, spawnRef.current, scattersRef.current[1], wallsRef.current, spawnTilesRef.current);
                    (ghostsRef.current[2] as Ghost).PathFind(pacmanRef.current, spawnRef.current, scattersRef.current[2], wallsRef.current, spawnTilesRef.current);
                    (ghostsRef.current[3] as Ghost).PathFind(pacmanRef.current, spawnRef.current, scattersRef.current[3], wallsRef.current, spawnTilesRef.current);
                }
                (ghostsRef.current[0] as Ghost).update(c);
                (ghostsRef.current[1] as Ghost).update(c);
                (ghostsRef.current[2] as Ghost).update(c);
                (ghostsRef.current[3] as Ghost).update(c);
            }

            Movement(pacmanRef, directionRef, wallsRef, spawnTilesRef);
            Death(pacmanRef, ghostsRef, directionRef, livesRef);
            previousDelta = currentDelta;
        }

        animate(0);
    }, []);
}