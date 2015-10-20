(function() {
	'use strict';
	var gulp = require('gulp');
	var concat = require('gulp-concat');
	var minify_css = require('gulp-minify-css');
	var rename = require('gulp-rename');
	var uglify = require('gulp-uglify');
	var optimize = require('amd-optimize');

	gulp.task('css', function() {
		gulp.src('./src/style/*.css').pipe(concat('style.css')).pipe(rename('style.min.css')).pipe(minify_css()).pipe(gulp.dest('dist/css'));
	});
	gulp.task('js', function() {
		gulp.src('src/js/*.js')
		.pipe(optimize('main', {
			paths: {
				'jquery': './src/js/jquery-1.11.0',
				'jqueryUI': './src/js/jquery-ui.min'
			}
		}))
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
	});
	gulp.task('html', function() {
		gulp.src('./src/*.html').pipe(gulp.dest('dist'));
	})
})()

