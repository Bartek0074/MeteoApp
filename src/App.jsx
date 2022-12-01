import './App.scss';
import { useEffect, useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import Form from './components/Form';
import ForecastWeather from './components/ForecastWeather';
import { fetchWeather } from './utils/fetchWeather';
import { fetchCity } from './utils/fetchCity';

function App() {
	const [city, setCity] = useState('Warsaw');
	const [country, setCountry] = useState('Poland');
	const [forecast, setForecast] = useState([]);

	const formHandle = (city) => {
		setCity(city);
	};

	useEffect(() => {
		const fetch = async () => {
			const data = await fetchWeather(city);
			if (data.cod === '200') {
				const country = await fetchCity(data.city.country);
				setCountry(country[0].name.common);
				setCity(data.city.name);
				setForecast(data.list);
			}
			else {
				setForecast([])
			}
		};
		fetch();
	}, [city]);

	return (
		<div className='app'>
			<Form formHandle={formHandle} />
			<hr className='separator'></hr>
			<h1 className='app__city-info'>
				{forecast[0] ? `${city}, ${country}` : `City ${city} not found`}
			</h1>
			<hr className='separator'></hr>
			{forecast[0] && <CurrentWeather data={forecast[0]} />}
			{forecast[0] && <hr className='separator'></hr>}
			{forecast[0] && <ForecastWeather forecast={forecast} />}
		</div>
	);
}

export default App;
