---
layout: docs
title: FAQ
permalink: /docs/faq/
tabindex: 4
---
# Frequently asked questions

- Does Edge support the use of Metaflux?
	- Yes, Every feature of Metaflux is compatible with edge see [customElements](https://caniuse.com/#search=customElements), which is the base for the components
- How do i add styles to a MetaShadowComponent?
	- it's very easy you need to add it in the constructor like so:
	```js
	class myShadowElement extends MetaShadowComponent {
		constructor() {
			this.styles = [
			'./rel/path/style.css'
			];
		}
	}
	```
- Can i use Metaflux without using import?
	- Yes, you can use the CDN to get the Metaflux Library.
- Can i Listen an envent without handling it in the store?
	- The Metaflux store is made with eventEmitter, and you can listent the envent even if doesn't have a handler see [API](../api/)
