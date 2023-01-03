function Navbar() {
	const [theme, setTheme] = React.useState(localStorage.getItem('NameGenerator'));

	const setThemeAs = (theme_) => {
		localStorage.setItem('NameGenerator', theme_);
		document.documentElement.setAttribute('data-theme', theme_);
		setTheme(theme_);
	}

	const switchTheme = () => {
		let theme_ = theme === 'light' ? 'dark' : 'light';
		setThemeAs(theme_);
	}

	React.useEffect(() => {
		setThemeAs(theme);
	}, []);

	return (
		<nav className="navbar navbar-expand-lg">
			<div className="container-fluid">
				<div className="collapse navbar-collapse">
					<ul className="navbar-nav me-auto">
						<li className="nav-item">
							<a onClick={switchTheme} className="nav-link"><i className={'bi bi-' + (theme === 'light' ? 'moon' : 'sun') + '-fill'}></i> {theme === 'light' ? 'Dark' : 'Light'}</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		);
}

function Generator() {
	const [name, setName] = React.useState([]);
	const [format, setFormat] = React.useState('pascal');

	React.useEffect(() => {
		$.get('/generate', {
			format: format
		}, function(data) {
			$('#new-name').text(data);
			setName(data);
		});
	}, [format]);

	const setFormatAs = (format_) => {
		setFormat(format_);
	}

	const copyName = () => {
		navigator.clipboard.writeText(name);
		$('#copy').toggleClass(['bi-clipboard', 'bi-check-lg']);
		setTimeout(function() { $('#copy').toggleClass(['bi-clipboard', 'bi-check-lg']); }, 1500);
	}

	return (
		<div className="text-center">
			<div className="btn-group btn-group-sm mb-3">
				<a onClick={() => setFormatAs('pascal')} className="btn btn-outline-primary active">PascalCase</a>
				<a onClick={() => setFormatAs('camel')} className="btn btn-outline-primary">camelCase</a>
				<a onClick={() => setFormatAs('snake')} className="btn btn-outline-primary">snake_case</a>
				<a onClick={() => setFormatAs('kebab')} className="btn btn-outline-primary">kebab-case</a>
			</div>
			<p className="fs-1" id="new-name"></p>
			<div className="btn-group btn-group-sm">
				<a onClick={copyName} className="btn btn-outline-secondary"><i id="copy" className="bi bi-clipboard"></i></a>
			</div>
		</div>
		);
}

function App() {
	return (
		<div className="p-4">
			<Navbar/>
			<Generator/>
		</div>
		);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
