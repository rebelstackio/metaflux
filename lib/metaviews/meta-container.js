/* eslint-disable no-undef */
class MetaContainer extends window.HTMLElement {
	constructor() {
		super();

		if (!this.render) {
			throw new TypeError('render method is require for MetaContainers');
		}
	}

	connectedCallback() {
		this.appendChild(this.render());
	}
}

module.exports = {
	MetaContainer
};
