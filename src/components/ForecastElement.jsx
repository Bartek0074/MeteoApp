import '../styles/ForecastElement.scss'
import React from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

function ForecastElement(props) {

	const { forecastEl, id, active, handleClick } = props;
	
	const date = forecastEl.dt_txt.slice(0, 10);
	const hour = forecastEl.dt_txt.slice(11, 16);
	const icon = forecastEl.weather[0].icon;
	const temp = forecastEl.main.temp.toFixed(0);

	return (
		<li
			onClick={() => handleClick(id)}
			className={
				active === id
					? 'forecastElement forecastElement--active'
					: 'forecastElement'
			}
		>
			<p className='forecastElement__date'>{date}</p>
			<p className='forecastElement__hour'>{hour}</p>
			<img
				className='forecastElement__icon'
				src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
				alt="Forecast weather icon"
			></img>
			<p className='forecastElement__temp'>{temp}°</p>
			{active === id ? (
				<IoIosArrowUp className='forecastElement__react-icon' />
			) : (
				<IoIosArrowDown className='forecastElement__react-icon' />
			)}
		</li>
	);
}

export default ForecastElement;
