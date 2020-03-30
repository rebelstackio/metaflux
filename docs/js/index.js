document.addEventListener('DOMContentLoaded', () => {
	headerListeners();
});


function headerListeners() {
	const items = document.querySelectorAll('#content > .main-header .items > *:not(.active)');
	items.forEach(item => {
		item.addEventListener('click', () => {
			const route = item.getAttribute('href');
			document.location.pathname = route;
		});
	});
}