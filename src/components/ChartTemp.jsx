import React, { useEffect, useState } from 'react';
import '../styles/ChartTemp.scss';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Tooltip,
} from 'chart.js';

ChartJS.register(
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Tooltip
);

function ChartTemp({ forecast }) {
	const tempArr = forecast.map((el) => Number(el.main.temp.toFixed(1)));
	const dates = forecast.map((data) => data.dt_txt.slice(0, 16));

	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);
	const [fontSize, setFontSize] = useState();

	const [options, setOptions] = useState('');

	const [tempData, setTempData] = useState({
		labels: dates,
		datasets: [
			{
				data: tempArr,
			},
		],
	});

	function getWindowDimensions() {
		const { innerWidth: width, innerHeight: height } = window;
		return {
			width,
			height,
		};
	}

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());

			if (windowDimensions.width < 576) setFontSize(9);
			else setFontSize(12);
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [windowDimensions]);

	useEffect(() => {
		setTempData({
			labels: dates,
			datasets: [
				{
					label: 'Temperature',
					data: tempArr,
					fill: false,
					borderWidth: 3,
					lineTension: 0.4,
					borderColor: '#11afcfcc',
					backgroundColor: '#11afcfcc',
					pointBorderColor: '#11afcfcc',
					pointHoverRadius: 5,
					pointHoverBorderWidth: 0,
					pointRadius: 0,
					pointHitRadius: 10,
				},
			],
		});

		setOptions({
			maintainAspectRatio: false,
			plugins: {
				tooltip: {
					displayColors: false,
					backgroundColor: '#042b3399',
					titleFont: { weight: 'normal'},
					titleAlign: 'center',
					bodyAign: 'center',
					callbacks: {
						label: function(context) {
							let label = context.dataset.label || '';
	
							if (label) {
								label += ': ';
							}
							if (context.parsed.y !== null) {
								label += context.parsed.y + '°C';
							}
							return label;
						}
					}
				},
			},
			scales: {
				y: {
					min: Number(Math.min(...tempArr).toFixed(0)) - 5,
					max: Number(Math.max(...tempArr).toFixed(0)) + 5,

					ticks: {
						font: {
							size: fontSize,
						},
						callback: function (value, index, ticks) {
							return value + '°C';
						},
					},
				},
				x: {
					ticks: {
						font: {
							size: fontSize,
						},
						autoSkipPadding: 20,
						maxRotation: 90,
						minRotation: 80,
					},
				},
			},
		});
	}, [forecast, fontSize]);

	return (
		<div className='charTemp'>
			<p className='charTemp__title'>Temperature chart</p>
			<div className='charTemp__wrapper'>
				<Line className='charTemp__chartEl' data={tempData} options={options} />
			</div>
		</div>
	);
}

export default ChartTemp;
