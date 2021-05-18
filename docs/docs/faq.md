---
layout: docs
title: FAQ
permalink: /docs/faq/
tabindex: 4
---
{::options parse_block_html="true" /}

<div class="faq-banner">

# Frequently asked questions
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FFFFFF" fill-opacity="1" d="M0,288L120,293.3C240,299,480,309,720,309.3C960,309,1200,299,1320,293.3L1440,288L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
</div>

- ## Does Edge support the use of Metaflux?
	- <div>
	Yes, Every feature of Metaflux is compatible with edge see [customElements](https://caniuse.com/#search=customElements), which is the base for the components
- ## How do i add styles to a MetaShadowComponent?
	- <div>
	it's very easy you need to add it in the constructor like so:
	```js
class myShadowElement extends MetaShadowComponent {
	constructor() {
		this.styles = [
			'./rel/path/style.css'
		];
	}
}
	```
- ## Can i use Metaflux without using import?
	- <div> Yes, you can use the CDN to get the Metaflux Library.
- ## Can i Listen an envent without handling it in the store?
	- <div> The Metaflux store is made with eventEmitter, and you can listent the envent even if doesn't have a handler see [API](../api/)
