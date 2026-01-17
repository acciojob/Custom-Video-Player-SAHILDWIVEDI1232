/* Select elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Play / Pause */
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

/* Update Play/Pause button */
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

/* Update progress bar */
function handleProgress() {
  if (!video.duration) return;
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

/* Click progress bar to seek */
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* Skip buttons */
function skip() {
  video.currentTime += Number(this.dataset.skip);
}

/* Volume & playback speed */
function handleRangeUpdate() {
  video[this.name] = this.value;
}

/* Graceful error handling (NO alert) */
video.addEventListener('error', () => {
  console.error('Video failed to load');
  toggle.textContent = '⚠';
});

/* Event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(btn => btn.addEventListener('click', skip));
ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
  range.addEventListener('mousemove', handleRangeUpdate);
});

/* Progress bar dragging */
let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => (mouseDown = true));
progress.addEventListener('mouseup', () => (mouseDown = false));
