var gulp = require('gulp'); //requier gulp
    sass = require('gulp-sass'), //requier gulp sass pour compilé les fichiers css
    browserSync = require('browser-sync'), //requier browserSync pour lancer un serveur
    useref = require('gulp-useref'), //requier useref pour concatener
    minifyCSS = require('gulp-minify-css'), //requier minifycss pour minifier les fichiers css
    imagemin = require('gulp-imagemin'), //requier imagemin pour minifier les images png jpg gif et svg
    cache = require('gulp-cache'), //requier cache
    del = require('del'), //requier del pour le nettoyage
    runSequence = require('run-sequence'), //requier runSequence pour crée une syntaxe de suite de taches a réalisées
    uglify = require('gulp-uglify'), //requier uglify pour minifier les fichiers js
    gulpIf = require('gulp-if'); //requier gulp-if pour les conditions
    
    //pour manipuler le fichier json
var swig = require('gulp-swig');
var data = require('gulp-data'); //mais je sais pas comment ça marche en fait... 


gulp.task('hello', function () { // test! la commande gulp hello affiche Hello Zell dans la console
    console.log('Hello Zell');
});


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


gulp.task('useref', function () {
    // var assets = useref.assets();

    return gulp.src('app/*.html')
        // .pipe(assets)
        // Minifie seulement les fichiers CSS
        .pipe(gulpIf('*.css', minifyCSS()))
        // Minifie seulement les fichiers Javascript
        .pipe(gulpIf('*.js', uglify()))
        // .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});


gulp.task('images', function () { //pour minifier les images
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        // Met en cache les images passées par imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
});

// gulp.task('clean', function () { // supprime le fichier dist
//     del('dist');
// })

// gulp.task('nom-de-la-tache', function (callback) { //lorque non-de-la-table est appeler gulp lance la tache1 quand elle est fini la tache2 ...
//     runSequence('tache1', 'tache2', 'tache3', callback);
// });

// gulp.task('nom-de-la-tache', function (callback) { 
//     runSequence('tache1', ['tache2', 'en', 'parallele'], 'tache3', callback); // dans l'array lance plusieur tache en même temps
// });


gulp.task('default', function (callback) {
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    )
})

gulp.task('build', function (callback) {
    runSequence(['sass', 'useref', 'images',],
        callback
    )
})
