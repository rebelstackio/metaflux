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
		this.status =
		Div({}, () => (
			Div({ className: 'title' }, 'Bond to Store.MetaComponent')
		))
		.Div({ className: 'status' })
		return this.status.baseNode();
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
