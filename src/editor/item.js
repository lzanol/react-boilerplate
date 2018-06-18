/* eslint-disable no-unused-vars */
import React, { Component } from 'react';

export default class Item extends Component {
	constructor(props) {
		super(props);

		this.state = {
			...props.data
		};

		this.index = props.index;
	}

	msToTime(ms) {
		const pad = n => `0${n}`.slice(-2);
		const s = ms / 1000 | 0,
			m = (s / 60 | 0) % 60,
			h = (m / 60 | 0) % 60;

		return `${pad(h)}:${pad(m)}:${pad(s % 60)}`;
	}

	update() {
		if (this.element)
			this.element.innerHTML = this.state.text.replace(/\n/g, '<br>');
	}

	onTextClick = () => {
		this.props.editing || this.props.onEdit(this);
	}

	submit = cancel => {
		cancel || this.setState({ text: this.element.innerHTML });
		this.props.onSubmit();
	}

	onLoad = ref => {
		this.element = ref;

		if (ref == null)
			return;

		this.update();
		ref.focus();
	}

	onKeyDown = e => {
		const cancel = e.keyCode === 27;

		if (e.keyCode === 13 && !e.shiftKey || cancel)
			this.submit(cancel);
	}

	componentDidUpdate() {
		this.update();
	}

	render() {
		const submit = this.props.editing ? <div className="actions">
			<button onClick={() => this.submit(true)}>Cancel</button>
			<button onClick={() => this.submit()}>Ok</button>
		</div> : null;

		return <li>
			<div className="time"><div>{this.msToTime(this.state.start)}</div>
				<div>{this.msToTime(this.state.end)}</div></div>
			<div className="text" ref={this.onLoad} contentEditable={this.props.editing}
				onMouseDown={this.onTextClick} onKeyDown={this.onKeyDown} />
			{submit}
		</li>;
	}
}
