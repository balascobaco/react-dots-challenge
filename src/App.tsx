import { useState, type MouseEvent } from 'react';
import './App.css';

interface Dot {
	x: number;
	y: number;
}

function App() {
	const [dots, setDots] = useState<Dot[]>([]);
	const [cache, setCache] = useState<Dot[]>([]);

	const draw = (e: MouseEvent) => {
		console.log(e);
		const { clientX, clientY } = e;
		setDots([...dots, { x: clientX, y: clientY }]);
	};

	const undo = () => {
		if (dots.length > 0) {
			const newDots = [...dots];
			const lastDot = newDots.pop() as Dot;
			Promise.all([setCache([...cache, lastDot]), setDots(newDots)]);
		}
	};

	const redo = () => {
		if (cache.length > 0) {
			const newCache = [...cache];
			const lastCache = newCache.pop() as Dot;
			Promise.all([setCache(newCache), setDots([...dots, lastCache])]);
		}
	};

	return (
		<div className="App">
			<div id="button-wrapper">
				<button onClick={undo}>Undo</button>
				<button onClick={redo}>Redo</button>
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
