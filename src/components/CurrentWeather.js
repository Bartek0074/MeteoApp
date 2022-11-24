import React from 'react';

function CurrentWeather(props) {
	const { data } = props;
	const temp = data.main.temp.toFixed(0);
	const feelTemp = data.main.feels_like.toFixed(0);
	const icon = data.weather[0].icon;
	const description = data.weather[0].description;
	const pressure = data.main.pressure;
	const wind = data.wind.speed.toFixed(1);
	const humidity = data.main.humidity;
	
	return (
		<div className='currentWeatherBox'>
			<p>Current weather</p>
			<div className='currentWeather'>
				<ul className='currentWeather__params'>
					<li className='temperature'>
						<div className='temp'>{temp}°</div>
						<div className='feelTemp'>
							<span className='feelTemp__label'>feels like:</span>
							<span className='feelTemp__value'>
								{feelTemp}°C
							</span>
						</div>
					</li>
					<li className='image'>
						<img src={`http://openweathermap.org/img/wn/${icon}@2x.png`}></img>
						<p>{description}</p>
					</li>
					<li className='restParams'>
						<span className='restParams__label'>Wind</span>
						<span className='restParams__value'>{wind} m/s</span>
					</li>
					<li className='restParams'>
						<span className='restParams__label'>Pressure</span>
						<span className='restParams__value'>{pressure} hPa</span>
					</li>
					<li className='restParams'>
						<span className='restParams__label'>Humidity</span>
						<span className='restParams__value'>{humidity}%</span>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default CurrentWeather;
