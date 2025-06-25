// // // import React from "react";
// // // import { TestModeProvider, useTestMode } from "./Context/TestModelContext";
// // // import UpperMenu from "./Component/UpperMenu";
// // // import TypingBox from "./Component/TypingBox";
// // // import { GlobalStyle } from "./Styles/Global";

// // // function InnerApp() {
// // // 	const { testTime } = useTestMode();
// // // 	return (
// // // 		<>
// // // 			<GlobalStyle />
// // // 			<UpperMenu />
// // // 			<TypingBox />
// // // 		</>
// // // 	);
// // // }

// // // export default function App() {
// // // 	return (
// // // 		<TestModeProvider>
// // // 			<div className="App">
// // // 				<InnerApp />
// // // 			</div>
// // // 		</TestModeProvider>
// // // 	);
// // // }

// // import React from "react";
// // import { GlobalStyle } from "./Styles/Global";
// // import { useTestMode } from "./Context/TestModelContext";

// // function App() {
// // 	const { testTime } = useTestMode();

// // 	return (
// // 		<div className="App">
// // 			<GlobalStyle />
// // 			<div>Hello — Test time: {testTime} minutes</div>
// // 		</div>
// // 	);
// // }

// // export default App;
// // import React from "react";
// // import { useTestMode } from "./Context/TestModelContext";

// // export default function App() {
// // 	const { testTime, setTestTime } = useTestMode();

// // 	return (
// // 		<div>
// // 			Current test time: {testTime}s
// // 			<button onClick={() => setTestTime(30)}>Set to 30s</button>
// // 		</div>
// // 	);
// // }
// import React from "react";
// import GlobalStyle from "./Styles/Global";
// import { TestModelProvider } from "./Context/TestModelContext";
// import UpperMenu from "./Component/UpperMenu";
// import TypingBox from "./Component/TypingBox";

// function App() {
// 	return (
// 		<TestModelProvider>
// 			<GlobalStyle />
// 			<div className="App">
// 				<UpperMenu />
// 				<TypingBox />
// 			</div>
// 		</TestModelProvider>

// 	);
// }

// export default App;
/////////////////////////////////////////
// App.js
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./Styles/Global";
import { TestModelProvider } from "./Context/TestModelContext";
import UpperMenu from "./Component/UpperMenu";
import TypingBox from "./Component/TypingBox";
import Result from "./Component/Result";

function Home() {
	return (
		<>
			{/* <UpperMenu /> */}
			<TypingBox />
		</>
	);
}

function About() {
	return <Result />;
}

function App() {
	return (
		<TestModelProvider>
			<Router>
				<GlobalStyle />
				<div className="App">
					<Routes>
						<Route
							path="/"
							element={<Home />}
						/>
						<Route
							path="/about"
							element={<About />}
						/>
					</Routes>
				</div>
			</Router>
		</TestModelProvider>
	);
}

export default App;
