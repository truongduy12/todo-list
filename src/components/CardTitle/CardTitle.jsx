import React from "react";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { currentTodoItemState, todoListState } from "../../atoms/todoAtom";
import {
	filteredTodoListState,
	todoListStatsState,
} from "../../selectors/todoSelector";
import styles from "./CardTitle.module.css";

const CardTitle = ({ item, active }) => {
	const setTodoList = useSetRecoilState(todoListState);
	const filterTodoList = useRecoilValue(filteredTodoListState);
	const [currentTodoItem, setCurrentTodoItem] =
		useRecoilState(currentTodoItemState);
	const { lastedTodoItem } = useRecoilValue(todoListStatsState);
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
	const updateCurrentTodoItem = (event, item) => {
		event.stopPropagation();
		setCurrentTodoItem(item);
	};
	const deleteTodoItem = (event, item) => {
		event.stopPropagation();
		setTodoList((currentTodoList) =>
			currentTodoList.filter((todoItem) => todoItem.id !== item.id)
		);
		if (item.id === currentTodoItem.id) {
			setCurrentTodoItem(lastedTodoItem);
		}
		if (item.id === filterTodoList[0].id) {
			setCurrentTodoItem(filterTodoList[1]);
		}
	};
	return (
		<div
			className={`${styles.wrapper} ${active ? styles.active : ""}`}
			onClick={(event) => updateCurrentTodoItem(event, item)}
		>
			<div className={styles.input}>
				<input
					type="checkbox"
					checked={item.isComplete}
					onChange={toggleItemCompletion}
					onClick={(event) => event.stopPropagation()}
				/>
			</div>
			<div className={styles.title}>{item.title}</div>
			<div
				className={styles.delete}
				onClick={(event) => deleteTodoItem(event, item)}
			>
				&#10005;
			</div>
		</div>
	);
};

export default CardTitle;
