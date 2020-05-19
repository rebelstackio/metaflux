class MyComponent extends MetaShadowComponent {
	/**
	 * Pass storage
	 */
	constructor () {
		super(window.storage);
		this.styles = [
			'./general.css'
		];
	}
	/**
	 * Render Component
	 */
	render () {
		this.status =
		Div({}, () => (
			Div({ className: 'title' }, 'Bond to Store.MetaShadowComponent')
		))
		.Div({ className: 'status' })
		return this.status.baseNode();
	}
	/**
	 * Add listeners, effects, events
	 */
	addListeners () {
		const { status, content } = this.storage.getState().MetaShadowComponent;
		this.status.setAttribute('state', status);
		this.status.textContent = content;
	}
	/**
	 * Listen for dispatched actions
	 */
	handleStoreEvents () {
		return {
			'ALTER_METASHADOWCOMPONENT_STATUS': (action, state) => {
				const { status, content } = state;
				this.status.setAttribute('state', status);
				this.status.textContent = content;
			}
		};
	}
}
window.customElements.define('my-shadow-component', MyComponent);
