console.log('Welcome to Spotify');

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    { songName: 'Song 1', filePath: 'songs/1.mp3', covers: 'covers/1.jpg' },
    { songName: 'Song 2', filePath: 'songs/2.mp3', covers: 'covers/2.jpg' },
    { songName: 'Song 3', filePath: 'songs/3.mp3', covers: 'covers/3.jpg' },
    { songName: 'Song 4', filePath: 'songs/4.mp3', covers: 'covers/4.jpg' },
    { songName: 'Song 5', filePath: 'songs/5.mp3', covers: 'covers/5.jpg' }
];

// Update the song details (image, song name)
songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].covers;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});

// Reset all play icons to "play"
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('play')).forEach((element) => {
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    });
};

// Toggle between play and pause for song-specific play buttons
Array.from(document.getElementsByClassName('play')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let clickedSongIndex = parseInt(e.target.id);  // Get the clicked song's index

        // If the same song is clicked and is currently playing, pause it
        if (songIndex === clickedSongIndex && !audioElement.paused) {
            audioElement.pause();
            e.target.classList.add('fa-circle-play');
            e.target.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            gif.style.opacity = 0;
        } 
        // If a different song is clicked or the song is paused, play it
        else {
            makeAllPlays();  // Reset all play icons
            songIndex = clickedSongIndex;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
    });
});

// Master play/pause button functionality
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-circle-pause');
    } else {
        audioElement.pause();
        masterPlay.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');
        gif.style.opacity = 0;
        document.getElementById(songIndex).classList.add('fa-circle-play');
        document.getElementById(songIndex).classList.remove('fa-circle-pause');
    }
});

// Update the progress bar as the song plays
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
});

// Seek the song based on progress bar change
progressBar.addEventListener('change', () => {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
});

// Next button functionality
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

// Previous button functionality
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});
