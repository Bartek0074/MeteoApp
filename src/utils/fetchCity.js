export const fetchCity = async (cityCode) => {
	const data = await fetch(`https://restcountries.com/v3.1/alpha/${cityCode}`)
		.then((response) => response.json())
		.catch((err) => console.log(err));

	return data;
};
