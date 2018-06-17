/* eslint-disable no-unused-vars */
import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CaptionEditor from './editor';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {};

		axios.get('./The Avengers (2012)-legendafilmes.com.br.srt')
			.then(response => this.setState({ data: response.data }))
			.catch(r => console.log(r));
	}

	render() {
		return <CaptionEditor data={this.state.data} />;
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
