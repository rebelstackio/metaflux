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
			let trans = Object.assign({},{oldState:this._state});
			trans = Object.assign( trans, this._handlers[action](action, this._state) );
			return this.emit(action.type,trans);
		} else {
			this.emit(action.type,action);
			return void 0;
		}
	}

}

module.exports = Store;