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
	storage = new Store({}, { 'EVENT_TYPE': () => { return { newState: {} } },
	'EVENT_TYPE2': () => { return { newState: {} } } });
	const _h = storage.getHandlers();
	expect( typeof _h['EVENT_TYPE'] ).toEqual('function')
})

test('storage set handler', () => {
	storage = new Store({}, {});
	storage.addHandler('EVENT_TYPE', () => { return { newState: {} } } )
	const _h = storage.getHandlers();
	expect( typeof _h['EVENT_TYPE'] ).toEqual('function')
});

test('Deep Cloning', () => {
	storage = new Store({
		test: 'x',
		k: function(x) { return x+1 },
		j: {
			z: ['1', '2'],
			x: /(c)/g,
			h: {
				d: new Date(),
				e: document.createElement('div')
			}
		}
	}, {
		'UPDATE': (action, state) => {
			let oldSate = state;
			state.j.z.push('3');
			let newState = state;
			return { newState, oldSate }
		}
	});
	storage.dispatch({type: 'UPDATE'});
	storage.on('UPDATE', action => {
		const { newState, oldSate } = action;
		expect(newState.j.z.lenght).toEqual(3);
		expect(oldSate.j.z.lenght).toEqual(2);
	})
});

test('Empty instance', () => {
	storage = new Store();
})
