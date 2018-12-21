import './store.js';
import './components/my-component.js';
import './components/my-shadow-component.js';

const myMetaComponent = document.createElement('my-component');
const myMetaShadowComponent = document.createElement('my-shadow-component');
const blocks = document.body.querySelectorAll('.block');

// Add MetaComponent and MetaShadowComponent to DOM
document.body.querySelector('#metacomponent-testing-block .content').appendChild(myMetaComponent);
document.body.querySelector('#metashadowcomponent-testing-block .content').appendChild(myMetaShadowComponent);

// Loop blocks
blocks.forEach(block => {
	// Loop dispatch buttons inside the block
	const dispatchButtons = block.querySelectorAll('.dispatch');
	dispatchButtons.forEach(btn => {
		// Get the button attributes
		const status = btn.getAttribute('state');
		const content = btn.textContent;
		const component = btn.parentElement.getAttribute('component');
		// Change state with dispatch after click
		btn.addEventListener('click', () => {
			// Remove "selected" class for all dispatch buttons then add it to the one just clicked
			dispatchButtons.forEach(item => {
				item.classList.remove('selected');
			});
			btn.classList.add('selected');
			// Dispatch action
			storage.dispatch({
				type: `ALTER_${component.toUpperCase()}_STATUS`,
				content,
				status
			});
		});
	});
});
