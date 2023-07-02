const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

async function getImage(username) {
	const apiKey = process.env.GIPHY_API_KEY;
	const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${username}&limit=100`;

	try {
		const response = await axios.get(url);
		const data = response.data;
		const gifs = data.data;

		// Select a random GIF from the response
		const randomIndex = Math.floor(Math.random() * gifs.length);
		const randomGif = gifs[randomIndex];

		// Get the URL of the random GIF
		const imageUrl = randomGif.images.original.url;
		console.log('Random Image URL:', imageUrl);

		const imageResponse = await axios({
			url: imageUrl,
			responseType: 'stream',
		});

		imageResponse.data.pipe(fs.createWriteStream('media/random_image.gif'));
	} catch (error) {
		console.error('Error:', error.message);
	}
}

module.exports = { getImage };
