/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Item extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isEditing: false,
			value: props.value || ''
		};
	}

	resizeTf(tf) {
		tf.rows = tf.value.split(/\n/).length;
	}

	onLabelClick = () => {
		this.setState({ isEditing: true });
	}

	onTfLoad = ref => {
		if (ref == null)
			return;

		ref.value = this.state.value;
		ref.select();
		this.resizeTf(ref);
	}

	onKeyDown = e => {
		const cancel = e.keyCode === 27;

		if (e.keyCode === 13 && !e.shiftKey || cancel) {
			this.setState({
				isEditing: false,
				value: cancel ? this.state.value : e.target.value
			});
		}
	}

	onChange = e => {
		this.resizeTf(e.target);
	}

	onBlur = e => {
		this.setState({ isEditing: false });
	}

	render() {
		return <li>{this.state.isEditing ?
			<textarea type="text" rows="1" ref={this.onTfLoad}
				onKeyDown={this.onKeyDown} onBlur={this.onBlur}
				onChange={this.onChange} /> :
			<pre onClick={this.onLabelClick}>{this.state.value}</pre>}
		</li>;
	}
}
