/**
 * Header component that renders a dark-themed navigation bar with a brand logo and title.
 *
 * @returns {JSX.Element} The rendered header component.
 */
export default function Header() {
    return (
        <header className="navbar navbar-dark bg-dark">
            <a className="navbar-brand">
                <img src="./src/assets/icon.png" width="30" height="30" className="d-inline-block align-top" alt="" />
                Pac-Man
            </a>
        </header>
    );
}