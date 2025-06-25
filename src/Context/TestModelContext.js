// import React, { createContext, useContext, useState } from "react";

// const TestModeContext = createContext(null);

// export function TestModeProvider({ children }) {
// 	const [testTime, setTestTime] = useState(15);
// 	return (
// 		<TestModeContext.Provider value={{ testTime, setTestTime }}>
// 			{children}
// 		</TestModeContext.Provider>
// 	);
// }

// export function useTestMode() {
// 	const context = useContext(TestModeContext);
// 	if (context === null) {
// 		throw new Error("useTestMode must be used within a <TestModeProvider>");
// 	}
// 	return context;
// }
////////////////////////////
// import React, { createContext, useContext, useState } from "react";

// const TestModelContext = createContext(null);

// export const TestModelContextProvider = ({ children }) => {
// 	const [testTime, setTestTime] = useState(15);
// 	return (
// 		<TestModelContext.Provider value={{ testTime, setTestTime }}>
// 			{children}
// 		</TestModelContext.Provider>
// 	);
// };

// export const useTestMode = () => {
// 	const context = useContext(TestModelContext);
// 	if (!context) {
// 		throw new Error("useTestMode must be used inside TestModelContextProvider");
// 	}
// 	return context;
// };
// import { createContext, useContext, useState } from "react";

// const TestModelContext = createContext();

// export const TestModelProvider = ({ children }) => {
// 	const [text, setText] = useState("Type this text");
// 	const [userInput, setUserInput] = useState("");
// 	const [speed, setSpeed] = useState(0);

// 	const startTest = () => {
// 		setUserInput("");
// 		// Add logic to start the typing test
// 	};

// 	return (
// 		<TestModelContext.Provider value={{ text, userInput, speed, startTest }}>
// 			{children}
// 		</TestModelContext.Provider>
// 	);
// };

// export const useTestModel = () => useContext(TestModelContext);
import { createContext, useContext, useState } from "react";

const TestModelContext = createContext();

export const TestModelProvider = ({ children }) => {
	const [text, setText] = useState("Type this text");
	const [userInput, setUserInput] = useState("");
	const [speed, setSpeed] = useState(0);
	const [testTime, setTestTime] = useState(0); // ✅ Add this line
	const [timeTaken, setTimeTaken] = useState(null);
	const [testStarted, setTestStarted] = useState(false);
	const [startTime, setStartTime] = useState(null);

	const startTest = () => {
		setUserInput("");
	};

	return (
		<TestModelContext.Provider
			value={{
				testStarted,
				setTestStarted,
				userInput,
				setUserInput,
				speed,
				setSpeed,
				testTime,
				setTestTime,
				timeTaken,
				setTimeTaken,
				setStartTime,
				startTime,
			}}>
			{children}
		</TestModelContext.Provider>
	);
};

export const useTestModel = () => useContext(TestModelContext);
