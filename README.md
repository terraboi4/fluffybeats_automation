# Fluffy Beats

This is a tiny javascript thing that i made to automate a youtube channel.

Go sub to it [here](https://www.youtube.com/channel/UCZ-LYsoRJ3R-Am27qpAYkcQ)

Anyway, here's how it works:

## 1. Music
I use the api [nocopyrightsounds-api](https://www.npmjs.com/package/nocopyrightsounds-api) to fetch the music by a specific genre which is randomly generated. Then I download the music to my computer. I also save the song name and artist(s) to include in the description. After that, I use ffmpeg to concatenate them into one large music file. Lastly, I delete the smaller files.

## 2. Video
I use the GIPHY api along with [@charlos's](https://giphy.com/charlos_) images.

## 3. Concantenation
I use ffmpeg to concatenate the audio and the image together.

## 4. Title
I use ChatGPT to create a title with an emoji and all lowercase characters for whatever genre I am working with.

## 5. Description
I use ChatGPT to write the description. I also use the saved song names and artist(s) to make the credits.

## 6. Publishing
I publish a Youtube video every day with the Youtube API.



So, that is how the automation works. I hope you learned something today. Bye! 👋
