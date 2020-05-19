
(() => {
	const helppers = require('./ElementCreator');
	/**
	 * Map helper functions to prototype
	 */
	Object.keys(helppers).forEach(helpName => {
		HTMLElement.prototype[helpName] = function (props, content) {
			const el = helppers[helpName](props, content);
			this.appendChild(el);
			return el;
		}
	})
	/**
	 * Listen to a single store event
	 */
	HTMLElement.prototype.onStoreEvent = function (event, callback, stName = false) {
		const storageName = stName ? stName : 'storage'
		if (!global[storageName]){
			throw new TypeError(`CustomElements.onStoreEvent: ${storageName} is not defined, this must be defined <global | window>.${storageName} level`);
		}
		global[storageName].on(event, () => {
			callback(global[storageName].getState(), this);
		});
	}
	/**
	 * Get Base node
	 * Note: this is only intended when the element is created,
	 * but still isn't injected
	 */
	HTMLElement.prototype.baseNode = function () {
		if (this.parentElement === null) return this;
		return this.parentElement.baseNode();
	}
	/**
	 * Set attributes from object
	 */
	HTMLElement.prototype.setAttributes = function (obj) {
		Object.keys(obj).forEach(key => {
			this.setAttribute(key, obj[key]);
		});
	}
})()
