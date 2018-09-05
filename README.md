

# ![metaflux logo](assets/metaflux-logo.svg "metaflux logo") metaflux
Simplifying the flux/redux pattern for vanilla (es6) javascript

Metaflux is a lightweight library that provides a store to your application.

## Getting Started

### Installation:

`npm install @rebelstack-io/metaflux`

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

