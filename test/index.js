const assert = require('assert');
const Store = require('../lib/store');

let storage = null;

describe('Metaflux storage action dispatching flow', () => {
	beforeEach('Instantiating storage', () => {
		storage = new Store(
			{Counter: 1},
			{INCREMENT: (action, state) => {
				state.Counter = state.Counter + 1;
				return {newState: state};
			}
		});
	});
	describe('Storage was set properly', () => {
		it('Storage.getState().Counter initially must be equal to 1', () => {
			assert.equal(storage.getState().Counter, 1);
		});
	});
	describe('Dispatching action', () => {
		describe('Testing Storage.on("INCREMENT") is called', () => {
			it('Store.on() attribute action.newState must equal to 2', done => {
				setTimeout(() => {
					storage.dispatch({
						type: 'INCREMENT'
					});
				}, 20);
				storage.on('INCREMENT', action => {
					assert(action.newState, 2);
					done();
				});
			});
		});
		describe('Testing INCREMENT action really incremented Storage.getState().Counter', () => {
			it('Storage.getState().Counter must be equal to 2', () => {
				storage.dispatch({
					type: 'INCREMENT'
				});
				assert.equal(storage.getState().Counter, 2);
			});
		});
	});
});
