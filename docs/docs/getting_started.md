---
layout: docs
title: Getting Started
permalink: /docs/getting-started/
tabindex: 1
---
{::options parse_block_html="true" /}

<div class="doc-block">
## Installation:
```bash
~$ npm install @rebelstack-io/metaflux
```
</div>
<div class="doc-block">
## Usage:
### Step 1 (Require/Import).
```javascript
const { Store } = require('@rebelstack-io/metaflux');
```
*Or when import is enabled:*
```javascript
import { Store } from '@rebelstack-io/metaflux';
```
*Or with CDN*

```html
<script src="https://cdn.jsdelivr.net/npm/@rebelstack-io/metaflux@2/dist/metaflux.min.js"></script>
```
<div class="break-line"></div>

### Step 2 (Initialize).


```javascript
const storage = new Store(
	{ Counter: 1 },
	{
	 INCREMENT: (action, state) => {
		state.Counter = state.Counter + 1;
		return {newState: state};
	}
});
```
<div class="break-line"></div>

### Step 3 (Dispatch actions).

*The Store object is also an event emitter, when an action is dispatched an event is emitted.*

```javascript
storage.dispatch({
	type: 'INCREMENT'
});
```
<div class="break-line"></div>

### Step 4 (Listen for changes).

```javascript
storage.on('INCREMENT', action => {
	// GET THE UPDATED VALUE
	const newValue = storage.getState().Counter;
	// UPDATE DOM.
});
```
</div>
<div class="doc-text-wrapper">

### MetaComponents

*MetaComponents are WebComponents that support Metaflux's storage.*
</div>
<div class="doc-block">

## Usage

```javascript
import { MetaComponent, Div, H1 } from '@rebelstack-io/metaflux';

class MyComponent extends MetaComponent {
	render () {
		// See Custom Elements
		this.content = Div().Div().H1({}, 'Hello World').baseNode();
		return this.content;
	}
}

window.customElements.define('my-component', MyComponent);
```
</div>
<div class="doc-block">

## Bind MetaComponents to Metaflux Storage

*Althought Storage is an event emitter by itself it is more organize to use Metaflux's handleStoreEvents method to bind itself to the actions dispatched.*

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
		const content = Div().Button({
				onclick: () => {
					// Dispatch Increment action when button is clicked.
					this.storage.dispatch({type: 'INCREMENT'});
				}
		}, 'Increase').baseNode()
		// Here we get the initial state of Counter and assign it to the counter element.
		this.text = content.Div({}, this.storage.getState().Main.value)
		return content;
	}
	// Handle Metaflux Storage events
	handleStoreEvents () {
		return {
			'INCREMENT': action => {
				// When INCREMENT action is dispatch we update the counter element
				this.text.textContent = this.storage.getState().Counter;
			}
		}
	}
}

window.customElements.define('my-component', MyComponent);
```
</div>
<div class="doc-block">

## Using MetaComponent inside a MetaContainer

*A MetaContainer is a webcomponent with a render method that works like the MetaComponent's render method but instead you're not supposed to bind it to the storage, it doesn't have a handleStoreEvents method in order to avoid that, you can however put MetaComponents inside it. This object was tought like a not complex element where developers can import stylesheets and organize their layout.*

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

*The MetaContainer is also a good place to declare global variables like the storage.*
</div>
<div class="doc-text-wrapper">

### Custom Elements
*The custom elements are instances of HTMLElement which means that we have all the prototypes such as querySelector or innerText. In addition, we created an easy way to use it as you been doing in vanilla Javascript but with a better element constructor.*
</div>

<div class="doc-block">

## Chaining
*Every Custom element can be chain with other elements or it self, Notice that it will return the last element in the chain. We can also obtain the parent of the chain using baseNode method*

```js
const span = Div().Div().Span(false, 'Hello world');
const base = span.baseNode();
```

*the constant span:*

```html
<span>Hello world</span>
```

*the constant base:*

```html
<div>
	<div>
		<span>Hello world</span>
	</div>
</div>
```
</div>

<div class="doc-block">

## Parameters
*All the custom elements recive 2 non-mandatory parameters (props, content).*
- props is an object where you can define basic propperties such as onclick, className, id ... you name it, if exits the property for HTMLElement can be set in that object, also we have custom props as classList which you can pass an array of classes.
- content can be a String, HTMLElement, Array containing any of the previous, function returnin any of the previous and Object

### Examples:
```js
Div({
	id: 'element',
	classList: ['class-1', 'class-2'],
	onclick: (ev) => {
		// Logic
	},
	...
})
```

- content

```js
// as a string
Select(false, `
	<option>option Default</option>
	<option>option 1</option>
	<option>option 2</option>
`);

// as HTMLElement
Select(false, Option(false, 'default'));

// as an array
Select(false, [
	Option({},'option Default'),
	Option({onclick: () => { console.log('option 1') }},'option 1'),
	Option({onclick: () => { console.log('option 2') }},'option 2')
])

// as a function
Select(false, () => {
	return ['1', '2'].map(_n => {
		return Option(
			{ onclick: () => { console.log(`option ${_n}`) } },
			`option ${_n}`
		)
	})
})
```
</div>

<div class="doc-block">

## Handle Store events
*with the custom element there are two ways to listen to store events:*

- onStoreEvent method (notice that all HTMLElement this method in their prototype):

```js
Div()
.Button({attributes: { disabled: '' }}, 'click me')
.onStoreEvenet('LOADING_FINISH', (state, element) => {
	// element is the Button who is listening the event
	element.removeAttribute('disabled')
})
```

- events property in the Object content (notice that here you can listen to as many events as you want)

```js
Div({}, {
	content: Div().Div().H1({}, 'Hello world').baseNode(),
	events: {
		'EVENT_NAME': (action, state) => { /* logic */ },
		'OTHER_EVENT': (action, state) => { /* logic */ }
	}
});
```
</div>

<div class="doc-block">

## More Examples

```js
Form({}, () => (
    [
        Label({}, 'Email'),
        Input({type:'email', placeholder:'example@dom'}),
        Label({}, 'Password'),
        Input({type:'password', placeholder:'Password'}),
        Button({id: 'btn-from'}, 'Login')
    ]
));
```

```html
<form>
  <label>Email</label>
  <input type="email" placeholder="example@dom">
  <label>Password</label>
  <input type="password" placeholder="Password">
  <button id="btn-from">Login</button>
</form>
```

```js
A({href: '#metaflux'}, 'Click me');
```

```html
<a href="#metaflux">Click me</a>
```
</div>

<div class="doc-block">

## Complete List of elements helpers: 
- 'H1',
- 'H2',
- 'H3',
- 'H4',
- 'H5',
- 'H6',
- 'Div',
- 'Span',
- 'Ol',
- 'Ul',
- 'Li',
- 'Table',
- 'Thead',
- 'Tbody',
- 'Tfoot',
- 'Tr',
- 'Td',
- 'Th',
- 'Form',
- 'Label',
- 'Input',
- 'TextArea',
- 'Button',
- 'Img',
- 'Picture',
- 'Source',
- 'Select',
- 'Option',
- 'P',
- 'A',
- 'Section',
- 'Video'
</div>

<div class="doc-block">

## Can i create a custom tag with the custom elements?
- Yes you can, all the custom elements are a child of one central function HTMLElementCreator which receive the tagName and their props, the content of the element if wants to define needs to be as a property of the props parameter:


```js
const myElement = HTMLElementCreator('my-element', {
	content: <'String' | Element() | function () {} | Array()>
})

```
</div>
