(() => {
	/**
	 * Create proptotype
	 */
	HTMLElement.prototype.Div = function (props, content) {
		const el = Div(props, content)
		this.appendChild(el);
		return el;
	}
	/**
	 * Create a element with properties
	 * @param {String} name Tag Name
	 * @param {Object} props Propeperties
	 */
	function HTMLElementCreator(name, props) {
		const el = document.createElement(name);
		Object.keys(props).forEach(prop => {
			const propVal = props[prop];
			if (prop === 'attributes') {
				Object.keys(propVal).forEach(attNAme => {
					el.setAttribute(attNAme, propVal[attNAme])
				});
			} else if (prop === 'classList'){
				el.classList.add(...propVal);
			} else if(prop === 'content') {
				if (typeof propVal === 'string') {
					el.innerHTML = propVal;
				} else {
					el.appendChild(propVal)
				}
			} else {
				el[prop] = propVal;
			}
		})
		return el;
	}
	/**
	 * Create a div and return it
	 * @param {Object} props Element Properties
	 * @param {String | HTMLElement} content
	 * @returns {HTMLElement}
	 */
	function Div(props, content) {
		props = props ? props : {}
		props.content = content ? content : '';
		return HTMLElementCreator('div', props);
	}

	module.exports = { HTMLElementCreator, Div }
})()
