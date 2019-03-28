"use strict";

let sessionTimeHours = 0;
let sessionTimeMinutes = 25;
let sessionTimeSeconds = 0;
let run;
const currentPeriod = document.getElementById('current-period');
const breakTime = document.getElementById('breakTimeMinutes');
const sessionTime = document.getElementById('sessionTimeMinutes');
const board = document.getElementById('board');
const sessionUp = document.getElementById('session-up');
const breakUp = document.getElementById('break-up');
const sessionDown = document.getElementById('session-down');
const breakDown = document.getElementById('break-down');

makeBoardTime();
addEvents();
document.getElementById('play').onclick = () => {
	removeEvents()
	run = setInterval(countDown, 1000);
};
document.getElementById('pause').onclick = () => {
	clearInterval(run);
};
document.getElementById('reset').onclick = () => {
	clearInterval(run);
	addEvents();
	sessionTimeHours = 0;
	sessionTimeMinutes = 25;
	sessionTimeSeconds = 0;
	breakTime.textContent = '5';
	sessionTime.textContent = '25';
	makeBoardTime();
	board.style.color = 'white';
};
document.getElementById('stop').onclick = () => {
	clearInterval(run);
	sessionUp.addEventListener('click', setTimeUp);
	breakUp.addEventListener('click', setTimeUp);
	sessionDown.addEventListener('click', setTimeDown);
	breakDown.addEventListener('click', setTimeDown);
	convert(sessionTime.textContent);
	makeBoardTime();
	board.style.color = 'white';
};

function setTimeUp(e) {
	if (e.target.previousElementSibling.textContent < 1440) {
	    e.target.previousElementSibling.textContent++;
	}
	convert(sessionTime.textContent);
	makeBoardTime();
}

function setTimeDown(e) {
	if (e.target.nextElementSibling.textContent > 1) {
	    e.target.nextElementSibling.textContent--;
	}
	convert(sessionTime.textContent);
	makeBoardTime();
}

function makeBoardTime() {
    let hours = (sessionTimeHours < 10) ? '0' + sessionTimeHours: sessionTimeHours;
    let minutes = (sessionTimeMinutes < 10) ? '0' + sessionTimeMinutes: sessionTimeMinutes;
    let seconds = (sessionTimeSeconds < 10) ? '0' + sessionTimeSeconds: sessionTimeSeconds;
    board.textContent = hours + ':' + minutes + ':' + seconds;
}

function convert(minutes) {
    sessionTimeHours = Math.floor(minutes / 60);
    sessionTimeMinutes = Math.floor(minutes - sessionTimeHours*60);
    sessionTimeSeconds = Math.floor(minutes*60 - sessionTimeHours*3600 - sessionTimeMinutes*60);
}

function countDown() {
    let seconds = sessionTimeHours * 3600 + sessionTimeMinutes*60 + sessionTimeSeconds;
    if(seconds <= 6) {
    	board.style.color = 'red'; 
    } else if (seconds > 6 && seconds <= 15) {
    	board.style.color = 'yellow';
    } else {
    	board.style.color = 'green';
    }
    if (seconds != 0) {
	    seconds--;
	    convert(seconds / 60);
	    makeBoardTime();
	} else if (currentPeriod.textContent == 'Session') {
		currentPeriod.textContent = 'Break';
		convert(breakTime.textContent);
	    makeBoardTime();
	    board.style.color = 'white';

	} else {
		currentPeriod.textContent = 'Session';
		convert(sessionTime.textContent);
	    makeBoardTime();
	    board.style.color = 'white';
	}
}

function addEvents() {
	sessionUp.addEventListener('click', setTimeUp);
	breakUp.addEventListener('click', setTimeUp);
	sessionDown.addEventListener('click', setTimeDown);
	breakDown.addEventListener('click', setTimeDown);
}

function removeEvents() {
	sessionUp.removeEventListener('click', setTimeUp);
	breakUp.removeEventListener('click', setTimeUp);
	sessionDown.removeEventListener('click', setTimeDown);
	breakDown.removeEventListener('click', setTimeDown);
}