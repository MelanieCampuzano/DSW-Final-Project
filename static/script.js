$(document).ready(function(){
	$(document).keydown(function(e) {
        if (e.which == '38') { //up arrow key
            $(".player2").finish().animate({
                top: "-=5"
            });
        }
		if (e.which == '87') { //w
            $(".player1").finish().animate({
                top: "-=5"
            });
        }
		if (e.which == '40') { //down arrow key
            $(".player2").finish().animate({
                top: "+=5"
            });
        }
		if (e.which == '83') { //s
            $(".player1").finish().animate({
                top: "+=5"
            });
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
    ctx.beginPath();
	ctx.arc(95, 50, 40, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.fillStyle = "green";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Call the function initially to set the size on page load
resizeCanvas();

// Add an event listener to resize the canvas when the window size changes
window.addEventListener('resize', resizeCanvas);
});