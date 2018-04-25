/* lib/storeproxy.js */
use strict;

const Jsonpath = require("jsonpath");

class StoreProxy ( stateobj ) {
	this.paths = {};
	constructor ( stateobj ) {
		this.stateobj = stateobj;
	}
	
	emitter () {
		set: function (obj, prop) {
			// TODO: emit event ( prevState, currState, prevVal, currVal ) then set obj property
		}
	}
	
	register ( jsonpath, func ) {
		let ref = JsonPath.query(this.stateobj,jsonpath);
		if ( !this.paths[jsonpath] ) {
			this.paths[jsonpath] = new StoreProxyObject(ref, emitter);	
		}
		// register to listen to emitter event on this.paths[jsonpath]
	}
}
