(function () {
	var canvas = document.querySelector('#sketch');
	var ctx = canvas.getContext('2d');

	var w = window.innerWidth;
	var h = window.innerHeight;

	var r = 30;

	var green = 'rgb(85,185,112)';
	var blue = 'rgb(12, 95, 255)';
	var colorSwitch = true;

	canvas.width = w;
	canvas.height = h;

	ctx.fillStyle = '#000';
	ctx.fillRect(0,0,w,h);

	function ball () {
		var r = Math.random() * 30 + 20;
		return {
			x : Math.random() * (w - (2 * r)) + r,
			y : Math.random() * (h - (2 * r)) + r,
			vx : (Math.random() - .5) * 3 + 1,
			vy : (Math.random() - .5) * 3 + 1,
			color : randomColor(),
			altColor : Math.random() > 0.5 ? '#FFF' : '#000',
			r : r,
			tOffset : Math.random() * 100000
		}
	}

	var colors = [
		'rgb(85,185,112)',
		'rgb(12, 95, 255)',
		'rgb(219,102,53)',
	]

	function randomColor () {
		var rand = Math.random();
		return colors[Math.round(rand * (colors.length - 1))];
	}

	function nBalls (n) {
		var balls = [];
		for (var i = 0; i < n; i++) {
			balls.push(ball());
		}
		return balls;
	}

	var balls = nBalls(Math.round(Math.random() * 3 + 2));

	var blackHole = {
		t : new Date().getTime() / 1000,
		r : 200,
		x : 0,
		y : 0
	}

	function update () {
		blackHole.t = new Date().getTime() / 1000;
		blackHole.x = (Math.sin(blackHole.t) * blackHole.r) + w/2;
		blackHole.y = (Math.cos(blackHole.t) * blackHole.r) + h/2;

		for (var i = 0; i < balls.length; i++) {
			var ball = balls[i];

			ball.vx += ((blackHole.x - ball.x) * .0001);
			ball.vy += ((blackHole.y - ball.y) * .0001);

			ball.radius = (Math.sin((new Date().getTime() - ball.tOffset) / 300) + 1) * ball.r;

			if ((ball.radius + 20 > ball.x && ball.vx < 0) || (ball.x > w - ball.radius - 20 && ball.vx > 0)) {
				ball.vx *= -1;
			}

			if ((ball.radius + 20 > ball.y && ball.vy < 0) || (ball.y > h - ball.radius - 20 && ball.vy > 0)) {
				ball.vy *= -1;
			}

			ball.x += ball.vx;
			ball.y += ball.vy;
		}
	}

	function draw () {
		for (var i = 0; i < balls.length; i++) {
			var ball = balls[i];

			if (colorSwitch) {
				ctx.fillStyle = ball.color;
			} else {
				ctx.fillStyle = ball.altColor;
			}

			ctx.beginPath();
			ctx.arc(ball.x, ball.y, ball.radius < 0 ? 0 : ball.radius, 0, Math.PI * 2, false);
			ctx.fill();
		}
		

		colorSwitch = !colorSwitch;
	}

	function loop () {

		update();
		draw();

		window.requestAnimationFrame(loop);
	}

	loop();
})();