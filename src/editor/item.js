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

	onLabelClick = () => {
		this.setState({ isEditing: true });
	}

	onTfLoad = ref => {
		if (ref == null)
			return;

		ref.innerHTML = this.state.value.replace(/\n/g, '<br>');
		ref.focus();
	}

	onKeyDown = e => {
		const cancel = e.keyCode === 27;

		if (e.keyCode === 13 && !e.shiftKey || cancel) {
			this.setState({
				isEditing: false,
				value: cancel ? this.state.value : e.target.innerHTML
			});
		}
	}

	onBlur = e => {
		this.setState({ isEditing: false });
	}

	render() {
		return <li><div ref={this.onTfLoad}
			contentEditable={this.state.isEditing} onMouseDown={this.onLabelClick}
			onKeyDown={this.onKeyDown} onBlur={this.onBlur} /></li>;
	}
}
