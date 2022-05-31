import React from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "../../atoms/todoAtom";

const TodoItem = ({ item }) => {
	const setTodoList = useSetRecoilState(todoListState);
	const itemId = item.id;

	const toggleItemCompletion = () => {
		setTodoList((currentTodoList) =>
			currentTodoList.map((todoItem) =>
				todoItem.id === itemId
					? { ...todoItem, isComplete: !todoItem.isComplete }
					: { ...todoItem }
			)
		);
	};
	const deleteItem = () => {
		setTodoList((currentTodoList) =>
			currentTodoList.filter((todoItem) => todoItem.id !== itemId)
		);
	};
	return (
		<div>
			<li>
				<span>{item.title}</span>-
				<span dangerouslySetInnerHTML={{ __html: item.content }}></span>
				<input
					type="checkbox"
					checked={item.isComplete}
					onChange={toggleItemCompletion}
				/>
				<button onClick={deleteItem}>X</button>
				<button>Edit</button>
			</li>
		</div>
	);
};

export default TodoItem;
