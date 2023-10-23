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
export { renderElements };
