/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { parse } from 'subtitle';
import Item from './item';

import './style.scss';

export default class CaptionEditor extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const items = typeof this.props.data === 'string' ?
			parse(this.props.data).slice(0, 1).map((v, i) =>
				<Item key={i} value={v.text} />) : null;

		return <ul className="caption-editor">{items}</ul>;
	}
}
