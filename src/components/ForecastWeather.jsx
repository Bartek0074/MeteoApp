import React, { useState } from 'react';
import '../styles/ForecastWeather.scss'
import ForecastElement from './ForecastElement';

function ForecastWeather(props) {
	const { forecast } = props;

	const [active, setActive] = useState(0);

	const tempFelt = forecast[active].main.feels_like.toFixed(0);

	let rain;
	if (typeof forecast[active].rain !== 'undefined') rain = forecast[active].rain['3h'].toFixed(1)

	let snow;
	if (typeof forecast[active].snow !== 'undefined') snow = forecast[active].snow['3h'].toFixed(1)
	
	const wind = forecast[active].wind.speed.toFixed(1);
	const pressure = forecast[active].main.pressure;
	const humidity = forecast[active].main.humidity;
	const cloudiness = forecast[active].clouds.all;
	
	const handleClick = (id) => {
		 setActive(id);
	};
	
	return (
		<div className='forecastWeatherBox'>
			<p className='forecastWeatherBox__title'>Weather forecast</p>
			<div className='forecastWeather'>
				<ul className='forecastWeather__list'>
					{forecast.map((forecastEl, id) => {
						return (
							<ForecastElement
								handleClick={handleClick}
								forecastEl={forecastEl}
								active={active}
								id={id}
								key={id}
							/>
						);
					})}
				</ul>
				{active != null && (
					<div className='forecastWeather__weather'>
						<ul className='forecastWeather__weather-params'>
							<li className='param'>
								<p className='param__label'>Temperature felt</p>
								<p className='param__value'>{tempFelt}°C</p>
							</li>
							<li className='param'>
								<p className='param__label'>Rain</p>
								<p className='param__value'>{rain ? rain : '0.0'} mm</p>
							</li>
							<li className='param'>
								<p className='param__label'>Snow</p>
								<p className='param__value'>{snow ? snow : '0.0'} mm</p>
							</li>
							<li className='param'>
								<p className='param__label'>Wind</p>
								<p className='param__value'>{wind} m/s</p>
							</li>
							<li className='param'>
								<p className='param__label'>Pressure</p>
								<p className='param__value'>{pressure} hPa</p>
							</li>
							<li className='param'>
								<p className='param__label'>Humidity</p>
								<p className='param__value'>{humidity}%</p>
							</li>
							<li className='param'>
								<p className='param__label'>Cloudiness</p>
								<p className='param__value'>{cloudiness}%</p>
							</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}

export default ForecastWeather;
