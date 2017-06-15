(function () {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	var colors = [
		'#F5A22F',
		'#2F3CF5',
		'#08852F',
		'#000',
		'#F22727',
		'#FFF'

	];

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var placeOrange = function (yOffset, t, ballFill, i) {
		var x = ((Math.sin(t / 5) / 2) + .5) * (canvas.width + 200) - 100;
		ctx.beginPath();
		ctx.arc(x, yOffset + 20 + (10 * Math.sin(t * 1.5)), 30, 0, Math.PI * 2, false);
		ctx.fillStyle = ballFill;
		ctx.fill();
	}

	var sine = function (yOffset, k, t, s, fill, ball, ballFill, index) {
		var x = 0;
		var y = yOffset + k * Math.sin(t + x * (s * rands[index]));
		var period = (s * rands[index]) * canvas.width;

		ctx.moveTo(x,y);
		ctx.beginPath();

		var resolution = 50;

		for (var i = 0 ; i < canvas.width + resolution; i += resolution) {
			x = i;
			y = yOffset + k * Math.sin(t + x * (s * rands[index] + 0.02));
			ctx.lineTo(x,y);
		}

		ctx.lineTo(canvas.width, canvas.height);
		ctx.lineTo(0, canvas.height);

		ctx.fillStyle = fill;
		ctx.fill();

		if (ball) {
			placeOrange(yOffset, t, ballFill, index);
		}
	}

	var numLines =90;

	var draw = function () {
		//ctx.fillStyle = '#FFF';
		//ctx.fillRect(0,0,canvas.width, canvas.height);

		var t = new Date().getTime();

		for (var i = 0; i < numLines; i++) {
			sine(i * ((canvas.height + 180) / numLines) - 120, (canvas.height + 180 ) / numLines / 2 + (rands[i] * 30), t / (((i % 5 + 1) * 200 * rands[i]) + 300), 0.01, colors[Math.round(i % colors.length)], false, colors[Math.round(i % colors.length)], i);
		}

		window.requestAnimationFrame(draw);
	}

	var rands = (function () {
		var arr = [];
		for (var i = 0; i < numLines; i++) {
			arr.push(Math.random());
		}
		return arr;
	})();

	draw();


})();