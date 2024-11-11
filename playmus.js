"use strict";
const musicTitleEl = document.getElementById("music_title");
const playerProgressEl = document.getElementById("player_progress");
const progressEl = document.getElementById("progress");
const currentTimeEl = document.getElementById("current_time");
const durationEl = document.getElementById("duration");
const prevBtnEl = document.getElementById("prev");
const playvBtnEl = document.getElementById("play");
const nextvBtnEl = document.getElementById("next");
const songs = [
  {
    path: "music/01znaesh.mp3",
    displayName: "Знаешь ли ты",
  },
  {
    path: "music/02neotdam.mp3",
    displayName: "Не отдам",
  },
  {
    path: "music/03vetrom.mp3",
    displayName: "Ветром стать",
  },
  {
    path: "music/04son.mp3",
    displayName: "Сон",
  },
  {
    path: "music/05moyray.mp3",
    displayName: "Мой рай",
  },
  {
    path: "music/06portret.mp3",
    displayName: "Портрет",
  },
  {
    path: "music/07dozd.mp3",
    displayName: "Дождь",
  },
  {
    path: "music/08smdihrem.mp3",
    displayName: "Сантиметры дыхания",
  },
  {
    path: "music/09vesna.mp3",
    displayName: "Весна",
  },
  {
    path: "music/10zima.mp3",
    displayName: "Зима",
  },
  {
    path: "music/11kakletat.mp3",
    displayName: "Как летать",
  },
  {
    path: "music/12nauletat.mp3",
    displayName: "Научусь летать",
  },
  {
    path: "music/13shtampi.mp3",
    displayName: "Штампы",
  },
  {
    path: "music/14doroga.mp3",
    displayName: "Дорога",
  },
  {
    path: "music/15oskolki.mp3",
    displayName: "Осколки",
  },
  {
    path: "music/16sekrnet.mp3",
    displayName: "Секретов нет",
  },
];
const music = new Audio();
let musicIndex = 0;
let isPlaying = false;
//================== Play Song  True or False====================
function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}
//================== Play Music====================
function playMusic() {
  isPlaying = true;
  playvBtnEl.classList.replace("fa-play", "fa-pause");
  playvBtnEl.setAttribute("title", "pause");
  music.play();
}
//================== Pause Music====================
function pauseMusic() {
  isPlaying = false;
  playvBtnEl.classList.replace("fa-pause", "fa-play");
  playvBtnEl.setAttribute("pause", "title");
  music.pause();
}
//================== Load Songs ====================
function loadMusic(songs) {
  music.src = songs.path;
  musicTitleEl.textContent = songs.displayName;
}
//================== Change Music ====================
function changeMusic(direction) {
  musicIndex = musicIndex + direction + (songs.length % songs.length);
  loadMusic(songs[musicIndex]);
  playMusic();
}
//================== Set Progress ====================
function setProgressBar(e) {
  const width = playerProgressEl.clientWidth;
  const xValue = e.offsetX;
  music.currentTime = (xValue / width) * music.duration;
}
//================== Set Progress ====================
function updateProgressBar() {
  const { duration, currentTime } = music;
  const ProgressPercent = (currentTime / duration) * 100;
  progressEl.style.width = `${ProgressPercent}%`;
  const formattime = (timeRanges) =>
    String(Math.floor(timeRanges)).padStart(2, "0");
  durationEl.textContent = `${formattime(duration / 60)} : ${formattime(
    duration % 60,
  )}`;
  currentTimeEl.textContent = `${formattime(currentTime / 60)} : ${formattime(
    currentTime % 60,
  )}`;
}
//================= Btn Events========================
const btnEvents = () => {
  playvBtnEl.addEventListener("click", togglePlay);
  nextvBtnEl.addEventListener("click", () => changeMusic(1));
  prevBtnEl.addEventListener("click", () => changeMusic(-1));
  //========= Progressbar===========================
  music.addEventListener("ended", () => changeMusic(1));
  music.addEventListener("timeupdate", updateProgressBar);
  playerProgressEl.addEventListener("click", setProgressBar);
};
//================= Btn Events========================
document.addEventListener("DOMContentLoaded", btnEvents);
//============ Calling Load Music
loadMusic(songs[musicIndex]);

