import './App.scss';
import { useEffect, useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import Form from './components/Form';
import ForecastWeather from './components/ForecastWeather';

function App() {
  const API_KEY = '4b4117603eb02d886ad3c7d0b274283d';
	const [city, setCity] = useState('Warsaw');
	const [forecast, setForecast] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
			)
				.then((response) => {
					if (response.ok) {
						return response.json();
					}
					throw new Error('City not found');
				})
				.then((responseJson) => {
					setForecast(responseJson.list);
					setCity(responseJson.city.name);
				})
				.catch((err) => {
					console.log(err);
					setForecast([]);
				});
		};
		fetchData();
	}, [city]);

	const formHandle = (city) => {
		setCity(city);
	};

	return (
		<div className='app'>
			<Form formHandle={formHandle} />
			<hr className='separator'></hr>
			<h1 className='app__city-info'>
				{forecast[0] ? `${city}` : `City ${city} not found`}
			</h1>
			<hr className='separator'></hr>
			{forecast[0] && <CurrentWeather data={forecast[0]} />}
			{forecast[0] ? <hr className='separator'></hr> : null}
			{forecast[0] ? <ForecastWeather forecast={forecast} /> : null}
		</div>
	);
}

export default App;
