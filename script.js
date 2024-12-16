// Music player elements
const audio = new Audio();
const playPauseButton = document.getElementById("play-pause");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const songCover = document.getElementById("song-cover");
const progress = document.getElementById("progress");
const progressBar = document.querySelector(".progress-bar");
const currentTimeElem = document.getElementById("current-time");
const durationElem = document.getElementById("duration");

// Song list
const songs = [
  { title: "Song 1", artist: "Artist 1", src: "./song1.mp3", cover: "cover1.jpg" },
  { title: "Song 2", artist: "Artist 2", src: "./song2.mp3", cover: "cover2.jpg" },
  { title: "Song 3", artist: "Artist 3", src: "./song3.mp3", cover: "cover3.jpg" },
];

let currentSongIndex = 0;

// Load song
function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  songCover.src = song.cover;
}

// Play or pause song
function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    playPauseButton.textContent = "⏸️";
  } else {
    audio.pause();
    playPauseButton.textContent = "▶️";
  }
}

// Update progress
function updateProgress() {
  const { duration, currentTime } = audio;
  const percentage = (currentTime / duration) * 100;
  progress.style.width = `${percentage}%`;

  currentTimeElem.textContent = formatTime(currentTime);
  durationElem.textContent = formatTime(duration);
}

// Seek song
function setProgress(e) {
  const width = progressBar.offsetWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Format time
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Next and previous songs
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  playPauseButton.textContent = "⏸️";
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  playPauseButton.textContent = "⏸️";
}

// Event listeners
playPauseButton.addEventListener("click", togglePlayPause);
audio.addEventListener("timeupdate", updateProgress);
progressBar.addEventListener("click", setProgress);
nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", prevSong);

// Initialize
loadSong(currentSongIndex);
