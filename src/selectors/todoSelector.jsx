import { selector } from "recoil";
import { todoListFilterState, todoListState } from "../atoms/todoAtom";

export const filteredTodoListState = selector({
	key: "filteredTodoList",
	get: ({ get }) => {
		const filter = get(todoListFilterState);
		const list = get(todoListState);

		switch (filter) {
			case "Show Completed":
				return list.filter((listItem) => listItem.isComplete);
			case "Show Uncompleted":
				return list.filter((listItem) => !listItem.isComplete);
			default:
				return list;
		}
	},
});

export const todoListStatsState = selector({
	key: "todoListStats",
	get: ({ get }) => {
		const todoList = get(todoListState);
		const filterdTodoList = get(filteredTodoListState);
		const total = todoList.length;
		const totalCompleted = todoList.filter((item) => item.isComplete).length;
		const totalUncompleted = total - totalCompleted;
		const lastedTodoItem = filterdTodoList[0];
		return {
			total,
			totalUncompleted,
			totalCompleted,
			lastedTodoItem,
		};
	},
});
