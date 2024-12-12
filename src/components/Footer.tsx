import './Footer.less';

/**
 * Footer component that renders a footer element with a dark background and centered text.
 *
 * @returns {JSX.Element} The rendered footer component.
 */
export default function Footer() {
    return (
        <footer className="py-2 bg-dark Footer">
            <p className="text-center w-50 mx-auto">Made by: Telek Marcell</p>
            <hr />
            <p className="text-center w-50 mx-auto">Audio made using <a href="https://www.beepbox.co">https://www.beepbox.co</a>. <br />" BeepBox does not claim ownership over songs created with it, so original songs belong to their authors. " </p>
        </footer>
    );
}