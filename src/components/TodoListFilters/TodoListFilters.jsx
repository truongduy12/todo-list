import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
	currentTodoItemState,
	todoListFilterState,
	todoListState,
} from "../../atoms/todoAtom";
import ButtonLink from "../ButtonLink/ButtonLink";
import styles from "./TodoListFilters.module.css";

const TodoListFilters = () => {
	const [filter, setFilter] = useRecoilState(todoListFilterState);
	const setCurrentTodoItem = useSetRecoilState(currentTodoItemState);
	const setTodoList = useSetRecoilState(todoListState);
	const updateFilter = (event) => {
		setFilter(event.target.value);
		setCurrentTodoItem(0);
	};
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisible = () => {
		setIsVisible((currentState) => !currentState);
	};
	const markAllComplete = () => {
		setTodoList((currentList) =>
			currentList.map((item) =>
				item.isComplete === false ? { ...item, isComplete: true } : item
			)
		);
	};
	const markAllUncomplete = () => {
		setTodoList((currentList) =>
			currentList.map((item) =>
				item.isComplete === true ? { ...item, isComplete: false } : item
			)
		);
	};
	const clearAllCompleted = () => {
		setTodoList((currentList) =>
			currentList.filter((item) => item.isComplete !== true)
		);
		setCurrentTodoItem(0);
	};
	const clearAllUncomplete = () => {
		setTodoList((currentList) =>
			currentList.filter((item) => item.isComplete !== false)
		);
		setCurrentTodoItem(0);
	};
	const clearAll = () => {
		setTodoList([]);
		setCurrentTodoItem(0);
	};
	return (
		<section className={styles.wrapper}>
			<div className={styles.menu}>
				<div className={styles.filter}>
					<span className={styles.filterText}>Filters:</span>
					<select
						className={styles.filterSelect}
						value={filter}
						onChange={updateFilter}
					>
						<option value={"Show All"}>Show All</option>
						<option value={"Show Completed"}>Show Completed</option>
						<option value={"Show Uncompleted"}>Show Uncompleted</option>
					</select>
				</div>
				<div className={styles.advanced}>
					<div
						className={`${styles.advancedLinks} ${
							isVisible ? styles.visible : ""
						}`}
					>
						<ButtonLink onClick={markAllUncomplete}>
							Mark All Uncomplete
						</ButtonLink>
						<span>|</span>
						<ButtonLink onClick={markAllComplete}>Mark All Complete</ButtonLink>
						<span>|</span>
						<ButtonLink onClick={clearAllUncomplete}>
							Clear All Uncomplete
						</ButtonLink>
						<span>|</span>
						<ButtonLink onClick={clearAllCompleted}>
							Clear All Completed
						</ButtonLink>
						<span>|</span>
						<ButtonLink onClick={clearAll}>Clear All</ButtonLink>
					</div>
					<div>
						<ButtonLink onClick={toggleVisible}>&#8810; Advanced...</ButtonLink>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TodoListFilters;
