import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { v4 } from "uuid";
import {
	currentTodoItemState,
	todoListFilterState,
	todoListState,
} from "../../atoms/todoAtom";
import {
	filteredTodoListState,
	todoListStatsState,
} from "../../selectors/todoSelector";
import AppName from "../AppName/AppName";
import ButtonLink from "../ButtonLink/ButtonLink";
import CardTitle from "../CardTitle/CardTitle";
import ContentBox from "../ContentBox/ContentBox";
import TodoListFilters from "../TodoListFilters/TodoListFilters";
import styles from "./TodoList.module.css";

const TodoList = () => {
	const setFilter = useSetRecoilState(todoListFilterState);
	const todoList = useRecoilValue(filteredTodoListState);
	const [currentSelectTodoItem, setCurrentSelectTodoItem] =
		useRecoilState(currentTodoItemState);
	const setTodoList = useSetRecoilState(todoListState);
	const addNewTodoItem = () => {
		setFilter("Show All");
		const newItem = {
			id: v4(),
			title: "New Todo Title",
			content: "<p>Write something about this ...</p>",
			isComplete: false,
		};
		setTodoList((currentList) => [
			{
				...newItem,
			},
			...currentList,
		]);
		setCurrentSelectTodoItem(newItem);
	};
	const { total, totalCompleted, totalUncompleted } =
		useRecoilValue(todoListStatsState);
	return (
		<div className={styles.container}>
			<AppName />
			<hr style={{ width: "100%" }} />
			<TodoListFilters />
			<div className={styles.status}>
				Total: {total}, Completed: {totalCompleted}, Uncompleted:{" "}
				{totalUncompleted}
			</div>
			<div className={styles.wrapper}>
				<div className={styles.titleSection}>
					<div className={styles.titleHeader} onClick={addNewTodoItem}>
						<ButtonLink>Add new</ButtonLink>
					</div>
					<div>
						{todoList.length ? (
							todoList.map((todoItem) => (
								<CardTitle
									key={todoItem.id}
									item={todoItem}
									active={
										currentSelectTodoItem
											? currentSelectTodoItem.id === todoItem.id
												? "active"
												: ""
											: ""
									}
								/>
							))
						) : (
							<div className={styles.nothing}>Oops! There's nothing here!</div>
						)}
					</div>
				</div>
				<div className={styles.divider}></div>
				<div className={styles.contentSection}>
					<ContentBox />
				</div>
			</div>
		</div>
	);
};

export default TodoList;
