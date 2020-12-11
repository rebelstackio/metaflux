/* eslint-disable no-undef */
class MetaBase extends window.HTMLElement {
	/* eslint-disable no-useless-constructor */
	constructor(storage = false) {
		super();
		if (!this.render) {
			this.ComponentDidFail(new TypeError('render method required on MetaComponents'));
		} else {
			// BIND COMMON METHODS FOR ALL INHERITED CLASSES
			this.render = this.render.bind(this);
		}
		if (storage) {
			this.storage = storage;
		}
		if (this.addListeners) {
			this.addListeners = this.addListeners.bind(this);
		}
	}

	_appendContent() {
		try {
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
		} catch (error) {
			this.ComponentDidFail(error)
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
	/**
	 * This functions returns the object that "mapStoreEvents" maps
	 * it is supposed to be overwritten by the child object
	 */
	handleStoreEvents() {
		this.ComponentDidFail(new TypeError('MetaComponent.handleStoreEvents: This function expects to be overwritten by child object, otherwise do not pass "storage" object as argument to constructor.'))
	}
	/**
	 * Life cycle class function to handle organized way errors, it can be overwritten,
	 * if not overwritten thow the error
	 * @param {Error} error
	 */
	ComponentDidFail(error) {
		throw error
	}
	/**
	 * customElement disconected callback
	 */
	disconnectedCallback() {
		const events = this.storage ? this.handleStoreEvents() : {};
		for (const eventType in events) {
			// remove listeners on disconected
			/* eslint-disable no-prototype-builtins */
			if (events.hasOwnProperty(eventType)) {
				this.storage.removeListener(eventType, events[eventType]);
			}
		}
	}
}

module.exports = {
	MetaBase
};
