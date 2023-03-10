import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import InputCep from "./components/InputCep";

function App() {
	const [count, setCount] = useState(0);

	return (
		<div>
			<InputCep />
		</div>
	);
}

export default App;
