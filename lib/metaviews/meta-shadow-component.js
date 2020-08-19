const { MetaBase } = require('./meta-base')
/* eslint-disable no-undef */
class MetaShadowComponent extends MetaBase {
	/**
	 * Creates instance of MetaShadowComponent
	 * @param {Store=} storage
	 */
	constructor(storage = false) {
		super(storage);
	}

	connectedCallback() {
		this.root = this.shadowRoot || this.attachShadow({ mode: 'open' });
		this.root.innerHTML = `
		<style>
			${this.styles.map(style => `
			@import url("${style}");
			`).join('')}
		</style>
		`;
		this._appendContent();
		// EXECUTE LISTENER ONLY IF THEY EXISTS
		if(this.addListeners) {
			this.addListeners();
		}
		// Run mapStoreEvents if store exists
		if (this.storage) {
			this._mapStoreEvents();
		}
	}

}

module.exports = {
	MetaShadowComponent
};
