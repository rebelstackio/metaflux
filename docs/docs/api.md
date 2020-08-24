---
layout: docs
title: Api Reference
permalink: /docs/api/
tabindex: 2
---

# Api Reference

## Store
### Constructor
- the store constructor needs 2 parameters: iniState and handlers:
```js
const iniState = { Counter: 1 };
const handlers = {
	INCREMENT: (action, state) => {
		state.Counter = state.Counter + 1;
		return {newState: state};
	}
}
// it's advaiceable to define the storage as global 
globlal.storage = new Store(
	iniState,
	handlers
});
// NOTE: if you are in a static env use window intead of global
```

### Dispatch event
```js
global.storage.dispatch({ type: 'EVENT_NAME', ... })
```
### Listening to an event
- With the method on we can listen to an event in any place of out app.
```js
	global.storage.on('EVENT_NAME', (action, state) => {
	// logic
})
```

## MetaCompoents
### render
- render is a method that you should override, is mandatory to have it in your class component
- should return a String or HTMLElement
```js
class MyComponent extends MetaCompoenent {
	constructor() {
		// is mandatory to call the super on construct
		super();
	}
	render() {
		return '<h1>Hello world</h1>'
	}
}
```

### addListeners
- This is a non-mandatory function, is a helper function where is the best practice to listen to DOM Evenets.

```js
.
.
.
render() {
	return '<h1>Hello world</h1>'
}

addListeners() {
	this.querySelector('h1').onclick = (ev) => {
		// logic here
	}
}
```

### Getters and Setters
- As you might assume we can use standard getter and setters from javascript classes.

```js
class MyComponent extends MetaCompoenent {
	constructor() {
		// is mandatory to call the super on construct
		super();
		this.text = 'hello world';
	}
	set text(t) {
		this.text = t;
		this.querySelector('h1').innerText = this.text
	}
	get text() {
		return this.text
	}
	render() {
			return `<h1>${this.text}</h1>`
	}
}
```

### handleStoreEvents
- this is a mandatory function only if the storage is past to the super in the constructor.

```js
class MyComponent extends MetaCompoenent {
	constructor() {
		// is mandatory to call the super on construct
		super(global.storage);
		this.text = 'hello world';
	}
	render() {
			return `<h1>${this.text}</h1>`
	}
	
	handleStoreEvents() {
		return {
			'CHANGE_TEXT': (action, state) => {
				this.querySelector('h1').innerText = state.text;
			}
		}
	}
```

### ComponentDidFail
For the sake of debugging ```ComponentDidFail``` exists in the MetaComponent and MetaShadowComponent, it can be overwritten or called.
```js
class MyComponent extends MetaComponent {
	constructor(customValue) {
		if(!customValue) {
			this.ComponentDidFail(new TypeError('customValue is needed on construct'))
		}
	}
	render() {
		...
	}
	ComponentDidFail(reason) {
	   // Handle you errors here
	  // If not overwritten by default will throw reason
	}
}
```
This is useful for handling errors from parent classes. 
