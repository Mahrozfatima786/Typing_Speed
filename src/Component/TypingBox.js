import { useEffect, useMemo, useRef, useState } from "react";
import { useTestModel } from "../Context/TestModelContext";
import Result from "./Result"; // adjust this path if needed

const TypingBox = () => {
	const originalText =
		"A young boy named Rohan was playing in the park when the wind snatched his bright red kite and carried it high into the sky.";

	const [timeTaken, setTimeTaken] = useState(null);
	const [userInput, setUserInput] = useState("");
	const [hasStarted, setHasStarted] = useState(false);
	const [countDown, setCountDown] = useState(60);
	const [isRunning, setIsRunning] = useState(false);
	const [startTime, setStartTime] = useState(null);

	const timerRef = useRef(null);
	const { testTime, setTestTime } = useTestModel();

	// ✅ Your timing logic is preserved
	useEffect(() => {
		if (userInput.length === originalText.length) {
			clearInterval(timerRef.current);
			setIsRunning(false);
			if (startTime) {
				const duration = Math.floor((Date.now() - startTime) / 1000);
				setTimeTaken(duration);
			}
		}
	}, [userInput]);

	const startCountdown = () => {
		if (isRunning || !testTime) return;

		setCountDown(testTime);
		setIsRunning(true);
		setStartTime(Date.now());

		clearInterval(timerRef.current);

		timerRef.current = setInterval(() => {
			setCountDown((prev) => {
				if (prev <= 1) {
					clearInterval(timerRef.current);
					setIsRunning(false);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
	};

	const handleKeyDown = (e) => {
		if (!hasStarted) {
			setHasStarted(true);
			startCountdown();
		}

		if (e.key.length === 1) {
			setUserInput((prev) => prev + e.key);
		} else if (e.key === "Backspace") {
			setUserInput((prev) => prev.slice(0, -1));
		}
	};

	const renderColoredText = () => {
		return originalText.split("").map((char, index) => {
			let color = "white";
			if (index < userInput.length) {
				color = userInput[index] === char ? "green" : "red";
			}
			return (
				<span
					key={index}
					style={{ color }}>
					{char}
				</span>
			);
		});
	};

	const accuracyvalue = useMemo(() => {
		let correct = 0;
		for (let i = 0; i < userInput.length; i++) {
			if (userInput[i] === originalText[i]) correct++;
		}
		return Math.floor((correct / originalText.length) * 100);
	}, [userInput]);

	const resetTest = () => {
		clearInterval(timerRef.current);
		setUserInput("");
		setCountDown(testTime);
		setIsRunning(false);
		setHasStarted(false);
		setTimeTaken(null);
	};

	const timeOptions = [15, 30, 60]; // You can customize this

	return (
		<div>
			{userInput.length === originalText.length ? (
				<div
					style={{
						backgroundColor: "white",
						padding: "20px",
						justifyContent: "center",
					}}>
					<Result
						timeTaken={timeTaken}
						accuracyvalue={accuracyvalue}
					/>
					<button onClick={resetTest}>Restart Test</button>
				</div>
			) : (
				<div>
					<div
						style={{ marginBottom: 20 }}
						className="upper-menu">
						<h1>Typing Speed Test</h1>
						<div className="Counter">{countDown}s</div>

						{/* Time selection */}
						<div
							className="mode"
							style={{
								display: "flex",
								gap: "10px",
								margin: "10px 0",
								justifyContent: "center",
							}}>
							{timeOptions.map((t) => (
								<div
									key={t}
									style={{
										color: "black",
										cursor: "pointer",
										padding: "5px 10px",
										border: "1px solid gray",
										borderRadius: "5px",
										backgroundColor: testTime === t ? "lightblue" : "white",
									}}
									onClick={() => {
										setTestTime(t);
										setCountDown(t);
										clearInterval(timerRef.current);
										setIsRunning(false);
										setHasStarted(false);
										setUserInput("");
										setTimeTaken(null);
									}}>
									{t}s
								</div>
							))}
						</div>

						<button
							onClick={resetTest}
							disabled={isRunning}>
							{isRunning ? "Running..." : "Start Test"}
						</button>
					</div>

					{/* Typing area */}
					<div
						tabIndex="0"
						onKeyDown={handleKeyDown}
						style={{
							width: "900px",
							padding: "20px",
							minHeight: "200px",
							outline: "none",
							fontSize: "18px",
							lineHeight: "1.6",
							whiteSpace: "pre-wrap",
							cursor: "text",
							marginLeft: "auto",
							marginRight: "auto",
							border: "1px solid gray",
							borderRadius: "10px",
							backgroundColor: "#1e1e1e",
							color: "white",
						}}>
						{renderColoredText()}
					</div>
				</div>
			)}
		</div>
	);
};

export default TypingBox;

///////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect, useRef } from "react";
// import Result from "./Result";

// // Dummy context for demo; replace with your actual context
// const useTestModel = () => {
// 	const [testTime, setTestTime] = useState(60);
// 	return { testTime, setTestTime };
// };
// const TypingBox = () => {
// 	const originalText =
// 		"A young boy named Rohan was playing in the park when the wind snatched his bright red kite and carried it high into the sky.";
// 	const [timeTaken, setTimeTaken] = useState(null);
// 	const [userInput, setUserInput] = useState("");
// 	// const [userInput, setUserInput] = useState({
// 	// 	correct: {},
// 	// 	inCorrect: {},
// 	// });

// 	const [hasStarted, setHasStarted] = useState(false);
// 	const [countDown, setCountDown] = useState(60);
// 	const [isRunning, setIsRunning] = useState(false);

// 	const timerRef = useRef(null);
// 	const { testTime, setTestTime } = useTestModel();
// 	const [startTime, setStartTime] = useState(null); // ✅ this line is essential
// 	useEffect(() => {
// 		if (userInput.length === originalText.length) {
// 			clearInterval(timerRef.current);
// 			setIsRunning(false);
// 			if (startTime) {
// 				const duration = Math.floor((Date.now() - startTime) / 1000);
// 				setTimeTaken(duration);
// 			}
// 		}
// 	}, [userInput]);
// 	const startCountdown = () => {
// 		if (isRunning || !testTime) return;

// 		setCountDown(testTime);
// 		setIsRunning(true);
// 		setStartTime(Date.now());

// 		clearInterval(timerRef.current);

// 		timerRef.current = setInterval(() => {
// 			setCountDown((prev) => {
// 				if (prev <= 1) {
// 					clearInterval(timerRef.current);
// 					setIsRunning(false);
// 					return 0;
// 				}
// 				return prev - 1;
// 			});
// 		}, 1000);
// 	};
// 	// const startCountdown = () => {
// 	// 	if (isRunning || !testTime) return;

// 	// 	setCountDown(testTime);
// 	// 	setIsRunning(true);
// 	// 	setStartTime(Date.now());
// 	// 	clearInterval(timerRef.current);

// 	// 	timerRef.current = setInterval(() => {
// 	// 		setCountDown((prev) => {
// 	// 			if (prev <= 1) {
// 	// 				clearInterval(timerRef.current);
// 	// 				setIsRunning(false);
// 	// 				return 0;
// 	// 			}
// 	// 			return prev - 1;
// 	// 		});
// 	// 	}, 1000);
// 	// };
// 	// Trigger test complete when user finishes typing
// 	useEffect(() => {
// 		if (userInput.length === originalText.length) {
// 			clearInterval(timerRef.current);
// 			setIsRunning(false);
// 		}
// 	}, [userInput]);
// 	const handleKeyDown = (e) => {
// 		if (!hasStarted) {
// 			setHasStarted(true);
// 			startCountdown();
// 		}

// 		if (e.key.length === 1) {
// 			setUserInput((prev) => prev + e.key);
// 		} else if (e.key === "Backspace") {
// 			setUserInput((prev) => prev.slice(0, -1));
// 		}
// 	};
// 	const correctValues = [];

// 	const renderColoredText = () => {
// 		// debugger;
// 		return originalText.split("").map((char, index) => {
// 			let color = "white";
// 			if (index < userInput.length) {
// 				if (userInput[index] === char) {
// 					debugger;

// 					color = "green";
// 					correctValues.push(char);
// 				} else color = "red";
// 			}
// 			return (
// 				<span
// 					key={index}
// 					style={{ color }}>
// 					{char}
// 				</span>
// 			);
// 		});
// 	};
// 	// debugger;
// 	const correct = correctValues.length;
// 	const total = originalText.length;
// 	const accuracyvalues = correct / total;
// 	const accuracyvalue = accuracyvalues * 100;
// 	// const accuracyvalue = ((total / correct) * 100) / 100;
// 	// const accuracyvalue = correct;

// 	console.log(accuracyvalue);
// 	const resetTest = () => {
// 		clearInterval(timerRef.current);
// 		setUserInput("");
// 		setCountDown(testTime);
// 		setIsRunning(false);
// 		setHasStarted(false);
// 		setTimeTaken(null);
// 	};

// 	const timeOptions = [];

// 	return (
// 		<div>
// 			{userInput.length === originalText.length ? (
// 				<div
// 					style={{
// 						backgroundColor: "white",
// 						padding: "20px",
// 						justifyContent: "center",
// 					}}>
// 					<Result
// 						timeTaken={timeTaken}
// 						accuracyvalue={accuracyvalue}
// 					/>
// 					<button onClick={resetTest}>Restart Test</button>
// 				</div>
// 			) : (
// 				<div>
// 					{/* Upper Menu */}
// 					<div
// 						style={{ marginBottom: 20 }}
// 						className="upper-menu">
// 						<h1>Typing Speed Test</h1>
// 						<div className="Counter">{countDown}s</div>

// 						{/* Time selection */}
// 						<div
// 							className="mode"
// 							style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
// 							{timeOptions.map((t) => (
// 								<div
// 									key={t}
// 									style={{
// 										cursor: "pointer",
// 										padding: "5px 10px",
// 										border: "1px solid gray",
// 										borderRadius: "5px",
// 										backgroundColor: testTime === t ? "lightblue" : "white",
// 									}}
// 									onClick={() => {
// 										setTestTime(t);
// 										setCountDown(t);
// 										clearInterval(timerRef.current);
// 										setIsRunning(false);
// 										setHasStarted(false);
// 										setUserInput("");
// 										setTimeTaken(null);
// 									}}>
// 									{t}s
// 								</div>
// 							))}
// 						</div>

// 						{/* Start Test */}
// 						<button
// 							onClick={resetTest}
// 							disabled={isRunning}>
// 							{isRunning ? "Running..." : "Start Test"}
// 						</button>
// 					</div>

// 					{/* Typing area */}
// 					<div
// 						tabIndex="0"
// 						onKeyDown={handleKeyDown}
// 						style={{
// 							width: "900px",
// 							padding: "20px",
// 							minHeight: "200px",
// 							outline: "none",
// 							fontSize: "18px",
// 							lineHeight: "1.6",
// 							whiteSpace: "pre-wrap",
// 							cursor: "text",
// 							marginLeft: "auto",
// 							marginRight: "auto",
// 							border: "1px solid gray",
// 							borderRadius: "10px",
// 							backgroundColor: "#1e1e1e",
// 							color: "white",
// 						}}>
// 						{renderColoredText()}
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default TypingBox;

// ////////////////////////////////////////////////////////////////////////
// // import React, { useEffect, useRef, useState } from "react";
// // import Result from "./Result";
// // import UpperMenu from "./UpperMenu";
// // import { useTestModel } from "../Context/TestModelContext";
// // import Countdown from "react-countdown";

// // const TypingBox = () => {
// // 	const originalText = "A young boy named Rohan was ";
// // 	// playing in the park when the wind snatched his bright red kite and carried it high into the sky. Rohan watched, his heart sinking, as the kite disappeared over the trees. He called out to the wind, but it only chuckled and continued its journey. Rohan, though sad, picked himself up and started walking home, knowing he'd need to build a new kite. As he walked, he thought of the joy he'd felt when the kite was soaring. He smiled, knowing that even though he lost the kite, the memory of it would stay with him foreve";
// // 	// const [userInput, setUserInput] = useState("");
// // 	const { userInput, setUserInput } = useTestModel();
// // 	// let getRef = useRef(false);

// // 	const handleKeyDown = (e) => {
// // 		if (e.key.length === 1) {
// // 			// Typed a visible character
// // 			setUserInput((prev) => prev + e.key);
// // 		} else if (e.key === "Backspace") {
// // 			setUserInput((prev) => prev.slice(0, -1));
// // 		}
// // 	};

// // 	const renderColoredText = () => {
// // 		return originalText.split("").map((char, index) => {
// // 			let color = "white";
// // 			if (index < userInput.length) {
// // 				color = userInput[index] === char ? "green" : "red";
// // 			}
// // 			return (
// // 				<span
// // 					key={index}
// // 					style={{ color }}>
// // 					{char}
// // 				</span>
// // 			);
// // 		});
// // 	};
// // 	debugger;

// // 	const UpperMenu = () => {
// // 		const { testTime, setTestTime, setFinalTime } = useTestModel();
// // 		const [countDown, setCountDown] = useState(0);
// // 		const timerRef = useRef(null); // to store interval ID

// // 		// When testTime changes, reset countdown
// // 		useEffect(() => {
// // 			setCountDown(testTime);
// // 			clearInterval(timerRef.current); // clear old timer if any
// // 		}, [testTime]);

// // 		const startCountdownVF = () => {
// // 			clearInterval(timerRef.current);
// // 			setCountDown(timerRef.current);
// // 			// setFinalTime(timerRef.current);

// // 			timerRef.current = setInterval(() => {
// // 				setCountDown((prev) => {
// // 					const newTime = prev - 1;
// // 					// setFinalTime(newTime);
// // 					if (newTime <= 0) {
// // 						clearInterval(timerRef.current);
// // 						return 0;
// // 					}
// // 					return newTime;
// // 				});
// // 			}, 1000);
// // 		};
// // 		const startCountdown = () => {
// // 			debugger;
// // 			clearInterval(timerRef.current); // clear existing interval
// // 			setCountDown(testTime); // reset to full time

// // 			timerRef.current = setInterval(() => {
// // 				setCountDown((prev) => {
// // 					// if (prev >= 1) {
// // 					// 	clearInterval(timerRef.current); // stop when reaches 0
// // 					// 	// return 0;
// // 					// }
// // 					return prev + 1;
// // 				});
// // 			}, 1000);
// // 		};
// // 		// const startCountdown = () => {
// // 		// 	clearInterval(timerRef.current); // clear existing interval
// // 		// 	setCountDown(testTime); // reset to full time

// // 		// 	timerRef.current = setInterval(() => {
// // 		// 		setCountDown((prev) => {
// // 		// 			debugger;
// // 		// 			if (prev <= 1) {
// // 		// 				clearInterval(timerRef.current); // stop when reaches 0
// // 		// 				return 0;
// // 		// 			}

// // 		// 			return prev - 1;
// // 		// 		});
// // 		// 	}, 1000);
// // 		// };

// // 		return (
// // 			<div
// // 				style={{ marginBottom: 20 }}
// // 				className="upper-menu">
// // 				<h1>Typing Speed Test</h1>
// // 				<div className="Counter">{countDown}s</div>

// // 				<div className="mode">
// // 					{[].map((t) => (
// // 						<div
// // 							key={t}
// // 							className={`time-mode${testTime === 0 ? " selected" : ""}`}
// // 							onClick={() => {
// // 								setTestTime();
// // 								clearInterval(timerRef.current); // reset timer when mode changes
// // 							}}>
// // 							{t}s
// // 						</div>
// // 					))}
// // 				</div>

// // 				<button onClick={startCountdown}>Start Test</button>
// // 			</div>
// // 		);
// // 	};

// // 	return (
// // 		<div>
// // 			{originalText.length === userInput.length ? (
// // 				<div
// // 					style={{
// // 						backgroundColor: "white",
// // 						justifyItems: "anchor-center",
// // 						//  justify-items: anchor-center
// // 					}}>
// // 					<Result />
// // 				</div>
// // 			) : (
// // 				<div>
// // 					<UpperMenu />
// // 					<div
// // 						tabIndex="0"
// // 						onKeyDown={handleKeyDown}
// // 						style={{
// // 							width: "900px",
// // 							padding: "20px",
// // 							minHeight: "200px",
// // 							outline: "none",
// // 							fontSize: "18px",
// // 							lineHeight: "1.6",
// // 							whiteSpace: "pre-wrap",
// // 							cursor: "text",
// // 							marginLeft: "300px",
// // 						}}>
// // 						{renderColoredText()}
// // 					</div>
// // 				</div>
// // 			)}
// // 		</div>
// // 	);
// // };

// // export default TypingBox;
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // const Completionist = () => (
// // 	<span style={{ color: "white" }}>Time's up!</span>
// // );
// // const renderer = ({ hours, minutes, seconds, completed, autoStart }) => {
// // 	if (completed) {
// // 		return <Completionist />;
// // 	} else {
// // 		return (
// // 			<div
// // 				style={{ marginBottom: 20 }}
// // 				className="upper-menu">
// // 				<h1>Typing Speed Test</h1>
// // 				<div>
// // 					<span style={{ color: "white" }}>
// // 						{hours}:{minutes}:{seconds}
// // 					</span>
// // 				</div>
// // 				{/* <button onClick={handleClick}>Start</button> */}
// // 			</div>
// // 		);
// // 	}
// // };

// // const UpperMenu = () => {
// // 	const handleClick = () => {
// // 		getRef?.current?.start();
// // 	};
// // 	return (
// // 		<div>
// // 			<Countdown
// // 				date={Date.now() + 10000}
// // 				renderer={renderer}
// // 				autoStart={false}
// // 				ref={getRef}
// // 			/>
// // 			<button onClick={handleClick}>Start Test</button>
// // 		</div>
// // 	);
// // };
// // import React, { useState, useEffect, useRef } from "react";

// // const useTestModel = () => {
// // 	const [testTime, setTestTime] = useState(60);
// // 	return { testTime, setTestTime };
// // };

// // const TypingBox = () => {
// // 	const originalText =
// // 		"A young boy named Rohan was playing in the park when the wind snatched his bright red kite and carried it high into the sky.";

// // 	const [userInput, setUserInput] = useState("");
// // 	const [hasStarted, setHasStarted] = useState(false);
// // 	const [countDown, setCountDown] = useState(60);
// // 	const [isRunning, setIsRunning] = useState(false);
// // 	const [startTime, setStartTime] = useState(null);
// // 	const [timeTaken, setTimeTaken] = useState(null);

// // 	const timerRef = useRef(null);
// // 	const { testTime, setTestTime } = useTestModel();

// // 	useEffect(() => {
// // 		return () => clearInterval(timerRef.current);
// // 	}, []);

// // 	const startCountdown = () => {
// // 		if (isRunning || !testTime) return;

// // 		setCountDown(testTime);
// // 		setIsRunning(true);
// // 		setStartTime(Date.now());
// // 		clearInterval(timerRef.current);

// // 		timerRef.current = setInterval(() => {
// // 			setCountDown((prev) => {
// // 				if (prev <= 1) {
// // 					clearInterval(timerRef.current);
// // 					setIsRunning(false);
// // 					return 0;
// // 				}
// // 				return prev - 1;
// // 			});
// // 		}, 1000);
// // 	};

// // 	useEffect(() => {
// // 		if (userInput.length === originalText.length) {
// // 			clearInterval(timerRef.current);
// // 			setIsRunning(false);
// // 			if (startTime) {
// // 				const duration = Math.floor((Date.now() - startTime) / 1000);
// // 				setTimeTaken(duration);
// // 			}
// // 		}
// // 	}, [userInput]);

// // 	const handleKeyDown = (e) => {
// // 		if (!hasStarted) {
// // 			setHasStarted(true);
// // 			startCountdown();
// // 		}

// // 		if (e.key.length === 1) {
// // 			setUserInput((prev) => prev + e.key);
// // 		} else if (e.key === "Backspace") {
// // 			setUserInput((prev) => prev.slice(0, -1));
// // 		}
// // 	};

// // 	const renderColoredText = () => {
// // 		return originalText.split("").map((char, index) => {
// // 			let color = "white";
// // 			if (index < userInput.length) {
// // 				color = userInput[index] === char ? "green" : "red";
// // 			}
// // 			return (
// // 				<span key={index} style={{ color }}>
// // 					{char}
// // 				</span>
// // 			);
// // 		});
// // 	};

// // 	const resetTest = () => {
// // 		clearInterval(timerRef.current);
// // 		setUserInput("");
// // 		setCountDown(testTime);
// // 		setIsRunning(false);
// // 		setHasStarted(false);
// // 		setTimeTaken(null);
// // 		setStartTime(null);
// // 	};

// // 	const timeOptions = [15, 30, 60];

// // 	return (
// // 		<div>
// // 			{userInput.length === originalText.length ? (
// // 				<div style={{ backgroundColor: "white", padding: "20px", textAlign: "center" }}>
// // 					<h2>✅ Test Complete!</h2>
// // 					{timeTaken !== null && (
// // 						<h3>⏱ Time Taken: <strong>{timeTaken} seconds</strong></h3>
// // 					)}
// // 					<button onClick={resetTest}>Restart Test</button>
// // 				</div>
// // 			) : (
// // 				<div>
// // 					{/* Upper Menu */}
// // 					<div style={{ marginBottom: 20 }} className="upper-menu">
// // 						<h1>Typing Speed Test</h1>
// // 						<div className="Counter">{countDown}s</div>

// // 						<div className="mode" style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
// // 							{timeOptions.map((t) => (
// // 								<div
// // 									key={t}
// // 									style={{
// // 										cursor: "pointer",
// // 										padding: "5px 10px",
// // 										border: "1px solid gray",
// // 										borderRadius: "5px",
// // 										backgroundColor: testTime === t ? "lightblue" : "white",
// // 									}}
// // 									onClick={() => {
// // 										setTestTime(t);
// // 										setCountDown(t);
// // 										clearInterval(timerRef.current);
// // 										setIsRunning(false);
// // 										setHasStarted(false);
// // 										setUserInput("");
// // 										setTimeTaken(null);
// // 									}}
// // 								>
// // 									{t}s
// // 								</div>
// // 							))}
// // 						</div>

// // 						<button onClick={resetTest} disabled={isRunning}>
// // 							{isRunning ? "Running..." : "Start Test"}
// // 						</button>
// // 					</div>

// // 					{/* Typing area */}
// // 					<div
// // 						tabIndex="0"
// // 						onKeyDown={handleKeyDown}
// // 						style={{
// // 							width: "900px",
// // 							padding: "20px",
// // 							minHeight: "200px",
// // 							outline: "none",
// // 							fontSize: "18px",
// // 							lineHeight: "1.6",
// // 							whiteSpace: "pre-wrap",
// // 							cursor: "text",
// // 							marginLeft: "auto",
// // 							marginRight: "auto",
// // 							border: "1px solid gray",
// // 							borderRadius: "10px",
// // 							backgroundColor: "#1e1e1e",
// // 							color: "white",
// // 						}}
// // 					>
// // 						{renderColoredText()}
// // 					</div>
// // 				</div>
// // 			)}
// // 		</div>
// // 	);
// // };

// // export default TypingBox;
