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

	await Promise.all(
		music.map(async (song) => {
			const { data: audioFile } = await axios.get(song.download.regular, {
				responseType: 'arraybuffer',
			});

			await fs.writeFile(`media/${song.name}.mp3`, audioFile);
		})
	);
	//https://stackoverflow.com/questions/32511789/looping-through-files-in-a-folder-node-js
	const songs = [];
	const dir = await fs.opendir('media');
	for await (const dirent of dir) {
		if (dirent.name.includes('.mp3')) {
			songs.push('media/' + dirent.name);
		}
	}
	console.log('Concatenating files... \n');
	audioconcat(songs)
		.concat('media/songs.mp3')
		.on('start', function (command) {
			console.log('ffmpeg process started:', command);
		})
		.on('error', function (err, stdout, stderr) {
			console.error(err);
			console.error('ffmpeg stderr:', stderr);
		})
		.on('end', function (output) {
			console.error('Audio created in:', output);
			deleteSongs();
		});
}

async function deleteSongs() {
	const folderPath = 'media';

	console.log('Deleting songs...\n');

	try {
		const files = await fs.readdir(folderPath);

		for (const file of files) {
			const filePath = path.join(folderPath, file);
			if (!filePath.includes('songs')) {
				await fs.unlink(filePath);
			}
		}

		console.log('Songs deleted.\n');
	} catch (error) {
		console.error('Error occurred while deleting songs:', error);
	}
}

module.exports = { generateCredits, download, deleteSongs };
