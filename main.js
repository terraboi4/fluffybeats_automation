//sorry for the bad code...

const chatgpt = require('./chatgpt');
const music = require('./music');

music.generateCredits().then((credits) => {
	console.log(credits);
});
