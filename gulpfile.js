var include = require('gulp-include');
var gulp = require('gulp');
var jsonfile = require('jsonfile');
var ncp = require('ncp').ncp;
var rimraf = require('gulp-rimraf');

var ledgerPath = './ledger.json';

gulp.task('new', function () {
	var ledger = jsonfile.readFileSync(ledgerPath);
	var name = new Date().getTime();

	ledger.push({
		name : name,
		index : ledger.length
	});

	jsonfile.writeFileSync(ledgerPath, ledger);

	gulp.src('./js/onesoff.js')
		.pipe(include())
		.pipe(gulp.dest('./'))

	ncp('./_template', './i/' + name);
});

gulp.task('script', function () {
	gulp.src('./js/onesoff.js')
		.pipe(include())
		.pipe(gulp.dest('./'))
});

// THIS WILL DELETE ALL YOUR WORK
gulp.task('debug-clean', function () {
	var ledger = [];
	jsonfile.writeFileSync(ledgerPath, ledger);
	
	gulp.src('./i/*')
		.pipe(rimraf());
})