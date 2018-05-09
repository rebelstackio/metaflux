/* lib/store.js */
'use strict';

const EventEmitter = require('eventemitter3');
const path = require('jsonpath');

class Store extends EventEmitter {

	static clone ( src, /* INTERNAL */ _visited, _copiesVisited) {
		if( src === null || typeof(src) !== 'object' ) { return src; }
		if( src instanceof Date ) { return new Date(src.getTime()); }
		if( src instanceof RegExp ) { return new RegExp(src); }
		if( src.nodeType && typeof src.cloneNode == 'function' ) { return src.cloneNode(true); }
		if ( _visited === undefined) { _visited = []; _copiesVisited = []; }
		let i, len = _visited.length;
		for (i = 0; i < len; i++) { if (src === _visited[i]) { return _copiesVisited[i]; } }
		if (Object.prototype.toString.call(src) == '[object Array]') {
			let ret = src.slice();
			_visited.push(src);
			_copiesVisited.push(ret);
			let i = ret.length;
			while (i--) { ret[i] = Store.clone(ret[i], _visited, _copiesVisited); }
			return ret;
		}
		let proto = (Object.getPrototypeOf ? Object.getPrototypeOf(src): src.__proto__);
		if (!proto) { proto = src.constructor.prototype; }
		let dest = Object.create(proto);
		_visited.push(src);
		_copiesVisited.push(dest);
		for (let key in src) { dest[key] = Store.clone(src[key], _visited, _copiesVisited); }
		return dest;
	}

	constructor(initialState, handlers) {
		// TODO: validate initialState and handlers (throw on exception)

		super();

		let _handlers = handlers || {};
		let _state = Store.clone(initialState) || {};
		let _stateclone = Store.clone(_state);

		this.getState = function (jsonpath) {
			if (jsonpath) {
				return path.query(Store.clone(_stateclone), jsonpath);
			} else {
				return Store.clone(_stateclone);
			}
		};

		this.getHandlers = function getHandlers () {
			return _handlers;
		};

		this.addHandler = function addHandler ( action, func ) {
			_handlers[action] = func;
		};

		this.dispatch = function 	dispatch ( action ) {
			if ( _handlers[action.type] ) {
				let trans = this._handlers[action.type](action, Store.clone(_state));
				if (trans.newState) {
					_state = Store.clone(trans.newState);
				}
				return this.emit(action.type,trans,action);
			} else {
				this.emit(action.type, action);
				return void 0;
			}
		};

	}

}

module.exports = Store;
