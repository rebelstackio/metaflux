/* lib/action.js */
use strict;

class Action {
	constructor ( store, jsonpath, action, value, event ) {
		this.store = store;
		this.jsonpath = jsonpath;
		this.action = action;
		this.value = value;
		this.event = event;
	}
	
	dispatch ( next ) {
		let payload = { jsonpath:this.jsonpath, action:this.action, value:this.value, event:this.event };
		this.store.update(payload, next);
	}
}
