const Store = require('../lib/store');
let storage = null;

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
