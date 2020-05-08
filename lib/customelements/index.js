
(() => {
	const { HTMLElementCreator, Div, Span } = require('./ElementCreator');
	/**
	 * Element Div proptotype
	 */
	HTMLElement.prototype.Div = function (props, content) {
		const el = Div(props, content)
		this.appendChild(el);
		return el;
	}
	/**
	 * Element Span prototype
	 */
	HTMLElement.prototype.Span = function (props, content) {
		const el = Span(props, content);
		this.appendChild(el);
		return el
	}
	/**
	 *
	 */
	HTMLElement.prototype.onStoreEvent = function (event, callback, stName = false) {
		const storageName = stName ? stName : 'storage'
		global[storageName].on(event, () => {
			callback(global[storageName].getState(), this)
		})
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
})()
