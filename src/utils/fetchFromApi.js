const API_KEY = process.env.REACT_APP_API_KEY

export const fethFromApi = async (city) => {
	const data = await fetch(
		`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
	)
		.then(response => response.json())
        .catch(err => console.log(err))
        
    return data
};
