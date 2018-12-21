/* eslint-disable no-undef */
class MetaBase extends window.HTMLElement {
	/* eslint-disable no-useless-constructor */
	constructor() {
		super();
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
}

module.exports = {
	MetaBase
};
