import colors from './data/colors.json';
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
const changeColor = () => {
	const dialog = document.createElement('dialog');
	dialog.setAttribute('id', 'dialog');
	const dialogContent = document.createElement('div');
	dialogContent.setAttribute('id', 'dialogContent');
	//de nuevo el indice
	colors.forEach((color, index) => {
		const colorElm = document.createElement('div');
		colorElm.classList.add('colorElm');
		colorElm.setAttribute('id', `colorElm${index}`);
		colorElm.style.backgroundColor = color;

		colorElm.addEventListener('click', () => {
			this.note.backColor = colors[index];
			this.update();
			Storage.save(notes);
		});
		dialogContent.appendChild(colorElm);
	});
	dialog.appendChild(dialogContent);
	document.body.appendChild(dialog);
	dialog.showModal();
};
export { renderElements, changeColor };
