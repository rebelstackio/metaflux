/* eslint-disable no-undef */
class MetaBase extends window.HTMLElement {
	/* eslint-disable no-useless-constructor */
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

	_appendContent() {
		const content = this.render();
		if (this.root) {
			if (typeof content === 'string') {
				this.root.innerHTML += content;
			} else {
				this.root.appendChild(content);
			}
		} else if (typeof content === 'string') {
			this.innerHTML += content;
		} else {
			this.appendChild(content);
		}
	}

	/**
	 * Map store events and actions to be taken.
	 */
	_mapStoreEvents() {
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
	MetaBase
};
