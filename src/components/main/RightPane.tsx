import './RightPane.less';

interface RightPaneProps {
    className?: string;
}

/**
 * The `RightPane` component displays a section with instructions on how to play the game.
 * It includes a header and a list of gameplay instructions.
 *
 * @param {RightPaneProps} props - The properties for the `RightPane` component.
 * @param {string} props.className - Additional class names to apply to the component.
 *
 * @returns {JSX.Element} The rendered `RightPane` component.
 */
export default function RightPane({ className }: RightPaneProps) {
    return (
        <div className={`RightPane ${className}`}>
            <div className="RightPane_header">
                <h1>How to Play</h1>
            </div>
            <div className="RightPane_content container">
                <ul>
                    <li>Use the movement keys to move Pac-Man through the maze.</li>
                    <li>Eat all the dots to win.</li>
                    <li>Avoid the ghosts, or you'll lose a life!</li>
                    <li>Collect power pellets (larger dots on the map) to temporarily turn the tables on the ghosts.</li>
                </ul>
            </div>
        </div >
    );
}