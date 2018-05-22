const { MetaBase } = require('./meta-base');

class MetaComponent extends MetaBase {
	constructor() {
		super();
		if ( !this.render ) {
			throw new TypeError('render method required on MetaComponents');
		}

		// BIND COMMON METHODS FOR ALL INHERITED CLASSES
		this.render = this.render.bind(this);
		if (this.addListeners) {
			this.addListeners = this.addListeners.bind(this);
		}
	}

	connectedCallback() {
		// ADD HTML INTO THE WEB COMPONENT
		this._appendContent();
		// EXECUTE LISTENER ONLY IF THEY EXISTS
		if ( this.addListeners ) {
			this.addListeners();
		}
	}
}


module.exports = {
	MetaComponent
};
