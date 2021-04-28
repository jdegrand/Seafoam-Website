let video = document.getElementById("guitar");

let videoDuration;
let currentTime = 0;

function handleScroll(event) {
    const scrollTop = document.documentElement.scrollTop;
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
    let currentTime = scrollTop / maxScrollTop * videoDuration;
    console.log(currentTime);
    video.currentTime = currentTime;
}

function finishedLoadingVideo(event) {
   videoDuration = video.duration;
   window.addEventListener('scroll', handleScroll);
}

video.addEventListener('loadeddata', finishedLoadingVideo);