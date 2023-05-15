import 'normalize.css';
import './../styles/index.scss';
import morph from './declination';

// Переменные
const input = document.querySelector('.todo__field > .todo__entry');
const addButton = document.querySelector('.todo__add');
const list = document.querySelector('.todo__list');
let checkedElem = document.getElementsByClassName('checked');
let howShow = 'all';

// Смена темы
document.querySelector('.todo__theme').addEventListener('click', e => {
	if (document.body.classList.contains('dark')) {
		changeTheme('light');
		localStorage.setItem('theme', 'light');
	} else {
		changeTheme('dark');
		localStorage.setItem('theme', 'dark');
	}
});

function changeTheme(how) {
	if (how === 'dark') {
		document.querySelector('.todo__theme > img').src =
			'./src/images/icon-sun.svg';
		document.body.classList.add('dark');
	} else if (how === 'light') {
		document.querySelector('.todo__theme > img').src =
			'./src/images/icon-moon.svg';
		document.body.classList.remove('dark');
	}
}

// Добавление ячейки
input.addEventListener('keydown', e => {
	if (e.key === 'Enter') {
		e.target.value !== '' && addItem(e.target.value);
	}
});

addButton.addEventListener('click', () => {
	input.value !== '' && addItem(input.value);
});

function addItem(text) {
	const addedDate = Date.now();
	list.insertAdjacentHTML(
		'beforeend',
		`
		<li class="todo__item">
			<div class="todo__item-check">
				<input
					type="checkbox"
					aria-label="Отметить задачу как выполненную"
					id="${addedDate}"
				/>
				<label for="${addedDate}"></label>
			</div>

			<p class="todo__item-text">
				${text}
			</p>
			<button
				class="todo__item-delete"
				aria-label="Удалить задачу"
			>
				<span></span>
				<span></span>
			</button>
		</li>
		`
	);

	input.value = '';
	setState();
	showItems(howShow);
	addLS({ id: addedDate, text: text, checked: false });
}

// Удаление ячейки
list.addEventListener('click', e => {
	if (e.target.closest('.todo__item-delete')) {
		if (document.querySelectorAll('.todo__item').length <= 1) {
			howShow = 'all';
			showItems('all');
		}

		e.target.closest('.todo__item').remove();
		setState();
		delLS(+e.target.closest('.todo__item').querySelector('input').id);
	} // Чекнутость
	else if (e.target.matches('.todo__item-check input[type="checkbox"]')) {
		const todoItem = e.target.closest('.todo__item');

		e.stopPropagation();

		if (!todoItem.classList.contains('checked')) {
			if (checkedElem.length > 0) {
				todoItem.style.order = checkedElem.length + 1;
			} else if (checkedElem.length === 0) {
				todoItem.style.order = 1;
			}
			checkLS(todoItem.querySelector('input').id, true);
		} else if (todoItem.classList.contains('checked')) {
			todoItem.style.order = '';
			checkLS(todoItem.querySelector('input').id, false);
		}

		todoItem.classList.toggle('checked');
		showItems(howShow);
	}
});

// Полное удаление
document
	.querySelector('.todo__items-clear')
	.addEventListener('click', () => {
		list.querySelectorAll('.todo__item').forEach(item => {
			item.remove();
			setState();
		});
		howShow = 'all';
		showItems('all');
		clearLS();
	});

// Загрузка
document.addEventListener('DOMContentLoaded', () => {
	if (checkedElem.length > 0) {
		Array.from(checkedElem).forEach(item => {
			item.querySelector('.todo__item-check > input').checked = true;
		});
	}
});

// Статус
setState();
function setState() {
	let countElem = document.querySelector('.todo__items-count');
	if (list.children.length === 0) {
		countElem.textContent = 'Пусто';
		document.querySelector('.todo__items-footer').classList.add('empty');
	} else if (list.children.length >= 1) {
		document
			.querySelector('.todo__items-footer')
			.classList.remove('empty');
		countElem.textContent = `${list.childElementCount} ${morph(
			list.childElementCount
		)}`;
	}
}

// Отображение
document
	.querySelector('.todo__items-status')
	.addEventListener('click', e => {
		if (e.target.closest('.all')) {
			showItems('all');
			howShow = 'all';
		} else if (e.target.closest('.active')) {
			showItems('active');
			howShow = 'active';
		} else if (e.target.closest('.completed')) {
			showItems('completed');
			howShow = 'completed';
		}
	});

function showItems(how = 'all') {
	const items = document.querySelectorAll('.todo__item');
	if (how === 'all') {
		document
			.querySelectorAll('.todo__items-status button')
			.forEach(item => item.classList.remove('selected'));
		document.querySelector(`.${how}`).classList.add('selected');
		items.forEach(item => {
			if (item.classList.contains('checked')) {
				item.style.display = 'flex';
			} else {
				item.style.display = 'flex';
			}
		});
	} else if (how === 'active') {
		document
			.querySelectorAll('.todo__items-status button')
			.forEach(item => item.classList.remove('selected'));
		document.querySelector(`.${how}`).classList.add('selected');
		items.forEach(item => {
			if (item.classList.contains('checked')) {
				item.style.display = 'none';
			} else {
				item.style.display = 'flex';
			}
		});
	} else if (how === 'completed') {
		document
			.querySelectorAll('.todo__items-status button')
			.forEach(item => item.classList.remove('selected'));
		document.querySelector(`.${how}`).classList.add('selected');
		items.forEach(item => {
			if (item.classList.contains('checked')) {
				item.style.display = 'flex';
			} else {
				item.style.display = 'none';
			}
		});
	}
}

// localStorage
if (!localStorage.getItem('tasks')) {
	localStorage.setItem('tasks', JSON.stringify([]));
}

function addLS(obj) {
	let arr = JSON.parse(localStorage.getItem('tasks'));
	arr.push(obj);
	localStorage.setItem('tasks', JSON.stringify(arr));
}

function delLS(id) {
	let arr = JSON.parse(localStorage.getItem('tasks'));
	arr = arr.filter(item => item.id !== id);
	localStorage.setItem('tasks', JSON.stringify(arr));
}

function clearLS() {
	let arr = JSON.stringify([]);
	localStorage.setItem('tasks', arr);
}

function checkLS(id, check) {
	let arr = JSON.parse(localStorage.getItem('tasks'));
	arr[arr.findIndex(item => item.id == id)].checked = check;
	localStorage.setItem('tasks', JSON.stringify(arr));
}

// getLocalStorage
getItemsLS();
function getItemsLS() {
	if (localStorage.getItem('theme')) {
		console.log(localStorage.getItem('theme'));
		changeTheme(localStorage.getItem('theme'));
	}
	let arr = JSON.parse(localStorage.getItem('tasks'));
	arr.forEach(item => {
		list.insertAdjacentHTML(
			'beforeend',
			`
		<li class="todo__item ${item.checked && 'checked'}">
			<div class="todo__item-check">
				<input
					type="checkbox"
					aria-label="Отметить задачу как выполненную"
					id="${item.id}"	
				/>
				<label for="${item.id}"></label>
			</div>

			<p class="todo__item-text">
				${item.text}
			</p>
			<button
				class="todo__item-delete"
				aria-label="Удалить задачу"
			>
				<span></span>
				<span></span>
			</button>
		</li>
		`
		);
		Array.from(checkedElem).forEach(item => {
			if (checkedElem.length > 0) {
				item.style.order = checkedElem.length + 1;
			} else if (checkedElem.length === 0) {
				item.style.order = 1;
			}
		});
	});
	setState();
	showItems(howShow);
}
