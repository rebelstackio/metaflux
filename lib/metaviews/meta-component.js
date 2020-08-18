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
}

module.exports = {
	MetaComponent
};
