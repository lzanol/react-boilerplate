/* eslint-disable no-unused-vars */
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
	constructor() {
		super();
	}

	render() {
		return <h1>weee!</h1>;
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
