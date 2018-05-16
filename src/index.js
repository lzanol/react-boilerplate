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

		this.state = {
			noiseEnabled: true
		};
	}

	configCanvas = canvas => {
		const ctx = canvas.getContext('2d'),
			w = canvas.width,
			h = canvas.height,
			ca = [
				new Uint8ClampedArray(new Uint32Array([0xff00ffff]).buffer),
				new Uint8ClampedArray(new Uint32Array([0xff0000ff]).buffer),
				new Uint8ClampedArray(new Uint32Array([0xffffff00]).buffer)
			],
			img = ctx.getImageData(0, 0, w, h);

		this.canvasConfig = {
			canvas, ctx, w, h, ca, img,
			noise: new SimplexNoise(),
			wp: w / ca.length,
			lastIndex: ca.length - 1,
			data: img.data
		};

		this.draw();
	}

	draw() {
		const { canvas, ctx, w, h, noise, ca, wp, lastIndex, img, data } = this.canvasConfig,
			v = this.state.noiseEnabled ? this.refs.scaleSlider.value : 0,
			smoothness = this.refs.smoothnessSlider.value,
			smtP10 = Math.pow(10, smoothness);

		let x, y, p, i, f, ci;

		for (y = i = 0; y < h; y++) {
			for (x = 0; x < w; i += 4, x++) {
				f = (noise.noise2D(x * v, y * v) + 1) / 2;
				f *= x / w;
				ci = f * (lastIndex - 0.01) | 0;
				p = Math.round((f * lastIndex - ci) * smtP10) / smtP10;
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
			<ul>
				<li><input type="checkbox" defaultChecked={this.state.noiseEnabled}
					onChange={({ target: { checked } }) => {
						this.setState({ noiseEnabled: checked }, () => this.draw());
					}} />
				<input type="range" min="0.0005" max="0.1" defaultValue="0.05" step="0.0005"
					disabled={!this.state.noiseEnabled}
					ref="scaleSlider"
					onChange={() => this.draw()} /></li>
				<li><input type="range" min="0" max="2" defaultValue="0" step="0.0005"
					ref="smoothnessSlider"
					onChange={() => this.draw()} /></li>
			</ul>
			<canvas width="300" height="300" ref={this.configCanvas} />
		</div>;
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
