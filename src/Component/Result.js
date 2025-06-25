import {
	CategoryScale,
	Chart,
	LinearScale,
	LineController,
	LineElement,
	PointElement,
	Title,
} from "chart.js";
import { useEffect, useRef } from "react";

Chart.register(
	LineController,
	LineElement,
	PointElement,
	LinearScale,
	Title,
	CategoryScale
);
export default function Result(props) {
	const chartData = {
		labels: ["Very Slow", "Slow", "Average", "Fluent", "Fast", "PRO"],
		datasets: [
			{
				label: "Sales",
				data: [85, 80, 70, 60, 45, 25],
				borderColor: "rgba(75, 192, 192, 1)",
				borderWidth: 2,
				fill: false,
			},
		],
	};

	const chartOptions = {
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: "Monthly Sales Data",
			},
		},
	};
	const LineChart = ({ data, options }) => {
		const chartRef = useRef(null);
		let chartInstance = null;

		useEffect(() => {
			const chartCanvas = chartRef.current.getContext("2d");

			if (chartInstance) {
				chartInstance.destroy();
			}

			chartInstance = new Chart(chartCanvas, {
				type: "line",
				data: data,
				options: options || {},
			});

			return () => {
				if (chartInstance) {
					chartInstance.destroy();
					chartInstance = null;
				}
			};
		}, [data, options]);

		return (
			<div style={{ height: "300px", justifyItems: "center", width: "100%" }}>
				<canvas
					ref={chartRef}
					className="convas"
				/>
			</div>
		);
	};
	return (
		<div
			style={{
				height: "670px",
				justifyContent: "center",
			}}>
			<h1> Your Test Score</h1>
			<div style={{ display: "flex", justifyContent: "center", gap: "80px" }}>
				<div style={{}}>
					<div
						style={{
							width: "100%",
							backgroundColor: "skyblue",
							padding: "20px",
							borderRadius: "50%",
						}}>
						{props.timeTaken} WPM
					</div>
					Typing Speed
				</div>

				<div style={{}}>
					<div
						style={{
							width: "100%",
							backgroundColor: "skyblue",
							padding: "20px",
							borderRadius: "50%",
						}}>
						{props.accuracyvalue} %
					</div>
					Accuracy
				</div>
				<div style={{}}>
					<div
						style={{
							width: "100%",
							backgroundColor: "skyblue",
							padding: "20px",
							borderRadius: "50%",
						}}>
						57 WPM
					</div>
					Net Speed
				</div>
			</div>

			<LineChart
				data={chartData}
				options={chartOptions}
			/>
		</div>
	);
}
////////////////////////////////////////////////////////
// import React from "react";
// import Countdown from "react-countdown";

// const Completionist = () => <span>Time's up!</span>;

// const renderer = ({ hours, minutes, seconds, completed }) => {
// 	if (completed) {
// 		return <Completionist />;
// 	} else {
// 		return (
// 			<span>
// 				{hours}:{minutes}:{seconds}
// 			</span>
// 		);
// 	}
// };

// const Result = () => (
// 	<Countdown
// 		date={Date.now() + 10000}
// 		renderer={renderer}
// 	/>
// );

// export default Result;
////////////////////////////////////////////////////////////////
// import { CountdownCircleTimer } from "react-countdown-circle-timer";

// const Result = () => {
// 	return (
// 		<CountdownCircleTimer
// 			isPlaying
// 			duration={60}
// 			colors={["#004777", "#F7B801", "#A30000"]}
// 			colorsTime={[60, 30, 0]}
// 			onComplete={() => {
// 				// Return true to repeat the animation
// 				return { shouldRepeat: true, delay: 1.5 };
// 			}}>
// 			{({ remainingTime, color }) => (
// 				<div style={{ color }}>
// 					<div className="text-2xl font-bold">{remainingTime}</div>
// 					<div className="text-sm">seconds</div>
// 				</div>
// 			)}
// 		</CountdownCircleTimer>
// 	);
// };
// export default Result;
