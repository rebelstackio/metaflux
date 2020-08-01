import {Div, DefineElement} from '../lib/customelements/ElementCreator';
import { MetaComponent } from '../lib/metaviews/meta-component';
import { MetaShadowComponent } from '../lib/metaviews/meta-shadow-component';
const Store = require('../lib/store');
require('../lib/customelements/index');

let storage = null;

class MyComponent extends MetaComponent {
	render () {
		return `This is my component`;
	}
}

class MyShadoComponent extends MetaShadowComponent {
	constructor() {
		super();
		this.styles = []
	}

	addListeners() {

	}
	render() {
		return `This is my shadow component`;
	}
}

test('Meta Shadow component to be HTMLElement', () => {
	DefineElement('my-shadow-component', MyShadoComponent);
	document.body.MyShadowComponent();
	const el = document.querySelector('my-shadow-component');
	expect(el).toBeInstanceOf(HTMLElement);
});

test('Meta component to be HTMLElement', () => {
	DefineElement('my-component', MyComponent);
	document.body.MyComponent();
	const el = document.querySelector('my-component');
	expect(el).toBeInstanceOf(HTMLElement);
});

test('MetaComponent with state change', () => {
	storage = new Store({val: 1}, { 'INCREMENT': (a, s) => { s.val++; return {newState: s} } })
	class myStateFulComponent extends MetaComponent {
		constructor() {
			super(storage);
		}
		render() {
			this.content = Div({}, this.storage.getState().val);
			return this.content;
		}
		handleStoreEvents() {
			return {
				'INCREMENT': () => {
					this.content.innerHTML = this.storage.getState().val;
				}
			}
		}
	}
	DefineElement('stateful-component', myStateFulComponent);
	document.body.StatefulComponent();
	const el = document.querySelector('stateful-component > div');
	expect(el.innerHTML).toEqual('1');
	storage.dispatch({ type: 'INCREMENT' });
	expect(el.innerHTML).toEqual('2');
});



test('elmenet Div', () => {
	const el = Div({id: 'test-id'}, 'test-div');
	document.body.appendChild(el);
	expect(document.querySelector('#test-id').textContent).toEqual('test-div');
});

test('Base node Return top parent node', () => {
	const el = Div({id: 'parent-el'}).Span().Span().Div().baseNode();
	expect(el.id).toEqual('parent-el')
})
