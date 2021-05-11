document.addEventListener('DOMContentLoaded', () => {
	setActiveHeaderTab();
});

/**
 * On load set active tab to the top menu
 */
function setActiveHeaderTab() {
	const { pathname } = document.location;
	const tabName = getTabName(pathname);
	changeHeaderActiveTab(tabName);
	changeMobileMenu(tabName);
}
/**
 * toggle active class to the header elementes
 * @param {String} name tab name
 */
function changeHeaderActiveTab(name) {
	const newActive = document.querySelector(`.main-header div[name="${name}"]`);
	const prevActive = document.querySelector('.main-header .active');
	prevActive.classList.remove('active');
	newActive.classList.add('active');
}

function changeMobileMenu(name) {
	const newActive = document.querySelector(`.mobile-nav *[name="${name}"]`);
	const prevActive = document.querySelector('.mobile-nav .selected');
	if (newActive.classList.contains('sub-menu')) {
		newActive.classList.add('expanded');
		const content = newActive.querySelector('.sub-menu-content');
		content.classList.remove('hidden');
		getSumenuActive(content.children);
	}
	prevActive.classList.remove('selected');
	newActive.classList.add('selected');
}

function getSumenuActive(childs) {
	const { pathname } = document.location;
	for(let i=0; i < childs.length; i++) {
		let child = childs[i];
		let name = child.name;
		name = name.replace(/\//g, '\\/')
		let isActive = pathname.match(new RegExp(`(${name})`, 'g')) !== null;
		if (isActive) {
			child.classList.add('active');
		}
	}
}