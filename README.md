

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

#### Step 2 (Initialize).


```javascript
const storage = new Store(
	{Counter: 1},
	{INCREMENT: (action, state) => {
		return {newState: state.Counter + 1};
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
