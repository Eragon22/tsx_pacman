import './Title.less'

/**
 * A functional React component that renders a title section for a Pac-Man themed application.
 * The title section includes images of various Pac-Man characters and a heading.
 *
 * @returns {JSX.Element} The JSX code for the title section.
 */
export default function Title() {
    return (
        <div className="my-5 Title">
            <img src="src/assets/pinky/pinky1.png" alt="Pinky" />
            <img src="src/assets/ghost/ghost1.png" alt="Ghost" />
            <img src="src/assets/clyde/clyde1.png" alt="Clyde" />
            <img src="src/assets/ghost/ghost1.png" alt="Ghost" />
            <h1 className="my-3 display-3">Pac-Man</h1>
            <img src="src/assets/ghost/ghost1.png" alt="Ghost" />
            <img src="src/assets/blinky/blinky1.png" alt="Blinky" />
            <img src="src/assets/ghost/ghost1.png" alt="Ghost" />
            <img src="src/assets/inky/inky1.png" alt="Inky" />
        </div>
    );
}