import 'normalize.css';
import './../styles/index.scss';

// Смена темы
document.querySelector('.todo__theme').addEventListener('click', e => {
	document.body.classList.toggle('dark');
	if (document.body.classList.contains('dark')) {
		document.querySelector('.todo__theme > img').src =
			'./src/images/icon-sun.svg';
	} else {
		document.querySelector('.todo__theme > img').src =
			'./src/images/icon-moon.svg';
	}
});

const input = document.querySelector('.todo__field > .todo__entry');
const addButton = document.querySelector('.todo__add');
const list = document.querySelector('.todo__list');
let checkedElem = document.getElementsByClassName('checked');

// Добавление ячейки
input.addEventListener('keydown', e => {
	if (e.key === 'Enter') {
		e.target.value !== '' ? addItem(e.target.value) : null;
	}
});

addButton.addEventListener('click', e => {
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
}

// Удаление ячейки
list.addEventListener('click', e => {
	if (e.target.closest('.todo__item-delete')) {
		e.target.closest('.todo__item').remove();
	} else if (
		e.target.matches('.todo__item-check input[type="checkbox"]')
	) {
		const todoItem = e.target.closest('.todo__item');
		e.stopPropagation();
		if (!todoItem.classList.contains('checked')) {
			if (checkedElem.length > 0) {
				todoItem.style.order = checkedElem.length + 1;
			} else if (checkedElem.length === 0) {
				todoItem.style.order = 1;
			}
		} else if (todoItem.classList.contains('checked')) {
			todoItem.style.order = '';
		}
		todoItem.classList.toggle('checked');
	}
});

document
	.querySelector('.todo__items-clear')
	.addEventListener('click', e => {
		list.querySelectorAll('.todo__item').forEach(item => {
			item.remove();
		});
	});
