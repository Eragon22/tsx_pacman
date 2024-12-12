/**
 * Handles the death of Pac-Man when colliding with a ghost.
 *
 * @param pacmanRef - A reference to the Pac-Man object.
 * @param ghostsRef - A reference to the array of ghost objects.
 * @param directionRef - A reference to the current direction of Pac-Man.
 * @param livesRef - A reference to the number of lives remaining for Pac-Man.
 *
 * When Pac-Man collides with a ghost in normal mode (Mode 0), this function:
 * - Resets Pac-Man's position to the starting point.
 * - Sets the direction of Pac-Man to null.
 * - Decreases the number of lives by one.
 * - Stops Pac-Man's movement by setting velocity to zero.
 * - Resets the position of all ghosts to their starting points.
 * - Stops the movement of all ghosts by setting their velocity to zero.
 * - Sets all ghosts to normal mode (Mode 0).
 */
export default function Death(pacmanRef, ghostsRef, directionRef, livesRef) {
    if (pacmanRef.current) {
        ghostsRef.current.forEach(ghost => {
            if (ghost.collides(pacmanRef.current) && (ghost.Mode == 0 || ghost.Mode == 1)) {
                pacmanRef.current.position = { x: 408, y: 690 };
                directionRef.current = null;
                livesRef.current -= 1;
                pacmanRef.current.velocity = { x: 0, y: 0 };
                var positions = [{ x: 420, y: 330 }, { x: 420, y: 420 }, { x: 390, y: 420 }, { x: 390, y: 330 }];
                ghostsRef.current.forEach((ghost, index) => ghost.position = positions[index]);
                ghostsRef.current.forEach(ghost => ghost.velocity = { x: 0, y: 0 });
                ghostsRef.current.forEach(ghost => ghost.Mode = 0);
            }
        });
    }
}