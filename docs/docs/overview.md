---
layout: docs
title: Overview
permalink: /docs/overview/
tabindex: 0
---
{::options parse_block_html="true" /}

# What is Metaflux?

Metaflux is an open-source library providing tools that allow easy adoption of the flux (observable) design pattern in your code.

The [Flux](https://facebook.github.io/flux/) design pattern simplifies complex UI, eases debugging and unit-testing. If you need to unit-test your UI state or have multiple inter-relations between state and UI elements in your application, then Flux can help you.

Additionally, Metaflux includes simple and elegant element constructors for quickly designing even complex HTML web components with flux support already baked in.
<div class="doc-block">
#### Element Construction and chaining:
```javascript
var t1 = H1('My title'); // <h1>My title</h1>
var chained = Div().Div().A({href:'#'},'Link').baseNode(); // <div><div><a href="#">Link</a></div></div>
```
</div>
Create a web component bound to storage
```javascript
import { MetaComponent, Store } from '@rebelstack-io/metaflux';

const storage = new Store(
	{Counter: 1},
	{
	 INCREMENT: (action, state) => {
		state.Counter = state.Counter + 1;
		return {newState: state};
	}
});

class MyComponent extends MetaComponent {
	constructor () {
		super(storage); // Pass storage to MetaComponent parent
	}
	render () {
		const content = Div().Button({
			onclick: () => {
			 this.storage.dispatch({type: 'INCREMENT'}); // Dispatch Increment action when button is clicked.
			}
		}, 'Increase').baseNode()
		this.text = content.Div({}, this.storage.getState().Main.value) // get initial state of Counter and assign to element.
		return content;
	}
	handleStoreEvents () {
		return {
			'INCREMENT': action => {
				this.text.textContent = this.storage.getState().Counter; // update the element's textContent with current state
			}
		}
	}
}

window.customElements.define('my-component', MyComponent);
```
