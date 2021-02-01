import {Div, Button} from '../lib/customelements/ElementCreator';
require('../lib/customelements/index');
const Store = require('../lib/store');

test('elmenet Div', () => {
	const el = Div({id: 'test-id'}, 'test-div');
	document.body.appendChild(el);
	expect(document.querySelector('#test-id').textContent).toEqual('test-div');
});

test('Base node Return top parent node', () => {
	const el = Div({id: 'parent-el'}).Span().Span().Div().baseNode();
	expect(el.id).toEqual('parent-el')
});

test('onStoreEvent expect to be called', () => {
	global.storage = new Store({val: 1}, { 'INCREMENT': (a, s) => { s.val++; return {newState: s} } })
	const calleable = jest.fn();
	const el = Button().onStoreEvent('INCREMENT', calleable)
	document.body.appendChild(el);
	global.storage.dispatch({type: 'INCREMENT'})
	expect(calleable).toHaveBeenCalled();
});

test('onStoreEvent expect not to be called if el is not in the html tree', () => {
	global.storage = new Store({val: 1}, { 'INCREMENT': (a, s) => { s.val++; return {newState: s} } })
	const calleable = jest.fn();
	const el = Button().onStoreEvent('INCREMENT', calleable)
	global.storage.dispatch({type: 'INCREMENT'})
	expect(calleable).not.toHaveBeenCalled();
});

test('Events object in content should execute if defined', () => {
	global.storage = new Store({}, {});
	const calleable = jest.fn();
	Div({}, {
		content: 'hello world',
		events: { 'MY_EVENT': calleable }
	})
	global.storage.dispatch({type: 'MY_EVENT'});
	expect(calleable).toHaveBeenCalled();
});

test('Events object in content should throw if storage is not defined', () => {
	global.storage = undefined;
	expect(() => {
		Div({}, {
			content: 'hello world',
			events: { 'MY_EVENT': () => {} }
		})
	}).toThrow();
})

test('onStoreEvent expect to throw error when storage is not defined', () =>{
	global.storage = undefined;
	expect(() => {
		const el = Div().onStoreEvent('EVENT');
	}).toThrow();
});

test('setAtrributes add multiples attributes to an element', () => {
	const el = Div().setAttributes({att1: '1', att2: '2'});
	expect(el.getAttribute('att1')).toEqual('1');
	expect(el.getAttribute('att2')).toEqual('2');
})

test('Custom elements props (classList, attributtes)', () => {
	const el = Div({classList: ['cl1', 'cl2'], attributes:{'att1': '1'}})
	expect(el.classList.length).toEqual(2);
	expect(el.getAttribute('att1')).toEqual('1')
})

test('Custom element content can be instance of HTMLElement, Function or array', () => {
	const htmlContent = Div({}, Div());
	expect(htmlContent.children[0]).toBeInstanceOf(HTMLElement);
	const htmlFunc = Div({}, () => ( Div() ));
	expect(htmlFunc.children[0]).toBeInstanceOf(HTMLElement);
	const htmlArray = Div({}, [Div(), Div()]);
	expect(htmlArray.childElementCount).toEqual(2)
})

test('Custom element props can be instance of String and act like content', () => {
	const htmlElement = Div(`<span>test</span>`);
	const text = htmlElement.querySelector('span').innerHTML;
	expect(text).toEqual('test');
})
