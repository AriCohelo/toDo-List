const createElements = () => {
	const elm = ['input', 'h1', 'input', 'h1'];
	const ids = ['titleInput', 'titleH1', 'descInput', 'descH1'];
	let elements = [];
	for (let i = 0; i < 4; i++) {
		elements[i] = document.createElement(elm[i]);
		elements[i].setAttribute('id', ids[i]);
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
