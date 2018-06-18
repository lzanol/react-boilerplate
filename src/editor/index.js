/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { parse } from 'subtitle';
import Item from './item';

import './style.scss';

export default class CaptionEditor extends Component {
	constructor(props) {
		super(props);

		this.state = {
			editingIndex: -1
		};
	}

	onEditItem = item => {
		this.setState({ editingIndex: item.index });
	}

	onSubmitItem = item => {
		this.setState({ editingIndex: -1 });
	}

	render() {
		const items = parse(this.props.data).slice(0, 10).map((v, i) =>
			<Item key={i} index={i} data={v} editing={this.state.editingIndex === i}
				onEdit={this.onEditItem} onSubmit={this.onSubmitItem} />);

		return <ul className="caption-editor">{items}</ul>;
	}
}
