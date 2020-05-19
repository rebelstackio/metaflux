const { MetaComponent } = require('./metaviews/meta-component');
const { MetaContainer } = require('./metaviews/meta-container');
const { MetaShadowComponent } = require('./metaviews/meta-shadow-component');
const Store = require('./store');
const customElements = require('./customelements/ElementCreator');
require('./customelements');

module.exports = Object.assign(
	{},
	{
		MetaComponent,
		MetaContainer,
		MetaShadowComponent,
		Store
	},
	customElements
);
