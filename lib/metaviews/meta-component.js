const { MetaBase } = require('./meta-base');

class MetaComponent extends MetaBase {
	/**
	 * Creates instance of MetaComponent
	 * @param {Store=} storage
	 */
	constructor(storage = false) {
		super(storage);
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
			this._mapStoreEvents();
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
}

module.exports = {
	MetaComponent
};
