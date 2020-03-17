class MyComponent extends MetaComponent {
	/**
	 * Pass storage
	 */
	constructor () {
		super(window.storage);
	}
	/**
	 * Render Component
	 */
	render () {
		const content = document.createElement('div');
		const title = document.createElement('div');
		title.className = 'title';
		title.textContent = 'Bond to Store.MetaComponent';
		content.appendChild(title);
		this.status = document.createElement('div');
		this.status.className = 'status';
		content.appendChild(this.status);
		return content;
	}
	/**
	 * Add listeners, effects, events
	 */
	addListeners () {
		const { status, content } = this.storage.getState().MetaComponent;
		this.status.setAttribute('state', status);
		this.status.textContent = content;
	}
	/**
	 * Listen for dispatched actions
	 */
	handleStoreEvents () {
		return {
			'ALTER_METACOMPONENT_STATUS': (action, state) => {
				const { status, content } = state;
				this.status.setAttribute('state', status);
				this.status.textContent = content;
			}
		};
	}
}
window.customElements.define('my-component', MyComponent);
