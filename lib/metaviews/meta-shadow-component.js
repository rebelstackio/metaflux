/* eslint-disable no-undef */
class MetaShadowComponent extends window.HTMLElement {
	/**
	 * Creates instance of MetaShadowComponent
	 * @param {Store=} storage
	 */
	constructor(storage = false) {
		super();
		if (storage) {
			this.storage = storage;
		}
		this.addListeners = this.addListeners.bind(this);
		this.render = this.render.bind(this);
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
		const content = this.render();
		if (typeof content === 'string') {
			this.root.innerHTML += content;
		} else {
			this.root.appendChild(content);
		}
		this.addListeners();
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
	MetaShadowComponent
};
