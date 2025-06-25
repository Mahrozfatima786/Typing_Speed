// import React from "react";
// import { useTestMode } from "../Context/TestModelContext";

// export default function UpperMenu({ countDown }) {
// 	const { setTestTime } = useTestMode();
// 	const updateTime = (e) => {
// 		setTestTime(Number(e.target.id));
// 	};
// 	return (
// 		<div>
// 			<div className="Counter">{countDown}</div>
// 			<div className="mode">
// 				<div
// 					className="time-mode"
// 					id={15}
// 					onClick={updateTime}>
// 					15s
// 				</div>
// 				<div
// 					className="time-mode"
// 					onClick={updateTime}
// 					id={30}>
// 					30s
// 				</div>
// 				<div
// 					className="time-mode"
// 					onClick={updateTime}
// 					id={60}>
// 					60s
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
///////////
// import React, { useEffect, useState } from "react";
// import { useTestMode } from "../Context/TestModelContext";

// export default function UpperMenu() {
// 	const { testTime, setTestTime } = useTestMode();
// 	const [countDown, setCountDown] = useState(testTime);

// 	// whenever testTime changes, reset the countdown display
// 	useEffect(() => {
// 		setCountDown(testTime);
// 	}, [testTime]);

// 	// this component only shows the countdown value;
// 	// the actual ticking will be in TypingBox
// 	return (
// 		<div style={{ marginBottom: 20 }}>
// 			<div className="Counter">{countDown}s</div>
// 			<div className="mode">
// 				{[15, 30, 60].map((t) => (
// 					<div
// 						key={t}
// 						className={`time-mode${testTime === t ? " selected" : ""}`}
// 						onClick={() => setTestTime(t)}>
// 						{t}s
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// }
import React, { useState, useEffect, useRef } from "react";
import { useTestModel } from "../Context/TestModelContext";

const UpperMenu = () => {
	const { testTime, setTestTime } = useTestModel();
	const [countDown, setCountDown] = useState(0);
	const timerRef = useRef(null); // to store interval ID

	// When testTime changes, reset countdown
	useEffect(() => {
		setCountDown(testTime);
		clearInterval(timerRef.current); // clear old timer if any
	}, [testTime]);

	const startCountdown = () => {
		clearInterval(timerRef.current); // clear existing interval
		setCountDown(testTime); // reset to full time

		timerRef.current = setInterval(() => {
			setCountDown((prev) => {
				// if (prev >= 1) {
				// 	clearInterval(timerRef.current); // stop when reaches 0
				// 	// return 0;
				// }
				return prev + 1;
			});
		}, 1000);
	};

	return (
		<div
			style={{ marginBottom: 20 }}
			className="upper-menu">
			<h1>Typing Speed Test</h1>
			<div className="Counter">{countDown}s</div>

			<div className="mode">
				{[].map((t) => (
					<div
						key={t}
						className={`time-mode${testTime === 0 ? " selected" : ""}`}
						onClick={() => {
							setTestTime();
							clearInterval(timerRef.current); // reset timer when mode changes
						}}>
						{t}s
					</div>
				))}
			</div>

			<button onClick={startCountdown}>Start Test</button>
		</div>
	);
};

export default UpperMenu;
