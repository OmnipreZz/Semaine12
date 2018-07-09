var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence');



gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss') // **/*.scss cible tous les fichiers ayant une extension .scss dans le dossier racine et dans n’importe quel dossier enfant.
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('watch', ['browserSync', 'sass'], function () { // gulp watch pour compilé tous les fichiers scss en live et browser pour le serveur
    gulp.watch('app/scss/**/*.scss', ['sass']);
    // autres observations
    gulp.watch('app/*.html', browserSync.reload); // rafraichissement auto du fichier html
    gulp.watch('app/js/**/*.js', browserSync.reload); // rafraichissement auto du fichier des fichiers js
})


gulp.task('browserSync', function () { // pour créer un serveur
    browserSync({
        server: {
            baseDir: 'app'
        },
    })
})


gulp.task('default', function (callback) {
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    )
})

