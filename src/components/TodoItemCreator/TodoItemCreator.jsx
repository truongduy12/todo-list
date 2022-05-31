import { Editor } from "@tinymce/tinymce-react";
import React, { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { v4 } from "uuid";
import { todoListState } from "../../atoms/todoAtom";

const TodoItemCreator = ({ item }) => {
	const [formValue, setFormValue] = useState(() =>
		item
			? { title: item.title, content: item.content }
			: { title: "", content: "" }
	);
	const setTodoList = useSetRecoilState(todoListState);
	const editorRef = useRef(null);

	const addItem = (event) => {
		event.preventDefault();
		if (formValue.content && formValue.title) {
			item
				? setTodoList((currentTodoList) =>
						currentTodoList.map((todoItem) =>
							todoItem.id === item.id
								? {
										...todoItem,
										title: formValue.title,
										content: formValue.content,
								  }
								: { ...todoItem }
						)
				  )
				: setTodoList((currentTodoList) => [
						{
							id: v4(),
							title: formValue.title,
							content: formValue.content,
							isComplete: false,
						},
						...currentTodoList,
				  ]);
			setFormValue({ title: "", content: "" });
		}
	};
	const getInputValue = (event) => {
		setFormValue({
			...formValue,
			title: event.target.value,
		});
	};

	const getEditorValue = () => {
		setFormValue({
			...formValue,
			content: editorRef.current.getContent(),
		});
	};

	return (
		<form onSubmit={addItem} autoComplete="off">
			<input
				name="title"
				type="text"
				value={formValue.title}
				onChange={getInputValue}
				placeholder="Title"
			/>
			<Editor
				apiKey="dj0brs6vlq4eig54zp56klerojyb77fdjxdat8qha6e55mel"
				onInit={(evt, editor) => (editorRef.current = editor)}
				value={formValue.content}
				onEditorChange={getEditorValue}
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
			<button type="submit">Save</button>
		</form>
	);
};

export default TodoItemCreator;
