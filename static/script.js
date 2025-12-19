$(document).ready(function(){
	$(document).keydown(function(e) {
		//console.log(e.which);
		const player1 = document.querySelector("#player1");
		const player2 = document.querySelector("#player2");
		const canvasContainer = document.querySelector("#canvasContainer");
		//console.log($("#player2").length); // Should be 1
		//console.log(player2, canvasContainer);
		if (e.which === 38) { // up arrow key
			if (player2.offsetTop >= canvasContainer.offsetTop) {
				$("#player2").finish().animate({
					top: "-=5"
				});
			}
		}
		if (e.which == '87') { //w
			if (player1.offsetTop >= canvasContainer.offsetTop) {
				$("#player1").finish().animate({
					top: "-=5"
				});
			}
        }
		if (e.which == '40') { //down arrow key
			if (player2.offsetTop + player2.offsetHeight <= canvasContainer.offsetTop + canvasContainer.offsetHeight) {
				$("#player2").finish().animate({
					top: "+=5"
				});
			}
        }
		if (e.which == '83') { //s
			if (player1.offsetTop + player1.offsetHeight <= canvasContainer.offsetTop + canvasContainer.offsetHeight) {
				$("#player1").finish().animate({
					top: "+=5"
				});
			}
        }
    });
	function resizeCanvas() {
		const container = document.getElementById('canvasContainer');
		const canvas = document.getElementById('pongGameCanvas');
		const ctx = canvas.getContext("2d");

		// Get the computed size of the parent div
		const containerWidth = container.offsetWidth;
		const containerHeight = container.offsetHeight;

		// Set the canvas attributes (drawing surface) to match the container's size
		canvas.width = containerWidth;
		canvas.height = containerHeight;

		// You must also reposition or redraw your content here after resizing
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		drawBall(100, 100)
	}

	// Call the function initially to set the size on page load
	resizeCanvas();

	// Add an event listener to resize the canvas when the window size changes
	window.addEventListener('resize', resizeCanvas);
	
	function drawBall(x, y) {
		const canvas = document.getElementById('pongGameCanvas');
		const ctx = canvas.getContext("2d");
		ctx.beginPath();
		ctx.arc(x, y, 10, 0, 360);
		ctx.fillStyle = "white";
		ctx.fill();
	}
});