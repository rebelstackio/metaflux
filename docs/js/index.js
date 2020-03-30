document.addEventListener('DOMContentLoaded', () => {
	headerListeners();
	addGlobalListeners();
});


function headerListeners() {
	const items = document.querySelectorAll('#content > .main-header .items > *:not(.active)');
	items.forEach(item => {
		item.addEventListener('click', () => {
			const route = item.getAttribute('href');
			document.location.pathname = route;
		});
	});
	const discrod = document.querySelector('#content > .main-header .discord');
	const gh = document.querySelector('#content > .main-header .gh');
	discrod.addEventListener('click', () => {
		window.open('https://discord.gg/HmuBCRb', '_blank');
	});
	gh.addEventListener('click', () => {
		window.open('https://github.com/rebelstackio/metaflux', '_blank');
	})
}


function addGlobalListeners() {
	window.storage.on('CHANGE-VIEW', (action) => {
		document.location.pathname = action.data;
	})
}