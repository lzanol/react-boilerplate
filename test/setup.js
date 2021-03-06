import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<!DOCTYPE html><html><body></body></html>');

global.window = jsdom.window;
global.document = window.document;
global.navigator = window.navigator;

configure({ adapter: new Adapter() });
