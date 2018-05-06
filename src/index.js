/* eslint-disable no-unused-vars */
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import SimplexNoise from 'simplex-noise';

class Player extends React.Component {
	render() {
		return <div style={{
			position: 'absolute'
		}}>o</div>;
	}
}

class App extends React.Component {
	constructor() {
		super();
	}

	draw(canvas) {
		console.log('canvas', canvas);
		const noise = new SimplexNoise(),
			w = canvas.width,
			h = canvas.height,
			ctx = canvas.getContext('2d'),
			img = ctx.getImageData(0, 0, w, h),
			data = img.data,
			ca = [
				new Uint8ClampedArray(new Uint32Array([0xff00ffff]).buffer),
				new Uint8ClampedArray(new Uint32Array([0xff0000ff]).buffer)
			],
			wp = w / ca.length,
			lastIndex = ca.length - 1;

		let x, y, p, i, f, ci;

		for (y = i = 0; y < h; y++) {
			for (x = 0; x < w; i += 4, x++) {
				f = y / h * (noise.noise2D(x * .0001, y * .0005) + 1) / 2;
				ci = f * (lastIndex - .01) | 0;
				p = Math.round(f * lastIndex - ci);
				data[i] = ca[ci][0] + (lastIndex > 0 ? (ca[ci + 1][0] - ca[ci][0]) * p : 0);
				data[i + 1] = ca[ci][1] + (lastIndex > 0 ? (ca[ci + 1][1] - ca[ci][1]) * p : 0);
				data[i + 2] = ca[ci][2] + (lastIndex > 0 ? (ca[ci + 1][2] - ca[ci][2]) * p : 0);
				data[i + 3] = ca[ci][3] + (lastIndex > 0 ? (ca[ci + 1][3] - ca[ci][3]) * p : 0);
			}
		}

		ctx.clearRect(0, 0, w, h);
		ctx.putImageData(img, 0, 0);
	}

	render() {
		return <div>
			<Player />
			<canvas width="800" height="800" ref={this.draw} />
		</div>;
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
