/* lib/store.js */
'use strict';

const EventEmitter = require('eventemitter3');

class Store extends EventEmitter {

	constructor ( initialState, handlers ) {
		// TODO: validate actionmap (required 1 mappping) or throw
		this._handlers = handlers || {};
		this._state = initialState || {};
	}

	get state () {
		return this._state;
	}

	get handlers () {
		return this._handlers;
	}

	addHandler ( action, func ) {
		this._handlers[action] = func;
	}

	dispatch ( action ) {
		if ( this._handlers[action] ) {
			let oldState = Object.assign({},this._state);
			let trans = { oldState:oldState };
			trans = Object.assign( trans, this._handlers[action](action, oldState) );
			this._state = trans.newState;
			return this.emit(action.type,trans);
		} else {
			this.emit(action.type,action);
			return void 0;
		}
	}

}

module.exports = Store;