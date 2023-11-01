import placeholderData from './data/placeholderData.json';
import colors from './data/colors.json';
import * as render from './render';
import * as tools from './tools';

let notes = [];

const noteCreator = (onPress) => {
	const noteCreatorCont = document.createElement('div');
	noteCreatorCont.setAttribute('id', 'noteCreatorCont');
	const noteCreatorTitle = document.createElement('input');
	noteCreatorTitle.placeholder = placeholderData.title;
	const noteCreatorDesc = document.createElement('input');
	noteCreatorDesc.placeholder = placeholderData.description;
	noteCreatorCont.appendChild(noteCreatorTitle);
	noteCreatorCont.appendChild(noteCreatorDesc);

	const palleteSVG = tools.createSVGElement('pallete', '#pallete', 'svg');
	noteCreatorCont.appendChild(palleteSVG);
	const addNoteButton = document.createElement('button');
	addNoteButton.textContent = '+';
	noteCreatorCont.appendChild(addNoteButton);
	document.body.appendChild(noteCreatorCont);
	addNoteButton.addEventListener('click', onPress);
};

export class Note {
	constructor(index, title, description, backColor) {
		this.index = index;
		this.title = title || '';
		this.description = description || '';
		this.backColor = backColor || '#607D8B';
		this.ui = new NoteUI(this, document.body);
	}
}

export class Storage {
	static save(notes) {
		const notesCopy = notes.map((note) => {
			//como fuunciona esta linea
			return {
				index: note.index,
				title: note.title,
				description: note.description,
				backColor: note.backColor,
			};
		});
		localStorage.setItem('notes', JSON.stringify(notesCopy));
	}
	static load() {
		const storedNotes = JSON.parse(localStorage.getItem('notes'));
		return storedNotes;
	}
}

export class NoteUI {
	constructor(note, parent) {
		this.note = note;
		this.parent = parent;
		this.render();
	}

	render() {
		const baseDiv = document.createElement('div');
		baseDiv.setAttribute('id', 'baseDiv');
		const titleInput = document.createElement('input');
		titleInput.placeholder = this.note.title || placeholderData.title;
		const contentInput = document.createElement('input');
		contentInput.placeholder =
			this.note.placeholder || placeholderData.description;
		const palleteSVG = tools.createSVGElement('palleteSVG', '#pallete', 'svg');
		const trashSVG = tools.createSVGElement('trashcanSVG', '#trashcan', 'svg');
		baseDiv.appendChild(titleInput);
		baseDiv.appendChild(contentInput);
		baseDiv.appendChild(palleteSVG);
		baseDiv.appendChild(trashSVG);
		this.parent.appendChild(baseDiv);
		this.titleInput = titleInput;
		this.contentInput = contentInput;
		this.baseDiv = baseDiv;

		this.titleInput.addEventListener('input', () => {
			this.note.title = this.titleInput.value;
			this.update();
			Storage.save(notes);
		});
		this.contentInput.addEventListener('input', () => {
			this.note.description = this.contentInput.value;
			this.update();
			Storage.save(notes);
		});
		palleteSVG.addEventListener('click', () => {
			const dialog = document.createElement('dialog');
			dialog.setAttribute('id', 'dialog');
			const dialogContent = document.createElement('div');
			dialogContent.setAttribute('id', 'dialogContent');
			dialog.appendChild(dialogContent);
			document.body.appendChild(dialog);
			dialog.showModal();
			this.changeColor(dialogContent);
		});
		trashSVG.addEventListener('click', () => {
			this.delete();
			this.update();
			Storage.save(notes);
		});
		this.update();
	}
	changeColor(dialogCont) {
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
			dialogCont.appendChild(colorElm);
		});
	}
	update() {
		this.titleInput.value = this.note.title;
		this.contentInput.value = this.note.description;
		this.baseDiv.style.backgroundColor = this.note.backColor;
	}
	delete() {
		document.body.removeChild(this.baseDiv);
		notes.splice(this.note.index, 1);
	}
}
const onPress = () => {
	const newNote = new Note(notes.length || 0);
	notes.push(newNote);
	Storage.save(notes);
	console.log(notes);
};
noteCreator(onPress);
notes = (Storage.load() || []).map((n, index) => {
	return new Note(index, n.title, n.description, n.backColor);
});
console.log(notes);
