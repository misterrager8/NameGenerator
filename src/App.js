import $ from 'jquery';
import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
	const [theme, setTheme] = useState(localStorage.getItem('name-generator'));
	const [random, setRandom] = useState([]);
	const [copied, setCopied] = useState(false);

	const changeTheme = (theme_) => {
		localStorage.setItem('name-generator', theme_);
		document.documentElement.setAttribute('data-theme', theme_);
		setTheme(theme_);
	}

	const getRandom = () => {
		let adjective;
		let noun;

		$.ajax({
			url: 'https://random-word-form.herokuapp.com/random/adjective',
			async: false,
			success: function(data) {
				adjective = data[0];
			}
		});

		$.ajax({
			url: 'https://random-word-form.herokuapp.com/random/noun',
			async: false,
			success: function(data) {
				noun = data[0];
			}
		});

		setRandom(`${adjective.toLowerCase()}-${noun.toLowerCase()}`);
	}

	const copyWord = () => {
		navigator.clipboard.writeText(random);
		setCopied(true);
		setTimeout(function() { setCopied(false); }, 1500);
	}

	useEffect(() => {
		changeTheme(theme);
		getRandom();
	}, []);

	return (
		<div className="p-5">
			<div className="d-flex justify-content-between">
				<a onClick={() => changeTheme(theme === 'light' ? 'dark' : 'light')} className={'text-capitalize btn btn-sm btn-outline-' + (theme === 'light' ? 'dark' : 'light')}><i className={'bi bi-' + (theme==='light'?'moon':'sun') + '-fill'}></i> {theme==='light'?'dark':'light'}</a>
				<a target="_blank" href="http://github.com/misterrager8/NameGenerator" className={'btn btn-sm btn-outline-secondary'}><i className={'bi bi-github'}></i> About</a>
			</div>
			<div className="text-center mt-4">
				<div className="fst-italic" style={{ fontSize: '6em' }}>{random}</div>
				<div className="btn-group btn-group-sm mt-3">
					<a onClick={() => copyWord()} className={'btn btn-outline-' + (copied ? 'success' : 'secondary')}><i className={'bi bi-' + (copied?'check-lg':'clipboard')}></i> {!copied ? 'Copy' : 'Copied.'}</a>
					<a onClick={() => getRandom()} className="btn btn-outline-primary"><i className="bi bi-shuffle"></i> New Name</a>
				</div>
			</div>
		</div>
		);
}

export default App;