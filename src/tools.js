const createElements = () => {
	const elm = ['textarea', 'textarea'];
	const ids = ['textarea1', 'textarea2'];
	let elements = [];
	for (let i = 0; i < 2; i++) {
		elements[i] = document.createElement(elm[i]);
		elements[i].setAttribute('id', ids[i]);
		elements[i].classList.add('textarea');
	}
	return elements;
};
const renderElements = () => {
	const container = document.createElement('div');
	container.setAttribute('id', 'container');
	const elements = createElements();
	elements.forEach((tab) => {
		container.appendChild(tab);
	});
	document.body.appendChild(container);
};

function createSVGElement(id, href, className) {
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('id', id);
	svg.classList.add(className);
	const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
	use.setAttribute('href', href);
	svg.appendChild(use);
	return svg;
}
function createEditableDiv(id) {
	const div = document.createElement('div');
	div.setAttribute('role', 'textbox');
	div.setAttribute('contenteditable', 'true');
	div.spellcheck = 'true';
	div.setAttribute('id', id);

	return div;
}
export { renderElements, createSVGElement, createEditableDiv };
