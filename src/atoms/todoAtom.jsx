import { atom } from "recoil";

const getTodoListFromLocalStorage = (key) => {
	const savedValue = localStorage.getItem(key);
	return savedValue != null ? JSON.parse(savedValue) : [];
};

const localStorageEffect =
	(key) =>
	({ setSelf, onSet }) => {
		const savedValue = localStorage.getItem(key);
		if (savedValue != null) {
			setSelf(JSON.parse(savedValue));
		}

		onSet((newValue, _, isReset) => {
			isReset
				? localStorage.removeItem(key)
				: localStorage.setItem(key, JSON.stringify(newValue));
		});
	};

export const todoListState = atom({
	key: "todoList",
	default: getTodoListFromLocalStorage("todoList"),
	effects: [localStorageEffect("todoList")],
});

export const todoListFilterState = atom({
	key: "todoListFilter",
	default: "Show All",
});

export const currentTodoItemState = atom({
	key: "currentTodoItem",
	default: null,
});
