/* Select elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Play / Pause toggle */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

/* Update play button icon */
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

/* Update progress bar */
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

/* Seek video when clicking progress bar */
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* Skip forward / backward */
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

/* Handle volume & playback speed */
function handleRangeUpdate() {
  video[this.name] = this.value;
}

/* Error handling */
video.addEventListener('error', () => {
  alert('Video failed to load. Please check the file.');
});

/* Event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
