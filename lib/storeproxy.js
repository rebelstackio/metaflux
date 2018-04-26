/* lib/storeproxy.js */
use strict;

const Jsonpath = require("jsonpath");

class StoreProxy {
	constructor ( stateobj ) {
		if (new.target === StoreProxy) {
			throw new TypeError("Cannot construct abstract StoreProxy instance directly");
		}
		this.stateobj = stateobj || {};
		this.paths = {};
	}

	update ( payload, next ) {
		throw new SyntaxError("method not implemented"); // must be over-ridden by inheriting class
	}
 
	emitter () {
		set: function (obj, prop) {
			// TODO: emit event ( prevState, currState, prevVal, currVal ) then set obj property
		}
	}
	
	register ( jsonpath, handler ) {
		let ref = JsonPath.query(this.stateobj,jsonpath);
		if ( !this.paths[jsonpath] ) {
			this.paths[jsonpath] = new StoreProxyObject(ref, emitter);	
		}
		// register to listen to emitter event on this.paths[jsonpath]
	}
}
