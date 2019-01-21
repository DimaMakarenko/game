;
let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let bird = new Image(); // 
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

// Audio
let main = new Audio();
let score_audio = new Audio();
let die = new Audio();

main.src = "audio/radio.mp3";
score_audio.src = "audio/anu.mp3";
die.src = "audio/maslina.mp3";

bird.src = "img/flappy_bird_bird.png";
bg.src = "img/flappy_bird_bg-1.png";
fg.src = "img/flappy_bird_fg-1.png";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeBottom.src = "img/flappy_bird_pipeBottom.png";

let gap = 90; //растояние между препятсвиями
let gravity = 1.8; // гравитация
let score = 0; 
let loadSceen = true;
let countineGame = true;
let bestScore = 0;


document.addEventListener("mousedown", PressKey);
document.addEventListener("keydown", moveUp);
function PressKey(){
	if(loadSceen === true){
		document.getElementById('text').style.opacity = '0';
		document.getElementById('score').style.opacity = '0';
		document.getElementById('bestScore').style.opacity = '0';
		countineGame = true;
		xPos = 10;
		yPos = 150;
		pipe = [];
		pipe[0] = {
			x: cvs.width,
			y: -50
		}
		main.play();
		draw();

		loadSceen = false;
	}
	else{
		moveUp();
	}
}

function moveUp(){
	yPos -= 35; // прыжок
	//fly.play();
}

let pipe = [];
pipe[0] = {
	x: cvs.width,
	y: -50
}
// Bird position
let xPos = 10;
let yPos = 150;


function World(){
	ctx.drawImage(bg, 0, 0);
	ctx.drawImage(fg, 0, cvs.height - fg.height);
}
pipeBottom.onload = World;
function draw(){
	ctx.drawImage(bg, 0, 0);
	if (countineGame === true){


	for (let i in pipe){
		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
		
		pipe[i].x--;

		if(pipe[i].x == 125){
			pipe.push({
				x: cvs.width,
				y: Math.floor(Math.random() * pipeUp.height) - 
				pipeUp.height
			});
		}

		if(xPos + bird.width >= pipe[i].x 
			&& xPos <= pipe[i].x + pipeUp.width 
			&& (yPos <= pipe[i].y + pipeUp.height
			|| yPos + bird.height >= pipe[i].y + pipeUp.height
			+ gap) || yPos + bird.height >= cvs.height - fg.height){
			//location.reload();
			die.play();
			loseGame();
 
		}

		if(pipe[i].x == 5){
			score++;
			score_audio.play();
		}
	}
	

	 ctx.drawImage(fg, 0, cvs.height - fg.height);
	 ctx.drawImage(bird, xPos, yPos);

	yPos += gravity;

	ctx.fillStyle = "#000";
	ctx.font = "25px Verdana";
	ctx.fillText("Score:" + score, 10, cvs.height - 20);

	setTimeout(draw,14);
	}
}

function loseGame(){
	countineGame = false;
	loadSceen = true;
	main.pause();
	if(score > bestScore){
		bestScore = score;
	}
	document.getElementById('text').style.opacity = '1';
	document.getElementById('score').innerHTML = "Score:" + score;
	document.getElementById('score').style.opacity = '1';
	document.getElementById('bestScore').innerHTML = "Best Score:" + bestScore;
	document.getElementById('bestScore').style.opacity = '1';
	
	score = 0;
}
