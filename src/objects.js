import phData from './data/phData.json';
import colors from './data/colors.json';
import * as render from './render';
import * as tools from './tools';

let notes = [];

const creatorTitleInput = document.createElement('input');
const creatorContentInput = document.createElement('input');
const noteCreator = (onSave) => {
	const creatorContainer = document.createElement('div');
	creatorContainer.setAttribute('id', 'creatorContainer');
	creatorTitleInput.placeholder = phData.title;
	creatorTitleInput.setAttribute('id', 'creatorTitleInput');
	creatorContentInput.placeholder = phData.description;
	creatorContentInput.setAttribute('id', 'creatorContentInput');

	creatorContainer.appendChild(creatorTitleInput);
	creatorContainer.appendChild(creatorContentInput);
	const saveNoteButton = document.createElement('div');
	saveNoteButton.textContent = 'Save';
	saveNoteButton.setAttribute('id', 'saveNoteButton');
	const creatorToolsContainer = document.createElement('div');
	creatorToolsContainer.setAttribute('id', 'creatorToolsContainer');
	creatorToolsContainer.appendChild(saveNoteButton);
	creatorContainer.appendChild(creatorToolsContainer);
	header.appendChild(creatorContainer);
	saveNoteButton.addEventListener('click', onSave);

	// creatorTitleInput.addEventListener('click', () => {
	// 	var dialog = document.createElement('dialog');
	// 	creatorContainer.cloneNode(true);
	// 	dialog.appendChild(creatorContainer);
	// 	document.body.appendChild(dialog);
	// 	dialog.showModal();
	// });
};

export class Note {
	constructor(index, title, description, backColor) {
		this.index = index;
		this.title = title || '';
		this.description = description || '';
		this.backColor = backColor || '#202124';
		this.ui = new NoteUI(this, notesContainer);
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
		const template = document.getElementById('template');
		const clone = document.importNode(template.content, true);
		const baseDiv = clone.querySelector('#baseDiv');
		const noteTitleInput = clone.querySelector('#noteTitleInput');
		const noteContentInput = clone.querySelector('#noteContentInput');
		const noteToolsContainer = clone.querySelector('#noteToolsContainer');
		const palleteSVG = clone.querySelector('#palleteSVG');
		const trashSVG = clone.querySelector('#trashcanSVG');

		noteTitleInput.placeholder = this.note.title || phData.title;
		noteContentInput.placeholder = this.note.placeholder || phData.description;
		this.parent.appendChild(baseDiv);
		this.noteTitleInput = noteTitleInput;
		this.noteContentInput = noteContentInput;
		this.baseDiv = baseDiv;

		this.noteTitleInput.addEventListener('input', () => {
			this.note.title = this.noteTitleInput.value;
			this.update();
			Storage.save(notes);
		});
		this.noteContentInput.addEventListener('input', () => {
			this.note.description = this.noteContentInput.value;
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
		this.noteTitleInput.value = this.note.title;
		this.noteContentInput.value = this.note.description;
		this.baseDiv.style.backgroundColor = this.note.backColor;
	}
	delete() {
		notesContainer.removeChild(this.baseDiv);
		notes.splice(this.note.index, 1);
		for (let i = this.note.index; i < notes.length; i++) {
			notes[i].index = i;
		} //Gold!!
		console.log(notes);
	}
}
const onSave = () => {
	const title = creatorTitleInput.value;
	const content = creatorContentInput.value;
	const newNote = new Note(notes.length || 0, title, content);
	notes.push(newNote);
	Storage.save(notes);
	creatorTitleInput.value = '';
	creatorTitleInput.placeholder = phData.title;
	creatorContentInput.value = '';
	creatorContentInput.placeholder = phData.description;
	console.log(notes);
};
noteCreator(onSave);

notes = (Storage.load() || []).map((n, index) => {
	return new Note(index, n.title, n.description, n.backColor);
});
console.log(notes);
