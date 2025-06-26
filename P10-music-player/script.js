let track_index = 0,
    isPlaying = false,
    updateTimer;

const curr_track = new Audio();

const track_list = [
  {
    name: "Supernatural",
    artist: "Ariana Grande",
    image: "images/img1.jpg",
    path: "songs/song1.mp3"
  },
  {
    name: "Espresso",
    artist: "Sabrina Carpenter",
    image: "images/img2.jpg",
    path: "songs/song2.mp3"
  },
  {
    name: "Beautiful Things",
    artist: "Benson Boone",
    image: "images/img3.jpg",
    path: "songs/song3.mp3"
  }
];

// UI Elements
const nowPlaying = document.querySelector(".now-playing");
const trackArt = document.querySelector(".track-art");
const trackName = document.querySelector(".track-name");
const trackArtist = document.querySelector(".track-artist");

const playpauseBtn = document.querySelector(".playpause-track");
const nextBtn = document.querySelector(".next-track");
const prevBtn = document.querySelector(".prev-track");

const seekSlider = document.querySelector(".seek_slider");
const volumeSlider = document.querySelector(".volume_slider");
const currTime = document.querySelector(".current-time");
const totalDuration = document.querySelector(".total-duration");

function loadTrack(index) {
  clearInterval(updateTimer);
  resetValues();

  const track = track_list[index];
  curr_track.src = track.path;
  curr_track.load();

  trackArt.style.backgroundImage = `url(${track.image})`;
  trackName.textContent = track.name;
  trackArtist.textContent = track.artist;
  nowPlaying.textContent = `🎶 Playing ${index + 1} of ${track_list.length}`;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);

  // Optional: fade-in visual
  trackArt.classList.remove("rotate");
  void trackArt.offsetWidth; // reflow trick
  trackArt.classList.add("rotate");
}

function resetValues() {
  currTime.textContent = "00:00";
  totalDuration.textContent = "00:00";
  seekSlider.value = 0;
}

function playpauseTrack() {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

function playTrack() {
  curr_track.play().then(() => {
    isPlaying = true;
    playpauseBtn.innerHTML = `<i class="fa fa-pause-circle fa-5x"></i>`;
    trackArt.classList.add("rotate");
  }).catch(error => {
    console.error("Playback failed:", error);
    alert("⚠️ Cannot play this track.");
  });
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpauseBtn.innerHTML = `<i class="fa fa-play-circle fa-5x"></i>`;
  trackArt.classList.remove("rotate");
}

function nextTrack() {
  track_index = (track_index + 1) % track_list.length;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  track_index = (track_index - 1 + track_list.length) % track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  if (curr_track.duration) {
    curr_track.currentTime = curr_track.duration * (seekSlider.value / 100);
  }
}

function setVolume() {
  curr_track.volume = volumeSlider.value / 100;
}

function seekUpdate() {
  if (!isNaN(curr_track.duration)) {
    const progress = (curr_track.currentTime / curr_track.duration) * 100;
    seekSlider.value = progress;

    const formatTime = t => {
      const mins = String(Math.floor(t / 60)).padStart(2, '0');
      const secs = String(Math.floor(t % 60)).padStart(2, '0');
      return `${mins}:${secs}`;
    };

    currTime.textContent = formatTime(curr_track.currentTime);
    totalDuration.textContent = formatTime(curr_track.duration);
  }
}

loadTrack(track_index);
