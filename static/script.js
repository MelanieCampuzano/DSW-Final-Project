$(document).ready(function(){
	function getRandomInt(min, max) { //exclude zero because this will only be used to determine the ball trajectory
		const minCeiled = Math.ceil(min);
		const maxFloored = Math.floor(max);
		n = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
		if (n == 0) n++;
		return n;
	}
	const container = document.getElementById('canvasContainer');
	const canvas = document.getElementById('pongGameCanvas');
	//console.log("the canvas is ", canvas);
	if (!canvas || !container) {
    console.log('Game canvas not found on this page');
    return; // Exit early if no canvas
	}
	const ctx = canvas.getContext("2d");
	// Get the computed size of the parent div
	const containerWidth = container.offsetWidth;
	const containerHeight = container.offsetHeight;
	let interval = 0;
	//for ball
	let x = containerWidth / 2; //initial x position of ball
	let y = containerHeight / 2; //initial y position of the ball
	let dx = getRandomInt(-3, 3); //change in x per frame
	let dy = getRandomInt(-3, 3); //change in y per frame
	const ballRadius = 10;
	//for paddle
	const paddleHeight = 75;
	const paddleWidth = 10;
	let paddleRightY = 0;
	let paddleLeftY = 0;
	let upPressed = false;
	let downPressed = false;
	let WPressed = false;
	let SPressed = false;
	//for score
	let player1Score = 0;
	let player2Score = 0;
	winner = "";
	let gameActive = false;
	
	function drawBall() {
		ctx.beginPath();
		ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
		ctx.fillStyle = "white";
		ctx.fill();
	}
	function drawRightPaddle() {
		ctx.beginPath();
		ctx.rect(0, paddleRightY, paddleWidth, paddleHeight);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
	}
	function drawLeftPaddle() {
		ctx.beginPath();
		ctx.rect(canvas.width-paddleWidth, paddleLeftY, paddleWidth, paddleHeight);
		ctx.fillStyle = "#de0a07";
		ctx.fill();
		ctx.closePath();
	}
	//function drawScore() {
	//	ctx.font = "30px Arial";
	//	ctx.fillStyle = "white";
	//	ctx.fillText(`Player 1: ${player1Score} Player 2: ${player2Score}`, containerWidth / 2 -100, 30);
	//}
	
	function draw() { //should redraw the canvas every frame with updated x and y for the ball
		ctx.clearRect(0, 0, canvas.width, canvas.height);//clear the canvas
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);// redraw the background
		drawBall();//draw the ball in its new position
		drawRightPaddle();//draw paddles in new position
		drawLeftPaddle();
		//drawScore();
		winnerFunction();
		if (gameActive == true) {
			x += dx;
			y += dy;
			//ball hit off left and right walls
			if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
				if ((y > paddleRightY && y < paddleRightY + paddleHeight) || (y > paddleLeftY && y < paddleLeftY + paddleHeight)) { //if the ball hit the paddle
					dx = getRandomInt(-3, 3);
					dy = getRandomInt(-3, 3);
				} else { //if it didnt hit the paddle
					if (x + dx > canvas.width - ballRadius) { //if it hit the right wall
						player1Score++;
						dx = -dx;
					} else if (x + dx < ballRadius) { //if it hit the left wall
						player2Score++;
						dx = -dx;
					}
				}
			}
		}
		//end of game
		if (player1Score >= 1 || player2Score >= 1) {
			console.log("winner function = ", winnerFunction())
			endOfGame();
			if (player1Score >=1) {
				$.post('/gameOver', 
				{
					win: true
				});
			} else {
				$.post('/gameOver', 
				{
					win: false
				});
			}
		}


		//ball hit top and bottom walls
		if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
		  dy = -dy;
		}
		//move paddle with input
		if (upPressed) {
			paddleLeftY = Math.max(paddleLeftY - 7, 0);
		} else if (downPressed) {
			paddleLeftY = Math.min(paddleLeftY + 7, canvas.height-paddleHeight);
		}
		if (WPressed) {
			paddleRightY = Math.max(paddleRightY - 7, 0);
		} else if (SPressed) {
			paddleRightY = Math.min(paddleRightY + 7, canvas.height-paddleHeight);
		}
	}
	function startGame() {
		interval = setInterval(draw, 10);
		document.addEventListener("keydown", keyDownHandler);
		document.addEventListener("keyup", keyUpHandler);
		player1Score = 0;
		player2Score = 0;
		x = containerWidth / 2; 
		y = containerHeight / 2; 
		dx = getRandomInt(-3, 3);
		dy = getRandomInt(-3, 3);
		gameActive = true;
	}
	function winnerFunction() {
		winner = "";
		if (player1Score >= 1) {
			winner = "Player 1";
		}
		if (player2Score >= 1) {
			winner = "Player 2";
		}
		return winner;
	}
	function endOfGame() {
		clearInterval(interval);
		winnerFunction();
		ctx.fillStyle = "gray";
		ctx.strokeStyle = "black";
		ctx.lineWidth = 8;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		let fontSize = canvas.width * 0.05;
		ctx.fillStyle = "black";
		ctx.font = `${fontSize}px Arial`;
		console.log("winner = ", winner);
		ctx.fillText(`The winner is ${winner}`, 10, containerHeight / 2)
		gameActive = false;
	}
	
	function keyDownHandler(e) {
		if (e.key === "Up" || e.key === "ArrowUp") {
			upPressed = true;
		} else if (e.key === "Down" || e.key === "ArrowDown") {
			downPressed = true;
		}
		if (e.key === "w") {
			WPressed = true;
		} else if (e.key === "s") {
			SPressed = true;
		}
	}

	function keyUpHandler(e) {
		if (e.key === "Up" || e.key === "ArrowUp") {
			upPressed = false;
		} else if (e.key === "Down" || e.key === "ArrowDown") {
			downPressed = false;
		}
		if (e.key === "w") {
			WPressed = false;
		} else if (e.key === "s") {
			SPressed = false;
		}
	}
	
	const runButton = 
	document.getElementById("runButton");
	runButton.addEventListener("click", () => {
		startGame();
		//runButton.disabled = true;
	});
	
	function resizeCanvas() {
		// Get the computed size of the parent div
		const containerWidth = container.offsetWidth;
		const containerHeight = container.offsetHeight;

		// Set the canvas attributes (drawing surface) to match the container's size
		canvas.width = containerWidth;
		canvas.height = containerHeight;

		// You must also reposition or redraw your content here after resizing
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		drawBall()
	}

	// Call the function initially to set the size on page load
	$(document).ready(function() {
		resizeCanvas();
	});
	
	$(window).on('resize', resizeCanvas);

	// Add an event listener to resize the canvas when the window size changes
	window.addEventListener('resize', resizeCanvas);
});