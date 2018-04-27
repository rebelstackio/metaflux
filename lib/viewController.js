class ViewController extends HTMLElement {
	constructor() {
		super();
		this.renderer();
	}
	renderer() {
		const root = this.shadowRoot || this.attachShadow({ mode: 'open' });
		this.content = document.createDocumentFragment();
		const style = document.createElement('style');
		style.innerHTML = `
			${this.mapStyles().map(style => `
			@import url("${style}");
			`).join('')}
		`;
		this.content.appendChild(style);
 	   	this.defineLayout();
 		root.appendChild(this.content);
	}
	mapStyles() {
		return [];
	}
	get state() {
		// TODO: return state from store
		return null;
	}
}