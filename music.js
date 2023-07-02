const ncs = require('nocopyrightsounds-api');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
var audioconcat = require('audioconcat');

//generates the credits that will be found in the description
async function generateCredits(genre) {
	console.log('Finding music... \n');
	let music = await ncs.search({
		genre: genre,
	});

	let result = '';
	console.log('Generating credits... \n');
	music.forEach((song) => {
		result += `${song.name} by ${song.artists
			.map((artist) => artist.name)
			.join(', ')} \n`;
	});
	console.log('Credits generated');
	return result;
}

//downloads the music
async function download(genre) {
	console.log('Finding music... \n');
	let music = await ncs.search({
		genre: genre,
	});

	music.forEach(async (song) => {
		const { data: audioFile } = await axios.get(song.download.regular, {
			responseType: 'arraybuffer',
		});

		await fs.writeFile(`media/${song.name}.mp3`, audioFile);
	});
	console.log('Music downloaded \n');
}

async function deleteSongs() {
	const folderPath = 'media';

	console.log('Deleting songs...\n');

	try {
		const files = await fs.readdir(folderPath);

		for (const file of files) {
			const filePath = path.join(folderPath, file);
			const fileStats = await fs.stat(filePath);

			await fs.unlink(filePath);
		}

		console.log('Songs deleted.\n');
	} catch (error) {
		console.error('Error occurred while deleting songs:', error);
	}
}

module.exports = { generateCredits, download, deleteSongs };
