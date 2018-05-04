/* lib/store.js */
'use strict';

const EventEmitter = require('eventemitter3');
const path = require('jsonpath');

class Store extends EventEmitter {

	constructor ( initialState, handlers ) {

		// TODO: validate initialState and handlers (throw on exception)

		let _handlers = handlers || {};
		let _state = Object.assign({},initialState) || {};
		let _stateclone = Object.assign({},_state);

		this.getState = function (jsonpath) {
			if (jsonpath) {
				return path.query(_stateclone, jsonpath);
			} else {
				return Object.assign({},_stateclone);
			}
		};

		this.getHandlers = function getHandlers () {
			return _handlers;
		};

		this.addHandler = function addHandler ( action, func ) {
			_handlers[action] = func;
		};		

		this.dispatch = function 	dispatch ( action ) {
			if ( _handlers[action] ) {
				let oldState = Object.assign({},_state);
				let trans = { oldState:oldState };
				trans = Object.assign( trans, this._handlers[action](action, oldState) );
				let clone = Object.assign({},trans.newState);
				_state = clone;
				_stateclone = Object.assign({},clone);
				return this.emit(action.type,_stateclone);
			} else {
				this.emit(action.type,action);
				return void 0;
			}
		};

	}

}

module.exports = Store;