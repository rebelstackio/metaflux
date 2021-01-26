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

		'SVG',
			'Element',
			/* 'A', //duplicated// */
			'Animation',
			'Animate',
			'AnimateMotion',
			'AnimateTransform',
			'Circle',
			'ClipPath',
			'ComponentTransferFunction',
			'Cursor',
			'Defs',
			'Desc',
			'Ellipse',
			'FEBlend',
			'FEColorMatrix',
			'FEComponentTransfer',
			'FEComposite',
			'FEConvolveMatrix',
			'FEDiffuseLighting',
			'FEDisplacementMap',
			'FEDistantLight',
			'FEDropShadow',
			'FEFlood',
			'FEFuncA',
			'FEFuncB',
			'FEFuncG',
			'FEFuncR',
			'FEGaussianBlur',
			'FEImage',
			'FEMerge',
			'FEMergeNode',
			'FEMorphology',
			'FEOffset',
			'FEPointLight',
			'FESpecularLighting',
			'FESpotLight',
			'FETile',
			'FETurbulence',
			'Filter',
			'FilterPrimitiveStandardAtt',
			'ForeignObject',
			'G',
			'Geometry',
			'Gradient',
			'Graphics',
			'Image',
			'LinearGradient',
			'Line',
			'Mask',
			'Metadata',
			'MPath',
			'Path',
			'Pattern',
			'Polyline',
			'Polygon',
			'RadialGradient',
			'Rect',
			'Script',
			'Set',
			'Stop',
			'Style',
			'Switch',
			'Symbol',
			'TextContent',
			'Text',
			'TextPath',
			'TextPositioning',
			'Title',
			'TSpan',
			'Use',
			'View',

	];
	const _exports = {};
	/**
	 * Create a element with properties
	 * @param {String} name Tag Name
	 * @param {Object} props Propeperties
	 */
	function HTMLElementCreator(name, props = {}) {
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
		props = Object.assign({}, props, {content: content ? content : ''});
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
	/**
	 * Define element and create the heplers functions
	 * @param {*} name
	 * @param {*} classObject
	 */
	function DefineElement(name, classObject) {
		window.customElements.define(name, classObject);
		createPrototype(name);
	}

	/**
	 *
	 * @param {*} name
	 */
	function createPrototype(name) {
		const capName = getFormatedName(name);
		HTMLElement.prototype[capName] = function (props,content) {
			const nProps = _validateProps(props,content)
			const el = HTMLElementCreator(name, nProps);
			this.appendChild(el);
			return el;
		}
		window[capName] = function (props,content) {
			const nProps = _validateProps(props,content)
			const el = HTMLElementCreator(name, nProps);
			return el;
		}
	}
	/**
	 * Capitalize the tag name (custom-element = CustomElement)
	 * @param {String} name TagName
	 */
	function getFormatedName(name) {
		const reg = /(-|\b[a-z](?!-))/g
		return name.replace(reg,function (c) {
			if(c === '-') return '';
			return c.toUpperCase();
		});
	}


	module.exports = Object.assign(
		{},
		{
			HTMLElementCreator,
			DefineElement
		},
		_exports
	)
})()
