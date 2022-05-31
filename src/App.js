import { RecoilRoot } from "recoil";
import TodoList from "./components/TodoList/TodoList";
import "./App.css";

function App() {
	return (
		<RecoilRoot>
			<TodoList />
		</RecoilRoot>
	);
}

export default App;
