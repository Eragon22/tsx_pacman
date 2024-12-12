import { useEffect } from 'react';

/**
 * A React component that manages the score and game state for a Pac-Man-like game.
 * 
 * @param {React.RefObject} pacmanRef - Reference to the Pac-Man object.
 * @param {React.RefObject} pelletsRef - Reference to the array of pellet objects.
 * @param {React.RefObject} scoreRef - Reference to the score value.
 * @param {React.RefObject} ghostsRef - Reference to the array of ghost objects.
 * @param {React.RefObject} directionRef - Reference to the direction value.
 * @param {React.RefObject} livesRef - Reference to the lives value.
 * 
 * @returns {void}
 * 
 * @remarks
 * This component uses a `setInterval` to periodically check for collisions between Pac-Man and pellets or ghosts.
 * When a collision with a pellet is detected, the score is updated and the pellet is removed.
 * If the pellet is a "big" pellet, the ghosts are set to a "fear" mode.
 * When a collision with a ghost in "fear" mode is detected, the ghost is "eaten" and the score is increased.
 * If all pellets are eaten, the game ends by setting lives to 0 and clearing the interval.
 */
export default function Score(pacmanRef, pelletsRef, scoreRef, ghostsRef, directionRef, livesRef) {
    useEffect(() => {
        var isLoaded = false;
        const interval = setInterval(() => {
            const collideWithPellet = pelletsRef.current.findIndex(pellet => pacmanRef.current.collides(pellet));
            if (collideWithPellet != -1) {
                if (pelletsRef.current[collideWithPellet].isBig) {
                    scoreRef.current += 50;
                    ghostsRef.current.forEach(ghost => ghost.Mode == 0 || ghost.Mode == 1 ? ghost.Fear() : null);
                }
                else
                    scoreRef.current += 10;
                pelletsRef.current.splice(collideWithPellet, 1);

                isLoaded = true;
            }
            if (isLoaded) {
                if (pelletsRef.current.length === 0) {
                    livesRef.current = 0;
                    clearInterval(interval);
                }
            }


            ghostsRef.current.forEach(ghost => {
                if (ghost.collides(pacmanRef.current) && ghost.Mode == 2) {
                    ghost.Mode = 3;
                    ghost.velocity = { x: 0, y: 0 };
                    scoreRef.current += 200;
                    ghost.position.x = Math.floor(ghost.position.x / 30) * 30;
                    ghost.position.y = Math.floor(ghost.position.y / 30) * 30;
                }
            });
        }, 10);

        return () => clearInterval(interval);
    }, []);
}