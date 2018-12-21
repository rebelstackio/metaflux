// TODO: find way to make WebComponents available for jsdom
import { Store, MetaComponent } from '../lib/index';

class MyComponent extends MetaComponent {
	render () {
		return `This is my component`;
	}
}
window.customElements.define('my-component', MyComponent);

const myElement = document.createElement('my-component');
document.getElementById('root').appendChild(myElement);

function sum(a, b) {
	return a + b;
}
test('adds 1 + 2 to equal 3', () => {
	expect(sum(1, 2)).toBe(3);
});
