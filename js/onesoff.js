var ledger = 
//=require ../ledger.json
;

(function () {
	var currentLocation = (function () {
		var dirs = window.location.pathname.split("/");
		while (dirs[dirs.length - 1] == "") {
			dirs.splice(dirs.length - 1, 1);
		}

		return parseInt(dirs[dirs.length - 1]);
	})();

	var currentIndex = ledger.find(function (entry) { return entry.name == currentLocation }).index;
	var prev = ledger.find(function (entry) { return entry.index == currentIndex - 1 });
	var next = ledger.find(function (entry) { return entry.index == currentIndex + 1 });

	var nav = document.createElement('div');
	nav.classList.add('nav');

	var name = document.createElement('h1');
	name.innerHTML = 'Ones Off';
	nav.appendChild(name);

	var actions = document.createElement('div');
	actions.classList.add('actions');

	var prevLink = document.createElement('a');
	prevLink.innerHTML = '←';
	actions.appendChild(prevLink);

	if (prev) {
		prevLink.href = 'http://kevinzweerink.website/ones-off/i/' + prev.name + '/';
	} else {
		prevLink.classList.add('disabled');
	}

	var nextLink = document.createElement('a');
	nextLink.innerHTML = '→'
	actions.appendChild(nextLink);

	if (next) {
		nextLink.href = 'http://kevinzweerink.website/ones-off/i/' + next.name + '/';
	} else {
		nextLink.classList.add('disabled');
	}

	nav.appendChild(actions);

	document.documentElement.appendChild(nav);

	document.addEventListener('keyup', function (e) {
		if (e.keyCode == 37) {
			prevLink.click();
		} else if (e.keyCode == 39) {
			nextLink.click();
		}
	});
})();