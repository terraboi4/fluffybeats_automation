const ncs = require('nocopyrightsounds-api');

async function generateCredits() {
	let results = await ncs.search({
		genre: ncs.Genre.Phonk,
	});

	let result = '';

	results.forEach((element) => {
		result += `${element.name} by ${element.artists[0].name} \n`;
	});
	return result;
}

module.exports = { generateCredits };
