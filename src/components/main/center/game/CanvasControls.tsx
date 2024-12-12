import { useEffect } from 'react';

/**
 * A React component that sets up keyboard controls for a game.
 * 
 * @param directionRef - A reference object to store the current direction based on keyboard input.
 * 
 * This component listens for keydown events and updates the directionRef based on the key pressed.
 * The keys for moving up, down, left, and right are retrieved from localStorage.
 * 
 * The event listener is added when the component mounts and removed when the component unmounts.
 */
export default function Controls(directionRef) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case localStorage.getItem("Move Up"):
                    directionRef.current = "up";
                    break;
                case localStorage.getItem("Move Down"):
                    directionRef.current = "down";
                    break;
                case localStorage.getItem("Move Left"):
                    directionRef.current = "left";
                    break;
                case localStorage.getItem("Move Right"):
                    directionRef.current = "right";
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
}