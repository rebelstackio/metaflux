/* eslint-disable no-undef */
class MetaShadowComponent extends window.HTMLElement {
	constructor() {
		super();
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
	}
}

module.exports = {
	MetaShadowComponent
};
