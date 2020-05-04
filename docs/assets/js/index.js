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