class MyComponent extends MetaShadowComponent {
	/**
	 * Pass storage
	 */
	constructor () {
		super(window.storage);
		this.styles = [
			'css/general.css'
		];
	}
	/**
	 * Render Component
	 */
	render () {
		const content = document.createElement('div');
		const title = document.createElement('div');
		title.className = 'title';
		title.textContent = 'Bond to Store.MetaShadowComponent';
		content.appendChild(title);
		this.status = document.createElement('div');
		this.status.className = 'status';
		content.appendChild(this.status);
		this.listenToStoreProvitional();
		return content;
	}
	/**
	 * Add listeners, effects, events
	 */
	addListeners () {
		this.storage = this.storage ? this.storage : window.storage;
		const { status, content } = this.storage.getState().MetaShadowComponent;
		this.status.setAttribute('state', status);
		this.status.textContent = content;
	}
	/**
	 * temp function to get meta shadow compenent working
	 */
	listenToStoreProvitional() {
		window.storage.on('ALTER_METASHADOWCOMPONENT_STATUS', (action, state) => {
			const { status, content } = state;
			this.status.setAttribute('state', status);
			this.status.textContent = content;
		})
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
