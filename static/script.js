$(document).ready(function(){
	const container = document.getElementById('canvasContainer');
	const canvas = document.getElementById('pongGameCanvas');
	const ctx = canvas.getContext("2d");
	//for ball
	let x = canvas.width / 2; //initial x position of ball
	let y = canvas.height / 2; //initial y position of the ball
	let dx = 1; //change in x per frame
	let dy = 1; //change in y per frame
	const ballRadius = 10;
	//for paddle
	const paddleHeight = 75;
	const paddleWidth = 10;
	//let paddleX = 0;
	let paddleRightY = 0;
	let paddleLeftY = 0;
	let upPressed = false;
	let downPressed = false;
	let WPressed = false;
	let SPressed = false;
	
	function drawBall() {
		ctx.beginPath();
		ctx.arc(x, y, ballRadius, 0, 360);
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
	
	function draw() { //should redraw the canvas every frame with updated x and y for the ball
		ctx.clearRect(0, 0, canvas.width, canvas.height);//clear the canvas
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);// redraw the background
		drawBall()//draw the ball in its new position
		drawRightPaddle()//draw paddles in new position
		drawLeftPaddle()
		x += dx;
		y += dy;
		//ball bounce off walls
		if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
		  dx = -dx;
		}
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
		setInterval(draw, 10);
		document.addEventListener("keydown", keyDownHandler);
		document.addEventListener("keyup", keyUpHandler);
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
		runButton.disabled = true;
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
	resizeCanvas();

	// Add an event listener to resize the canvas when the window size changes
	window.addEventListener('resize', resizeCanvas);
});