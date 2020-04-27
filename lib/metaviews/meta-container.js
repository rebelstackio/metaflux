const { MetaBase } = require('./meta-base')
/* eslint-disable no-undef */
class MetaContainer extends MetaBase {
	constructor() {
		super();

		if (!this.render) {
			throw new TypeError('render method is require for MetaContainers');
		}
	}

	connectedCallback() {
		// ADD HTML INTO THE WEB COMPONENT
		this._appendContent();
	}
}

module.exports = {
	MetaContainer
};
