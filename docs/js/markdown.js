document.addEventListener('DOMContentLoaded', () => {
	const box = document.querySelector('.main-content');
	getMD(box.getAttribute('md-path'), (err, text) => {
		if (err) throw err;
		writeMD(text, box);
		addStyledCodeExamples()
	})
})
/**
 * Get Markdown text
 * @param {String} path path to md file
 * @param {CallableFunction} callback pass 2 arg (error, text)
 */
function getMD(path, callback) {
	fetch(path)
	.then(resp => {
		if(resp.status === 200) {
			resp.text().then(text => {
				callback(false, text);
			})
		}else {
			callback(new Error('No file found'))
		}
	}).catch(err => {
		callback(err)
	})
}

function writeMD(text, box) {
	let converter = new showdown.Converter();
	const html = converter.makeHtml(text);
	box.innerHTML = `<div class="md-content">${html}</div>`;
}

function addStyledCodeExamples() {
	if(typeof hljs !== 'undefined') {
		hljs.initHighlighting();
		hljs.configure()
	}
}