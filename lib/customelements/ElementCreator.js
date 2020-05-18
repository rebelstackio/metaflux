(() => {
	const _elements = [
		'H1',
		'H2',
		'H3',
		'H4',
		'H5',
		'H6',
		'Div',
		'Span',
		'Ol',
		'Ul',
		'Li',
		'Table',
		'Thead',
		'Tbody',
		'Tfoot',
		'Tr',
		'Td',
		'Th',
		'Form',
		'Label',
		'Input',
		'TextArea',
		'Button',
		'Img',
		'Picture',
		'Source',
		'Select',
		'Option',
		'P',
		'A',
		'Section',
		'Video',
	];
	const _exports = {};
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
				el.setAttributes(propVal);
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
		if (content instanceof HTMLElement) {
			el.appendChild(content)
		} else if (typeof content === 'function') {
			_addConetent(content(), el);
		} else if (content instanceof Array) {
			el.append(...content);
		} else if (content.content && content.events) {
			_handleStoreEvents(content.events);
			_addConetent(content.content, el);
		} else {
			el.innerHTML += content
		}
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
	/**
	 * Private util handle multiple store evenets
	 * @param {*} events Events object
	 */
	function _handleStoreEvents(events) {
		if (!global.storage){
			throw new TypeError('CustomElements.handleStoreEvents: storage is not defined, this must be defined <global | window>.storage level')
		}
		Object.keys(events).forEach(ev => {
			global.storage.on(ev, events[ev]);
		});
	}
	/**
	 * Map the elements to their respective functions
	 */
	_elements.forEach(elName => {
		_exports[elName] = function(props, content) {
			props = _validateProps(props, content);
			return HTMLElementCreator(elName.toLowerCase(), props)
		}
	});

	module.exports = Object.assign(
		{},
		{
			HTMLElementCreator,
		},
		_exports
	)
})()
