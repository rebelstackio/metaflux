---
layout: docs
title: Examples | Tutorials
permalink: /docs/examples/
tabindex: 3
---
{::options parse_block_html="true" /}

<div class="doc-text-wrapper">
## Sorting table component
*Let's start by defining our storage, initial state and our handlers*
</div>

<div class="doc-block">

## Example
```js
// Define the initial state
const iniState = {
	sortBy: 'name',
	dir: 1,
	tableData: [
	{
		name: 'Jhon Doe',
		Score: Math.floor(Math.random() * (500 - 100) + 100),
		'Hours played': Math.floor(Math.random() * (100 - 10) + 10)
	},
	{
		name: 'Aaron Smith',
		Score: Math.floor(Math.random() * (500 - 100) + 100),
		'Hours played': Math.floor(Math.random() * (100 - 10) + 10)
	},
	{
		name: 'Jessica Sort',
		Score: Math.floor(Math.random() * (500 - 100) + 100),
		'Hours played': Math.floor(Math.random() * (100 - 10) + 10)
	}
	]
};
// handle the events, in out case the change sort
const handlers = {
	'CHANGE_SORT': (action, state) => {
	// if is the same column revert the sorting
	if (action.sortBy === state.sortBy) {
		state.dir *= -1; 
	} else {
		state.dir = 1;
		state.sortBy = action.sortBy;
	}
	// sort table by column
	state.tableData.sort((a, b) => {
		if(a[state.sortBy] > b[state.sortBy]) {
			return -1 * state.dir
		} else {
			return state.dir
		}
		return 0;
	});
	return { newState: state }
	}
}

window.storage = new Store(iniState, handlers)
```

*As you can see above the handler job is to re-sort the tableDate by column name.*
</div>

<div class="doc-block">

## Let's create our MetaComponent 

```js
// create the web component
class SortTable extends MetaComponent {
constructor() {
	// bind storage to this component
	super(window.storage);
}
// get the columns names for the table
getTableHeader() {
	// get the keys of the first element to map the table head names
	const hName = Object.keys(this.storage.getState().tableData[0])
	return Tr({}, () => {
		return hName.map(_th => {
			return Th({
				onclick: () => {
				// on click dispatch event change the sorting by this column
				this.storage.dispatch({type: 'CHANGE_SORT', sortBy: _th})
			}}, _th)
		})
	})
}
// get table content from the storage
getTableBody() {
	const { tableData } = this.storage.getState();
	return tableData.map(tr => {
		return Tr({}, () => {
			return Object.entries(tr).map(_ent => {
				return Td({}, _ent[1])
			})
		})
	})
}

render() {
	const _TH = this.getTableHeader();
	const _TB = this.getTableBody();
	return Table({}, () => ([_TH, ..._TB ])); 
}
// change the content of the table on sort Action
handleStoreEvents() {
	return {
	'CHANGE_SORT': () => {
		const table = this.querySelector('table');
		table.innerHTML = '';
		table.append(this.getTableHeader(), ...this.getTableBody())
	}
	}
}
}
// define the custom element with a name
window.customElements.define('sort-table', SortTable);
```
</div>

<div class="doc-block">

## now we can create our custom element as any HTMLElement

```js
// get container element
const _cont = document.querySelector('#container');
// create new table
const _table = HTMLElementCreator('sort-table');
// append it to the container
_cont.appendChild(_table);
```

*See this example running on [codepen](https://codepen.io/osszzyy/full/bGENojQ)*
</div>