var ledger = 
[{"name":1496955330385,"index":0},{"name":1497486335779,"index":1},{"name":1497900128277,"index":2}]

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

	console.log(prev);
	console.log(next);
})();