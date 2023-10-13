import * as placeholderList from './data/placeholderList';
import * as emptyList from './data/emptyList';
import * as tools from './tools';

class ToDoList {
	constructor(title, description, category, dueDate, priority, notes) {
		this.title = title;
		this.description = description;
		this.category = category;
		this.dueDate = dueDate;
		this.priority = priority;
		this.notes = notes;
	}
	save() {
		localStorage.setItem(this.title);
	}
	edit() {
		//this.title = x
	}
	// delete() {
	// 	//listContainer.innerHTML = ''
	// }
	// check() {
	// 	//archive && gray
	// }
}

tools.renderElements();

// const updateH1TexContent = () => {
// 	const storedList = localStorage.getItem('newList');
// 	if (storedList) {
// 		const parsedList = JSON.parse(storedList);
// 		titleH1.textContent = parsedList.name;
// 	}
// 	newList.title = titleInput.value;
// 	titleH1.textContent = titleInput.value;
// 	const newListString = JSON.stringify(newList);
// 	localStorage.setItem('newList', newListString);
// 	};

// 	const initiliazePage = () => {
// 	const storedList = localStorage.getItem('newList');
// 	if (storedList) {
// 		const parsedList = JSON.parse(storedList);
// 		titleH1.textContent = parsedList.title;
// 	}
// 	};

// 	titleInput.addEventListener('input', updateH1TexContent);

// 	window.addEventListener('load', () => {
// 	initiliazePage();
// 	});

const saved = localStorage.getItem('newList');
let list = saved ? JSON.parse(saved) : emptyList;
const updateUI = () => {
	titleH1.textContent = list.title;
	descH1.textContent = list.description;
};
updateUI();
const updateList = (updates) => {
	list = { ...list, ...updates };
	localStorage.setItem('newList', JSON.stringify(list));
};

titleInput.addEventListener('input', () => {
	updateList({ title: titleInput.value });
	updateUI();
});
descInput.addEventListener('input', () => {
	updateList({ description: descInput.value });
	updateUI();
});
