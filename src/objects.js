import placeholderData from './data/placeholderData.json';
import colors from './data/colors.json';
import * as render from './render';
import * as tools from './tools';

let notes = [];

const noteCreatorCont = document.createElement('div');
noteCreatorCont.setAttribute('id', 'noteCreatorCont');
const noteCreatorTitle = document.createElement('input');
noteCreatorTitle.placeholder = 'Title';
const noteCreatorDesc = document.createElement('input');
noteCreatorDesc.placeholder = 'Take a note...';
noteCreatorCont.appendChild(noteCreatorTitle);
noteCreatorCont.appendChild(noteCreatorDesc);

const palleteSVG = document.createElementNS(
	'http://www.w3.org/2000/svg',
	'svg'
);
palleteSVG.setAttribute('id', 'palleteSVG');
const useElm = document.createElementNS('http://www.w3.org/2000/svg', 'use');
useElm.setAttribute('href', '#pallete');
palleteSVG.appendChild(useElm);
noteCreatorCont.appendChild(palleteSVG);
document.body.appendChild(noteCreatorCont);

class Note {
	constructor(index, title, description, backColor) {
		this.index = index;
		this.title = title || '';
		this.description = description || '';
		this.backColor = backColor || '#607D8B';
		this.ui = new NoteUI(this, document.body);
	}
}

class Storage {
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

class NoteUI {
	constructor(note, parent) {
		this.note = note;
		this.parent = parent;
		this.render();
	}

	render() {
		const baseDiv = document.createElement('div');
		baseDiv.setAttribute('id', 'baseDiv');
		const titleElm = document.createElement('input');
		titleElm.placeholder = this.note.title || placeholderData.title;
		const descElm = document.createElement('input');
		descElm.placeholder = this.note.placeholder || placeholderData.description;
		const deleteBtn = document.createElement('button');
		baseDiv.appendChild(titleElm);
		baseDiv.appendChild(descElm);
		baseDiv.appendChild(deleteBtn);
		this.parent.appendChild(baseDiv);
		this.titleElm = titleElm;
		this.descElm = descElm;
		this.baseDiv = baseDiv;

		const palleteSVG = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'svg'
		);
		palleteSVG.setAttribute('id', 'palleteSVG');
		const useElm = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'use'
		);
		useElm.setAttribute('href', '#pallete');
		palleteSVG.appendChild(useElm);
		baseDiv.appendChild(palleteSVG);

		this.titleElm.addEventListener('input', () => {
			this.note.title = this.titleElm.value;
			this.update();
			Storage.save(notes);
		});
		this.descElm.addEventListener('input', () => {
			this.note.description = this.descElm.value;
			this.update();
			Storage.save(notes);
		});
		palleteSVG.addEventListener('click', () => {
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
		});

		deleteBtn.addEventListener('click', () => {
			console.log(this.note.index);
			this.delete();
			this.update();
			Storage.save(notes);
		});
		this.update();
	}

	update() {
		this.titleElm.value = this.note.title;
		this.descElm.value = this.note.description;
		this.baseDiv.style.backgroundColor = this.note.backColor;
	}
	delete() {
		document.body.removeChild(this.baseDiv);
		notes.splice(this.note.index, 1);
	}
}
notes = (Storage.load() || []).map((n, index) => {
	return new Note(index, n.title, n.description, n.backColor);
});
const addNoteButton = document.createElement('button');
document.body.appendChild(addNoteButton);

addNoteButton.addEventListener('click', () => {
	const newNote = new Note(notes.length || 0);
	notes.push(newNote);
	Storage.save(notes);
	console.log(notes);
});
console.log(notes);

// const colorElements = tools.createElement();
// console.log(colorElements);
// colorElements.forEach((elm) => {
// 	document.body.appendChild(elm);
// });
// colorElm1.style.backgroundColor = '#77172E';
