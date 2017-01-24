
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var jade		= require('gulp-jade');

// Static Server + watching scss/html files
gulp.task('serve', ['sass','jade'], function() {
    browserSync.init({
        server: "./"
    });
});


gulp.task('watch', function(){
	gulp.watch("*.jade", ['jade']);
    gulp.watch("src/css/*.sass", ['sass']);
    // gulp.watch("*.html").on('change', browserSync.reload);
})

//	編譯 SASS 並重新整理
gulp.task('sass', function() {
    return gulp.src("src/css/*.sass")
        .pipe(sass())
        .pipe(gulp.dest("dist/css/"))
        .pipe(browserSync.stream());
});

//	編譯 JADE 並重新整理
gulp.task('jade', function(){
    return gulp.src('*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
})


gulp.task('default', ['serve','watch']);
