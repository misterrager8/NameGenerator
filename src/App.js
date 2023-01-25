import $ from 'jquery';
import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

const adjectives = [
"smart",
"fast",
"quick",
"red",
"blue",
"green",
"wandering",
"light",
"dark",
"cold",
"hot"
	];

const nouns = [
"cookie",
"dawn",
"stone",
"tree",
"storm",
"wind",
"fruit",
"flower",
"garden",
"grove",
"street",
"road"
	];

function App() {
	const [theme, setTheme] = useState(localStorage.getItem('name-generator'));
	const [random, setRandom] = useState([]);
	const [copied, setCopied] = useState(false);
	const [case_, setCase] = useState('pascal');

	const changeTheme = (theme_) => {
		localStorage.setItem('name-generator', theme_);
		document.documentElement.setAttribute('data-theme', theme_);
		setTheme(theme_);
	}

	const formatWord = () => {
		let adjective = adjectives[Math.floor(Math.random()*adjectives.length)];
		let noun = nouns[Math.floor(Math.random()*nouns.length)];

		switch (case_) {
			case 'pascal':
				setRandom(`${adjective[0].toUpperCase() + adjective.substring(1)}${noun[0].toUpperCase() + noun.substring(1)}`);
				break;
			case 'snake':
				setRandom(`${adjective.toLowerCase()}_${noun.toLowerCase()}`);
				break;
			case 'camel':
				setRandom(`${adjective.toLowerCase()}${noun[0].toUpperCase() + noun.substring(1)}`);
				break;
			case 'kebab':
				setRandom(`${adjective.toLowerCase()}-${noun.toLowerCase()}`);
		}
		$('#random-word').text(random);
	}

	const copyWord = () => {
		navigator.clipboard.writeText(random);
		setCopied(true);
		setTimeout(function() { setCopied(false); }, 1500);
	}

	useEffect(() => {
		changeTheme(theme);
		formatWord();
	}, [case_]);

	return (
		<div className="p-5">
			<div>
				<a onClick={() => changeTheme(theme==='light'?'dark':'light')} className={'text-capitalize btn btn-outline-' + (theme==='light'?'dark':'light')}><i className={'bi bi-' + (theme==='light'?'moon':'sun') + '-fill'}></i> {theme==='light'?'dark':'light'}</a>
			</div>
			<div className="text-center mt-4">
				<div className="btn-group mb-3">
					{case_ != 'camel' && <a onClick={() => setCase('camel')} className="btn btn-outline-secondary">camelCase</a>}
					{case_ != 'pascal' && <a onClick={() => setCase('pascal')} className="btn btn-outline-secondary">PascalCase</a>}
					{case_ != 'kebab' && <a onClick={() => setCase('kebab')} className="btn btn-outline-secondary">kebab-case</a>}
					{case_ != 'snake' && <a onClick={() => setCase('snake')} className="btn btn-outline-secondary">snake_case</a>}
				</div>
				<div id="random-word" style={{ fontSize: '6em' }}>{random}</div>
				<div className="btn-group mt-3">
					<a onClick={copyWord} className="btn btn-outline-secondary"><i className={'bi bi-' + (copied?'check-lg':'clipboard')}></i></a>
					<a className="btn btn-outline-primary"><i className="bi bi-arrow-clockwise"></i></a>
				</div>
			</div>
		</div>
		);
}

export default App;