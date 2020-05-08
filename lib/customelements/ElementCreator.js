(() => {
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
				_addConetent(propVal, el);
			} else {
				el[prop] = propVal;
			}
		})
		return el;
	}
	/**
	 * Add content to a element
	 * @param {*} content
	 * @param {HTMLElement} el element to append content
	 */
	function _addConetent(content, el) {
		if (typeof content === 'string') {
			el.innerHTML = content;
		} else if (typeof content === 'function') {
			el.appendChild(content())
		} else {
			el.appendChild(contet)
		}
	}
	/**
	 * Create a div and return it
	 * @param {Object} props Element Properties
	 * @param {String | HTMLElement} content
	 * @returns {HTMLElement}
	 */
	function Div(props, content) {
		props = _validateProps(props, content);
		return HTMLElementCreator('div', props);
	}
	/**
	 * Create a Span and return it
	 * @param {Object} props Element Properties
	 * @param {String | HTMLElement} content
	 * @returns {HTMLElement}
	 */
	function Span(props, content) {
		props = _validateProps(props, content);
		return HTMLElementCreator('span', props);
	}
	/**
	 * Private util function for redundant validation in every component
	 * @param {*} props
	 * @param {*} content
	 */
	function _validateProps(props, content) {
		props = props ? props : {}
		props.content = content ? content : '';
		return props
	}


	module.exports = { HTMLElementCreator, Div, Span }
})()
