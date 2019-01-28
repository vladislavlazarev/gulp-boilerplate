'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const uglify = require('gulp-uglify');
gulp.task('styles', function() {
	return gulp.src('./src/styles/**/*.scss')
		.pipe(sass())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('./build/assets/css/'));
});
gulp.task('images', function() {
	return gulp.src('./src/images/**/*.*')
		.pipe(gulp.dest('./build/assets/images/'));
});
gulp.task('fonts', function() {
	return gulp.src('./src/fonts/**/*.*')
		.pipe(gulp.dest('./build/assets/fonts/'));
});

gulp.task('views', function () {
	return gulp.src('./src/*.pug')
		.pipe(pug({
			// Your options in here.
		}))
		.pipe(gulp.dest('./build/'));
});

gulp.task('scripts', function () {
	return gulp.src('./src/scripts/**/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
		.pipe(gulp.dest('./build/scripts/'));
});

gulp.task('watch', ['sass', 'scripts'], function() {
    gulp.watch('css/**/*.sass', ['sass']);
    gulp.watch('src/**/*.js', ['scripts']);
});
gulp.task('build', gulp.series('styles', 'images', 'fonts', 'views', 'scripts'));
