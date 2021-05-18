---
layout: docs
title: Overview
permalink: /docs/overview/
tabindex: 0
---
{::options parse_block_html="true" /}
<div class="doc-text-wrapper">
# What is Metaflux?

Metaflux is an open-source library providing tools that allow easy adoption of the flux (observable) design pattern in your code. The [Flux](https://facebook.github.io/flux/) design pattern simplifies complex UI, eases debugging and unit-testing. If you need to unit-test your UI state or have multiple inter-relations between state and UI elements in your application, then Flux can help you. Additionally, Metaflux includes simple and elegant element constructors for quickly designing even complex HTML web components with flux support already baked in.
</div>
<div class="doc-block">
## Element Construction and chaining:
```javascript
// <h1>My title</h1>
var t1 = H1('My title'); 
// <div><div><a href="#">Link</a></div></div>
var chained = Div().Div().A({href:'#'},'Link').baseNode();
```
</div>
<div class="doc-block">
## Create a web component bound to storage
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
		// Pass storage to MetaComponent parent
		super(storage); 
	}
	render () {
		const content = Div().Button({
			onclick: () => {
			 // Dispatch Increment action when button is clicked.
			 this.storage.dispatch({type: 'INCREMENT'});
			}
		}, 'Increase').baseNode()
		// get initial state of Counter and assign to element.
		this.text = content.Div({}, this.storage.getState().Main.value)
		return content;
	}
	handleStoreEvents () {
		return {
			'INCREMENT': action => {
				// update the element's textContent with current state
				this.text.textContent = this.storage.getState().Counter;
			}
		}
	}
}

window.customElements.define('my-component', MyComponent);
```
</div>
