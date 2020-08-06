import { MetaComponent } from '../lib/metaviews/meta-component';
import { MetaShadowComponent } from '../lib/metaviews/meta-shadow-component';
import {Div, DefineElement} from '../lib/customelements/ElementCreator';
const Store = require('../lib/store');
import metaBase, { MetaBase } from '../lib/metaviews/meta-base';

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
		return Div({}, `This is my shadow component`);
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
	let fn = jest.fn();
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
				'INCREMENT': fn
			}
		}
	}
	DefineElement('stateful-component', myStateFulComponent);
	document.body.appendChild(StatefulComponent());
	storage.dispatch({ type: 'INCREMENT' });
	expect(fn).toHaveBeenCalled();
});

test('MetaShadowComponent with state change', () => {
	storage = new Store({val: 1}, { 'INCREMENT': (a, s) => { s.val++; return {newState: s} } })
	let fn = jest.fn();
	class myStateFulComponent extends MetaShadowComponent {
		constructor() {
			super(storage);
			this.styles = [];
		}
		render() {
			this.content = Div({}, this.storage.getState().val);
			return 'this.content';
		}
		handleStoreEvents() {
			return {
				'INCREMENT': fn
			}
		}
	}
	DefineElement('stateful-shadow', myStateFulComponent);
	let el = StatefulShadow();
	document.body.appendChild(el);
	storage.dispatch({ type: 'INCREMENT' });
	expect(fn).toHaveBeenCalled();
});

test('MetaComponent and MetaShadow component addListeners', () => {
	const mcFn = jest.fn();
	const mscFn = jest.fn();
	class MyComponent extends MetaComponent {
		render () {
			return `This is my component`;
		}
		addListeners() {
			this.addEventListener('click', mcFn);
		}
	}
	DefineElement('mc-component', MyComponent);
	class MyShadoComponent extends MetaShadowComponent {
		constructor() {
			super();
			this.styles = []
		}

		addListeners() {
			this.addEventListener('click', mscFn);
		}
		render() {
			return `This is my shadow component`;
		}
	}
	DefineElement('msc-component', MyShadoComponent);
	document.body.McComponent().click();
	document.body.MscComponent().click();
	expect(mcFn).toHaveBeenCalled();
	expect(mscFn).toHaveBeenCalled();
});


test('MetaComponent and MetaShadowComponent throw error if render method is not defined',
() => {
	class errComponent extends MetaBase {
		constructor() {
			super();
			this.render = false;
		}
	}
	expect(() => {
		new errComponent();
	}).toThrow();
})


