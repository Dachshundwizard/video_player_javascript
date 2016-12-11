window.addEventListener('load', function() {

    // Video Container
    video = document.getElementById('video'); //Using video element from the HTML file

    // Progress Bar Container
    pbarContainer = document.getElementById('pbar-container');
    pbar = document.getElementById('pbar');

    // Buttons Container
    playButton = document.getElementById('play-button');
    timeField = document.getElementById('time-field');

    video.load();
    video.addEventListener('canplay', function() {

        playButton.addEventListener('click', playOrPause, false); // When the button is clcicked
        pbarContainer.addEventListener('click', skip, false);
    }, false);

}, false);

function playOrPause() {
    if(video.paused) {
        video.play();
        playButton.src = 'images/pause.png';
        update = setInterval(updatePlayer, 30);
    } else {
        video.pause();
        playButton.src = 'images/play.png';
        window.clearInterval(update);
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
    if(seconds.toString().length === 1) seconds = '0' + seconds;
    return minutes + ":" + seconds;
}
