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

	console.log(prev);
	console.log(next);
})();