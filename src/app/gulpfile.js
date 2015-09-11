/**
 * Gulpfile for Trending Now.
 */
var gulp = require('gulp');

// Plugins.
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var notify  = require('gulp-notify');
var plumber = require('gulp-plumber');
var shell   = require('gulp-shell')

gulp.task('application-js', function() {
	return gulp.src([
		'app.js'
		])
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(concat(
			'app.js'
		))
		.pipe(uglify({
			mangle: true,
			preserveComments: false
		}))
		.pipe(gulp.dest('../js/'));
});

gulp.task('application-build', function () {
	return gulp.src('')
		.pipe(shell([
			'cd ../.. && pebble build'
		]))
		.pipe(notify('Trending Now: Built'));
});

gulp.task('application-run', ['application-js', 'application-build'], function () {
	return gulp.src('')
		.pipe(shell([
			'pebble install --emulator basalt ../../build/trending-now.pbw'
		]))
		.pipe(notify('Trending Now: Running'));
});

// Watch js files for changes and trigger a new build.
gulp.task('watch', function() {
	gulp.watch(['app.js'], ['application-run']);
});

gulp.task('default', ['application-run', 'watch']);
