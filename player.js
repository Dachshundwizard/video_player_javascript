window.addEventListener('load', function() {

    // Video Container
    video = document.getElementById('video'); //Using video element from the HTML file
    pauseScreen = document.getElementById('screen');
    screenButton = document.getElementById('1button');


    // Progress Bar Container
    pbarContainer = document.getElementById('pbar-container');
    pbar = document.getElementById('pbar');

    // Buttons Container
    playButton = document.getElementById('play-button');
    timeField = document.getElementById('time-field');
    soundButton = document.getElementById('sound-button');
    sbarContainer = document.getElementById('sbar-container');
    sbar = document.getElementById('sbar');
    fullscreenButton = document.getElementById('fullscreen-button');

    video.load();
    video.addEventListener('canplay', function() {

        playButton.addEventListener('click', playOrPause, false); // When the button is clcicked
        pbarContainer.addEventListener('click', skip, false);
        updatePlayer();
        soundButton.addEventListener('click', muteOrUnmute, false);
        sbarContainer.addEventListener('click', changeVolume, false); // This will listen for a click on the sound bar, and will change the volume acordingly
        fullscreenButton.addEventListener('click', fullscreen, false);
        screenButton.addEventListener('click', playOrPause, false); // Clicking the button will cause video to play, using same function

    }, false);

}, false);

function playOrPause() {
    if(video.paused) {
        video.play();
        playButton.src = 'images/pause.png';
        update = setInterval(updatePlayer, 30);

        pauseScreen.style.display = 'none';
    } else {
        video.pause();
        playButton.src = 'images/play.png';
        window.clearInterval(update);

        pauseScreen.style.display = 'block';
    }
}

function updatePlayer() {
    var percentage = (video.currentTime/video.duration)*100;
    pbar.style.width = percentage + '%';
    timeField.innerHTML = getFormattedTime();
    if(video.ended) {
        window.clearInterval(update);
        playButton.src = 'images/replay.png';
    }
}

function skip(ev) { // ev is short for click event.
    var mouseX = ev.pageX - pbarContainer.offsetLeft; // We want to get the x coord. of the mouse, and we subtract the remaining 8px off to the left of the window.
    var width = window.getComputedStyle(pbarContainer).getPropertyValue('width');// Grabbing width of a specific element within document
    width = parseFloat(width.substr(0, width.length - 2));

    video.currentTime = (mouseX/width)*video.duration;
    updatePlayer();
}

function getFormattedTime() {
    // 3:32 ex
    var seconds = Math.round(video.currentTime); // It will return a value of seconds for how many have passed in the duration
    var minutes = Math.floor(seconds/60);
    if(minutes > 0) seconds -= minutes*60; // If minutes hits 1, seconds will reset.
    if(seconds.toString().length === 1) seconds = '0' + seconds; // Adding the "0" in front of the actual second while it is less than 10.

    var totalSeconds = Math.round(video.duration); // This is initiating the capture of the x.xx/(X.XX) <-- Durating of the whole video, specifically for display.
    var totalMinutes = Math.floor(totalSeconds/60);
    if(totalMinutes > 0) totalSeconds -= totalMinutes*60;
    if(totalSeconds.toString().length === 1) totalSeconds = '0' + totalSeconds;

    return minutes + ":" + seconds + '/' + totalMinutes + ':' + totalSeconds;
}

function muteOrUnmute() {
    if(!video.muted){
        video.muted = true;
        soundButton.src = 'images/mute.png';
        sbar.style.display = 'none'; // When the video is muted, the sound bar fill-in will drop to zero
    } else {
        video.muted = false;
        soundButton.src = 'images/sound.png';
        sbar.style.display = 'block'; // sbar comes back to where it was
    }
}

function changeVolume(ev) {
    var mouseX = ev.pageX - sbarContainer.offsetLeft;
    var width = window.getComputedStyle(sbarContainer).getPropertyValue('width');// Grabbing width of a specific element within document
    width = parseFloat(width.substr(0, width.length - 2)); // Dropping pixel extension at the end.

    video.volume = (mouseX/width); // )  0 coresponds with 0 sound and 1 is full sound
    sbar.style.width = (mouseX/width)*100 + '%';
    video.muted = false;
    soundButton.src = 'images/sound.png';
    sbar.style.display = 'block';
}

function fullscreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    }
    else if (video.mozRequestFullscreen) {
        video.mozRequestFullscreen();
    }
    else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}
