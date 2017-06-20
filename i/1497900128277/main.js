(function () {

	var canvas = document.querySelector('#canvas');
	var ctx = canvas.getContext('2d');
	var w = window.innerWidth;
	var h = window.innerHeight;

	canvas.width = w;
	canvas.height = h;

	var FallingParticleSystem = function () {
		this.particles = [];
		this.windSegments = [];
		this.unit = 1;
		this.domainY = h / this.unit;
		this.domainX = w / this.unit;
		this.density = 0.3;

		this.color = [Math.random() * 360, Math.random() * 100, Math.random() * 255];

		this.clamp = function (v, min, max) {
			if (v < min) return min;
			if (v > max) return max;
			return v;
		}

		this.updateWind = function () {
			var lastWind = this.windSegments[0];
			var vx = this.clamp(lastWind.vx + (Math.random() - 0.5) * 10, 20, 50);
			var vy = this.clamp(lastWind.vy + (Math.random() - 0.5) * 10, -10, 10);
			this.windSegments.unshift({
				vx : vx,
				vy : vy,
				x  : 0
			});

			for (var i = 0; i < this.windSegments.length; i++) {
				var wind = this.windSegments[i];
				
				if (wind.x < 0 || wind.x > w) {
					this.windSegments.splice(i, 1);
					i--;
					continue;
				}

				wind.x += wind.vx;
			}
		}

		this.seedWind = function () {
			this.windSegments = [];
			this.windSegments.push({
				x : 0,
				vx : Math.random() * 50,
				vy : (Math.random() - 0.5) * 20,
			});
		}

		this.newParticles = function () {
			for (var i = h/3; i < 2 * (h/3); i+= this.unit) {
				if (Math.random() >= (1 - this.density)) {
					var start = w / 4 + (Math.sin((i + new Date().getTime() / 5 * window.mouseXScaled) / 15) * 100 * window.mouseYScaled);
					this.particles.push({
						x : start,
						y : i,
						ox : start,
						vx : 0,
						vy : 0,
						color : this.getColor()
					})
				}
			}
		}

		this.clean = function (particle, index) {
			for (var i = 0; i < this.particles.length; i++) {
				var particle = this.particles[i];
				if (particle.y > h || particle.x > particle.ox + (w * .75) + Math.random() * (-.25 * w)) {
					this.particles.splice(i, 1);
					i--;
				}
			}
		}

		this.applyForces = function (particle) {
			for (var i = 0; i < this.windSegments.length; i++) {
				var windSegment = this.windSegments[i];

				if (particle.x - windSegment.x < 100) {
					particle.vx += (Math.random() + 1) * 0.00003 * windSegment.vx;
					particle.vy += (Math.random() + 1) * 0.00003 * windSegment.vy;
				}

				particle.vy += 0.00;
			}
		}

		this.advanceParticle = function (particle) {
			particle.x += particle.vx;
			particle.y += particle.vy;
		}

		this.begin = function () {
			this.seedWind();
			this.newParticles();
		}

		this.advance = function () {
			this.updateWind();

			var p;
			for (var i = 0; i < this.particles.length; i++) {
				p = this.particles[i];
				this.applyForces(p);
				this.advanceParticle(p);
			}

			this.clean();

			this.newParticles();

			this.color[0] = this.clamp(this.color[0] + (Math.random() - 0.5) * 15, 0, 360);
			this.color[1] = this.clamp(this.color[1] + (Math.random() - 0.5) * 15, 0, 100);
		}

		this.getColor = function () {
			return 'hsl(' + Math.round(this.color[0]) + ', 100%, ' + '50%)';
		}
	}

	var fps = new FallingParticleSystem();
	fps.begin();

	ctx.fillStyle = '#121212';
	ctx.fillRect(0,0,w,h);

	var draw = function () {
		fps.advance();

		ctx.fillStyle = '#000';
		ctx.fillRect(0,0,w,h);

		for (var i = 0; i < fps.particles.length; i++) {
			var p = fps.particles[i];
			var x = Math.round(p.x / fps.unit) * fps.unit - fps.unit;
			var y = Math.round(p.y / fps.unit) * fps.unit - fps.unit;
			ctx.fillStyle = p.color;
			ctx.fillRect(x, y, fps.unit, fps.unit);
		}


		window.requestAnimationFrame(draw);
	}

	document.documentElement.addEventListener('mousemove', function (e) {
		window.mouseX = e.clientX;
		window.mouseY = e.clientY;
		window.mouseXScaled = e.clientX / window.innerWidth;
		window.mouseYScaled = e.clientY / window.innerHeight;
	});

	draw();

	console.log(fps.particles);

})();