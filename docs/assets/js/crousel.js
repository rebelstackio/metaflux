/* Carousel timer in sec */
const INTV_SEC = 10;

const items = document.querySelectorAll('.graphic > .item');
const controllsContainer = document.querySelector('.carousel-controlls');
const right = document.querySelector('.carousel-controlls > .right');
const left = document.querySelector('.carousel-controlls > .left');
const wrapper = document.querySelector('.graphic');
let index = 0;
roll();
let interval = getInterval();
wrapper.addEventListener('mouseleave', () => {
	controllsContainer.style = "z-index: 1";
	if (interval === null) {
		interval = getInterval();
	}
})
/**
 * container
 */
controllsContainer.oncontextmenu = (e) => {
	e.preventDefault();
	clearInterval(interval);
	interval = null;
	controllsContainer.style = "z-index: 0";
}
/*
* carousel go forward
*/
right.onclick = () => { next() }
function next() {
	const nextItem = document.querySelector('.graphic > .item.active+div');
	const prevItem = document.querySelector('.graphic > .item.active');
	if (nextItem !== null) {
		index--;
		prevItem.classList.remove('active');
		nextItem.classList.add('active');
		roll();
	} else {
		console.log('end of the crousel');
	}
}
/*
* Carousel go backward
*/
left.onclick = () => { prev() }
function prev() {
	const prevItem = document.querySelector('.graphic > .item.active');
	const nextItem = prevItem.previousSibling.previousElementSibling;
	if (nextItem !== null && !nextItem.classList.contains('carousel-controlls')) {
		index++;
		prevItem.classList.remove('active');
		nextItem.classList.add('active');
		roll();
	} else {
		console.log('end of the crousel');
	}
}
/*
* switch the position for the carousel
*/
function roll() {
	items.forEach((item, i) => {
		item.style = `transform: translateX(${(i + index) * 101}%);`;
	});
	const currentBullet = document.querySelector('.bullets > *:nth-child('+ ((index * -1) + 1) + ')');
	const prevBullet = document.querySelector('.bullet.active');
	prevBullet.classList.remove('active');
	currentBullet.classList.add('active');
}

function getInterval () {
	return setInterval(() => {
		const i = index * -1;
		document.querySelector('.graphic > .item.active').classList.remove('active');
		if(items.length === (i + 1)) {
			index = 0;
			items[0].classList.add('active')
		} else {
			index--;
			items[i+1].classList.add('active')
		}
		roll()
	}, (INTV_SEC * 1000));
}
