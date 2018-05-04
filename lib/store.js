/* lib/store.js */
'use strict';

const EventEmitter = require('eventemitter3');
const path = require('jsonpath');

class Store extends EventEmitter {

	constructor ( initialState, handlers ) {
		// TODO: validate actionmap (required 1 mappping) or throw
		this._handlers = handlers || {};
		this._state = initialState || {};
		this._stateclone = Object.assign({},this._state);
	}

	getState (jsonpath) {
		if (jsonpath) {
			return path.query(this._stateclone, jsonpath);
		} else {
			return Object.assign({},this._stateclone);
		}
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
			let clone = Object.assiggn({},trans.newState);
			this._state = clone;
			this._stateclone = Object.assign({},clone);
			return this.emit(action.type,this._stateclone);
		} else {
			this.emit(action.type,action);
			return void 0;
		}
	}

}

module.exports = Store;