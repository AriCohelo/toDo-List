import exampleData from './data/exampleData.json';
import emptyData from './data/emptyData.json';
let notes = null;
class Storage {
	static save(notes) {
		const notesCopy = notes.map((note) => {
			return { title: note.title, description: note.description };
		});
		localStorage.setItem('notes', JSON.stringify(notesCopy));
	}
	static load() {
		const storedNotes = JSON.parse(localStorage.getItem('notes'));
		return storedNotes;
	}
}

class Note {
	constructor(object) {
		this.title = object.title;
		this.description = object.description;
		this.ui = new NoteUI(this, document.body);
		this.backColor = object.backColor;
	}
}

// update(updates) {
// 	this.title = updates.title;
// 	this.description = updates.description;
// 	this.ui.update();
// }

class NoteUI {
	constructor(note, parent) {
		this.note = note;
		this.parent = parent;
		// this.index = notes.length;
		this.render();
	}

	render() {
		const divBase = document.createElement('div');
		const titleElm = document.createElement('textarea');
		this.titleElm = titleElm;
		const descElm = document.createElement('textarea');
		this.descElm = descElm;
		this.parent.appendChild(divBase);
		divBase.appendChild(titleElm);
		divBase.appendChild(descElm);
		const colorInput = document.createElement('input');
		colorInput.type = 'color';
		// this.note.backColor = 'green';
		divBase.appendChild(colorInput);

		this.titleElm.addEventListener('input', () => {
			this.note.title = this.titleElm.value;
			// notes[this.index] = updatedNote;
			this.update();
			Storage.save(notes);

			console.log(notes);
		});
		this.descElm.addEventListener('input', () => {
			this.note.description = this.descElm.value;
			// notes[this.index] = updatedNote;
			this.update();
			Storage.save(notes);

			console.log(notes);
		});
		colorInput.addEventListener('change', () => {
			this.note.backColor = colorInput.value;
			this.update();
		});

		this.update();
	}

	update() {
		this.titleElm.value = this.note.title;
		this.descElm.value = this.note.description;
		this.titleElm.style.backgroundColor = this.note.backColor;

		// const updatedNote = {
		// 	title: this.titleElm.value,
		// 	description: this.descElm.value,
		// };
		// notes[this.index] = updatedNote;
	}
}
notes = (Storage.load() || []).map((n) => {
	return new Note(n);
});

console.log(notes);

const addNoteButton = document.createElement('button');
document.body.appendChild(addNoteButton);

addNoteButton.addEventListener('click', () => {
	const newNote = new Note(exampleData);
	notes.push(newNote);
	console.log(newNote);
	console.log(notes);
});

// window.n1 = new Note(exampleData);

// this.titleElm.value = Storage.load()
// ? Storage.load()[this.index - 1].title
// : this.note.title;
// this.descElm.value = Storage.load()
// ? Storage.load()[this.index - 1].description
// : this.note.description;
