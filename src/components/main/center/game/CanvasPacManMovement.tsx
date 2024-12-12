/**
 * Handles the movement of Pac-Man based on the current direction and checks for collisions with walls and barriers.
 *
 * @param pacmanRef - A reference to the Pac-Man object, which contains its current velocity and methods to check for collisions.
 * @param directionRef - A reference to the current direction Pac-Man is moving in. Possible values are "up", "down", "left", "right".
 * @param wallsRef - A reference to the array of wall objects that Pac-Man can collide with.
 * @param barrierRef - A reference to the array of barrier objects that Pac-Man can collide with.
 * @param spawnTilesRef - A reference to the array of spawn tiles
 *
 * The function updates Pac-Man's velocity based on the current direction and checks if the new velocity would cause a collision.
 * If a collision is detected, it reverts to the previous velocity or stops Pac-Man's movement if changing direction would still result in a collision.
 */
export default function Movement(pacmanRef, directionRef, wallsRef, spawnTilesRef) {
    if (pacmanRef.current) {
        const previousVelocity = { x: pacmanRef.current.velocity.x, y: pacmanRef.current.velocity.y };
        switch (directionRef.current) {
            case "up":
                pacmanRef.current.velocity = { x: 0, y: -1 };
                break;
            case "down":
                pacmanRef.current.velocity = { x: 0, y: 1 };
                break;
            case "left":
                pacmanRef.current.velocity = { x: -1, y: 0 };
                break;
            case "right":
                pacmanRef.current.velocity = { x: 1, y: 0 };
                break;
            default:
                pacmanRef.current.velocity = { x: 0, y: 0 };
                break;
        }
        var willCollide = wallsRef.current.some(wall => pacmanRef.current.willCollide(wall, pacmanRef.current.velocity)) || spawnTilesRef.current.some(tile => pacmanRef.current.willCollide(tile, pacmanRef.current.velocity));
        var wouldCollide = wallsRef.current.some(wall => pacmanRef.current.willCollide(wall, previousVelocity)) || spawnTilesRef.current.some(tile => pacmanRef.current.willCollide(tile, previousVelocity));
        var isChangingDirection = pacmanRef.current.velocity.x != previousVelocity.x && pacmanRef.current.velocity.y != previousVelocity.y;
        if (willCollide)
            if (isChangingDirection)
                wouldCollide ? pacmanRef.current.velocity = { x: 0, y: 0 } : pacmanRef.current.velocity = previousVelocity;
            else
                pacmanRef.current.velocity = { x: 0, y: 0 };
    }
}