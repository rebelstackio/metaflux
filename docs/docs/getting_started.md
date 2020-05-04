---
layout: docs
title: Getting Started
permalink: /docs/getting-started/
tabindex: 1
---

## Getting Started

### Installation:

```bash
npm install @rebelstack-io/metaflux
```

### Usage:
#### Step 1 (Require/Import).

```javascript
const { Store } = require('@rebelstack-io/metaflux');
```

#### Or when import is enabled:


```javascript
import { Store } from '@rebelstack-io/metaflux';
```

#### Step 2 (Initialize).


```javascript
const storage = new Store(
	{Counter: 1},
	{INCREMENT: (action, state) => {
		state.Counter = state.Counter + 1;
		return {newState: state};
	}
});
```

#### Step 3 (Dispatch actions).

The Store object is also an event emitter, when an action is dispatched an event is emitted.

```javascript
storage.dispatch({
	type: 'INCREMENT'
});
```

#### Step 4 (Listen for changes).

```javascript
storage.on('INCREMENT', action => {
	// GET THE UPDATED VALUE
	const newValue = storage.getState().Counter;
	// UPDATE DOM.
});
```

### MetaComponents

MetaComponents are WebComponents that support Metaflux's storage.

### Usage

```javascript
import { MetaComponent } from '@rebelstack-io/metaflux';

class MyComponent extends MetaComponent {
	render () {
		this.content = document.createElement('div');
		this.content.innerHtml = `
			<div>
				<h1>Hello World</h1>
			</div>
		`;
		return this.content;
	}
}

window.customElements.define('my-component', MyComponent);
```

### Bind MetaComponents to Metaflux Storage

Althought Storage is an event emitter by itself it is more organize to use Metaflux's handleStoreEvents method to bind itself to the actions dispatched.

```javascript
import { MetaComponent, Store } from '@rebelstack-io/metaflux';

const storage = new Store(
	{Counter: 1},
	{INCREMENT: (action, state) => {
		state.Counter = state.Counter + 1;
		return {newState: state};
	}
});

class MyComponent extends MetaComponent {
	// Pass storage to MetaComponent parent
	constructor () {
		super(storage);
	}
	render () {
		const content = document.createElement('div');
		const incrementButton = document.createElement('button');
		content.appendChild(incrementButton);
		// Dispatch Increment action when button is clicked.
		this.incrementButton.addEventListener('click', () => {
			this.storage.dispatch({
				type: 'INCREMENT'
			});
		});
		this.counter = document.createElement('div');
		// Here we get the initial state of Counter and assign it to the counter element.
		this.counter.textContent = this.storage.getState().Counter;
		content.appendChild(this.counter);
		return content;
	}
	// Handle Metaflux Storage events
	handleStoreEvents () {
		return {
			'INCREMENT': action => {
				// When INCREMENT action is dispatch we update the counter element
				this.counter.textContent = this.storage.getState().Counter;
			}
		}
	}
}

window.customElements.define('my-component', MyComponent);
```

### Using MetaComponent inside a MetaContainer

A MetaContainer is a webcomponent with a render method that works like the MetaComponent's render method but instead you're not supposed to bind it to the storage, it doesn't have a handleStoreEvents method in order to avoid that, you can however put MetaComponents inside it.

This object was tought like a not complex element where developers can import stylesheets and organize their layout.

```javascript
import { MetaContainer } from '@rebelstack-io/metaflux';
import '../components/my-component'; // Here we import our previously defined MetaComponent.

class MyContainer extends MetaContainer {
	render () {
		return `
			<h2>Simple Counter</h2>
			<my-component></my-component>
		`;
	}
}

window.customElements.define('my-container', MyContainer);
```

The MetaContainer is also a good place to declare global variables like the storage.
