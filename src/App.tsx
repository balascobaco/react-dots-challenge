import { useState, type MouseEvent } from 'react';
import './App.css';

interface Dot {
	x: number;
	y: number;
}

function App() {
	const [dots, setDots] = useState<Dot[]>([]);

	const draw = (e: MouseEvent) => {
		console.log(e);
		const { clientX, clientY } = e;
		setDots([...dots, { x: clientX, y: clientY }]);
	};

	return (
		<div className="App">
			<div id="button-wrapper">
				<button>Undo</button>
				<button>Redo</button>
			</div>
			<div
				id="click-area"
				onClick={draw}
			>
				{dots.map(({ x, y }: Dot, i: number) => {
					return (
						<div
							key={`dot-${1}`}
							className="dot"
							style={{ left: x, top: y }}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default App;
