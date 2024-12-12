import { render } from 'preact';

import './Index.less';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import "../PWA";



/**
 * The main App component that serves as the root of the application.
 * It includes the Header, Main, and Footer components.
 *
 * @returns {JSX.Element} The rendered App component.
 */
export default function App() {
	return (
		<div className="App">
			<Header />
			<Main />
			<Footer />
		</div>
	);
}

render(<App />, document.getElementById('app'));
