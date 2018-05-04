import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { argv } from 'yargs';

const APP_DIR = path.resolve(__dirname, '../src');
const MODULES_DIR = path.resolve(__dirname, '../node_modules');

const plugins = [
	new ExtractTextPlugin({
		filename: "[name].css",
		disable: false
	}),
	new HtmlWebpackPlugin({
		template: 'index.html'
	})
];

if (argv.env === 'build') {
	plugins.push(new UglifyJSPlugin({
		include: /\.js$/,
		minimize: true,
		parallel: true,
		sourceMap: true,
		uglifyOptions: {
			ie8: false
		}
	}),
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('production')
	}));
 }

const config = {
	context: APP_DIR,
	entry: {
		'app': './index.js'
	},
	output: {
		filename: '[name].js',
		chunkFilename: 'js/bundles/[name].bundle.js',
		path: path.resolve(__dirname, '../dist')
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [APP_DIR, MODULES_DIR]
	},
	devtool: 'source-map',
	module: {
		rules: [{
			test: /\.js$/,
			exclude: [ /node_modules/, new RegExp(`${APP_DIR}/vendor`) ],
			use: [
				{ loader: 'babel-loader' },
				{ loader: 'eslint-loader' }
			]
		}, {
			test: /\.scss$/,
			use: [
				{ loader: 'style-loader' },
				{ loader: 'css-loader' },
				{ loader: 'sass-loader' },
				{ loader: 'postcss-loader' }
			]
		},
		{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		},
		{
			test: /\.svg$/,
			use: { loader: 'svg-url-loader' }
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url-loader'
		}
	]
	},
	plugins: plugins
};

function scripts() {
	return new Promise(resolve => webpack(config, (err, stats) => {
		err && console.log('Webpack', err);

		console.log(stats.toString());

		resolve();
	}));
}

module.exports = argv.env === 'build' ? config : { config, scripts };
