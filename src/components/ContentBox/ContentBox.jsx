import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentTodoItemState, todoListState } from "../../atoms/todoAtom";
import { todoListStatsState } from "../../selectors/todoSelector";
import styles from "./ContentBox.module.css";

const ContentBox = () => {
	let [item, setItem] = useRecoilState(currentTodoItemState);
	const { lastedTodoItem } = useRecoilValue(todoListStatsState);
	const [todoList, setTodoList] = useRecoilState(todoListState);
	const editorRef = useRef(null);
	useEffect(() => {
		if (!item) setItem(lastedTodoItem);
	}, [lastedTodoItem, item, setItem]);
	const handleTitleChange = (event) => {
		const newItem = { ...item, title: event.target.value };
		setItem(newItem);
		setTodoList((currentList) =>
			currentList.map((listItem) =>
				listItem.id === newItem.id ? { ...newItem } : { ...listItem }
			)
		);
	};
	const handleEditorChange = () => {
		const newItem = { ...item, content: editorRef.current.getContent() };
		setItem(newItem);
		setTodoList((currentList) =>
			currentList.map((listItem) =>
				listItem.id === newItem.id ? { ...newItem } : { ...listItem }
			)
		);
	};
	return (
		<div className={styles.wrapper}>
			{item && todoList.length && (
				<>
					<input
						autoComplete="off"
						autoFocus
						className={styles.inputTitle}
						name="title"
						type="text"
						value={item.title}
						onChange={handleTitleChange}
					/>
					<div className={styles.editorWrapper}>
						<Editor
							apiKey={process.env.REACT_APP_TINYMCE_KEY}
							onInit={(evt, editor) => (editorRef.current = editor)}
							value={item.content}
							onEditorChange={handleEditorChange}
							init={{
								menubar: false,
								inline: true,
								plugins: [
									"autolink",
									"codesample",
									"link",
									"lists",
									"powerpaste",
									"table",
									"quickbars",
									"help",
								],
								max_height: 60,
								preview_styles: false,
								toolbar: false,
								quickbars_insert_toolbar: "quicktable image media codesample",
								quickbars_selection_toolbar:
									"bold italic underline | blocks | blockquote quicklink",
								contextmenu:
									"undo redo | inserttable | cell row column deletetable | help",
								powerpaste_word_import: "clean",
								powerpaste_html_import: "clean",
							}}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default ContentBox;
