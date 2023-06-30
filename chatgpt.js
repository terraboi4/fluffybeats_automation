require('dotenv').config();
const axios = require('axios').default;

//define options for chatgpt axios request
const options = {
	method: 'POST',
	url: 'https://chatgpt53.p.rapidapi.com/',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': process.env.RAPIDAPI_API_KEY,
		'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com',
	},
	data: {
		messages: [
			{
				role: 'user',
				content: 'Hello',
			},
		],
		temperature: 1,
	},
};

//fetch the chatgpt response for the title and description
async function fetch() {
	try {
		const response = await axios.request(options);
		console.log(response.data.choices[0].message.content);
	} catch (error) {
		console.error(error);
	}
}

module.exports = { fetch };
