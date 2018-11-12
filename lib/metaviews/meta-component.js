const { MetaBase } = require('./meta-base');

class MetaComponent extends MetaBase {
	/**
	 * Creates instance of MetaComponent
	 * @param {Store=} storage
	 */
	constructor(storage = false) {
		super();
		if (!this.render) {
			throw new TypeError('render method required on MetaComponents');
		}
		if (storage) {
			this.storage = storage;
		}
		// BIND COMMON METHODS FOR ALL INHERITED CLASSES
		this.render = this.render.bind(this);
		if (this.addListeners) {
			this.addListeners = this.addListeners.bind(this);
		}
	}

	connectedCallback() {
		// ADD HTML INTO THE WEB COMPONENT
		this._appendContent();
		// EXECUTE LISTENER ONLY IF THEY EXISTS
		if (this.addListeners) {
			this.addListeners();
		}
		// Run mapStoreEvents if store exists
		if (this.storage) {
			this.mapStoreEvents();
		}
	}

	/**
	 * This functions returns the object that "mapStoreEvents" maps
	 * it is supposed to be overwritten by the child object
	 */
	handleStoreEvents() {
		if (this.storage) {
			throw new TypeError('MetaComponent.handleStoreEvents: This function expects to be overwritten by child object, otherwise do not pass "storage" object as argument to constructor.');
		}
	}
	/**
	 * Map store events and actions to be taken.
	 */
	mapStoreEvents() {
		const events = this.handleStoreEvents();
		for (const eventType in events) {
			/* eslint-disable no-prototype-builtins */
			if (events.hasOwnProperty(eventType)) {
				this.storage.on(eventType, events[eventType]);
			}
		}
	}
}

module.exports = {
	MetaComponent
};
