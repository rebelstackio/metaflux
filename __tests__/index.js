import { MetaComponent } from '../lib/metaviews/meta-component';
import { MetaShadowComponent } from '../lib/metaviews/meta-shadow-component';
const Store = require('../lib/store');
import {Div, DefineElement} from '../lib/customelements/ElementCreator';

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

/**-------------------------METAVIEWS---------------------------------------------- */

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
	document.body.appendChild(StatefulComponent());
	const el = document.querySelector('stateful-component > div');
	expect(el.innerHTML).toEqual('1');
	storage.dispatch({ type: 'INCREMENT' });
	expect(el.innerHTML).toEqual('2');
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

/**-----------------------------CUSTOM ELEMENTS---------------------------------- */

/** ------------------------STORE----------------------------------------------- */

test('storage dispatch without handlers', () => {
	storage = new Store({}, {});
	storage.dispatch({type: 'CUSTOM'})
	storage.on('CUSTOM', (action) => {
		expect(action.type, 'CUSTOM');
	})
})

test('storage callback after dispatch', () => {
	storage = new Store({val: '1'}, {});
	storage.dispatch({ type: 'CUSTOM', cb: (state) => {
		expect(state.val).toEqual('1');
	}})
})

test('storage get handlers', () => {
	storage = new Store({}, { 'EVENT_TYPE': () => { return { newState: {} } } });
	const _h = storage.getHandlers();
	expect( typeof _h['EVENT_TYPE'] ).toEqual('function')
})
