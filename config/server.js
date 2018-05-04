import path from 'path';
import Browser from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

import { config as webpackConfig } from './webpack';

const browser = Browser.create();
const bundler = webpack(webpackConfig);

const config = {
	server: 'public',
	middleware: [
		webpackDevMiddleware(bundler, {
			lazy: false
		})
	],
	open: false,
	watchOptions: {
		ignoreInitial: true,
		ignored: '*.txt'
	},
	files: [{
		match: [path.resolve(__dirname, '../src/**/*.js'), path.resolve(__dirname, '../src/**/*.scss')],
		fn: (event, file) => {
			browser.reload();
		}
	}],
	// syncs user actions across app instances
	ghostMode: false
};

browser.init(config);