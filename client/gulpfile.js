const gulp = require('gulp')
const gulpFileInclude = require('gulp-file-include')
const gulpHtmlMin = require('gulp-htmlmin')
const gulpCleanCss = require('gulp-clean-css')
const browserSync = require('browser-sync').create()
const terser = require('gulp-terser')
const del = require('del')

const paths = {
  enter: {
    base: './src/',
    index: './src/index.html',
    html: './src/views/**.html',
    includes: './src/includes/**.html',
    components: './src/components/**/*.js',
    js: './src/js/*.js',
    assets: './assets/**.*',
    css: './assets/css/*.css'
  },
  output: {
    base: './dist/',
    assets: './dist/assets/',
    css: './dist/assets/css/',
    js: './dist/assets/js/',
    html: './dist/assets/views/',
    components: './dist/assets/components/'
  }
}

gulp.task('index', function () {
  return gulp
    .src([paths.enter.index])
    .pipe(
      gulpFileInclude({
        prefix: '@@',
        basepath: './src/includes/',
        context: {
          environment: 'development'
        }
      })
    )
    .pipe(gulpHtmlMin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest(paths.output.base))
    .pipe(browserSync.stream())
})

gulp.task('html', function () {
  return gulp
    .src([paths.enter.html])
    .pipe(
      gulpFileInclude({
        prefix: '@@',
        basepath: './src/includes/',
        context: {
          environment: 'development'
        }
      })
    )
    .pipe(gulpHtmlMin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest(paths.output.html))
    .pipe(browserSync.stream())
})

gulp.task('css', function () {
  return gulp.src([paths.enter.css]).pipe(gulpCleanCss()).pipe(gulp.dest(paths.output.css)).pipe(browserSync.stream())
})

gulp.task('js', function () {
  return gulp.src([paths.enter.js]).pipe(terser()).pipe(gulp.dest(paths.output.js)).pipe(browserSync.stream())
})

gulp.task('components', function () {
  return gulp
    .src([paths.enter.components])
    .pipe(terser())
    .pipe(gulp.dest(paths.output.components))
    .pipe(browserSync.stream())
})

gulp.task('assets', function () {
  return gulp.src([paths.enter.assets]).pipe(gulp.dest(paths.output.assets)).pipe(browserSync.stream())
})

gulp.task('clean:dist', function () {
  return del([paths.output.base])
})

gulp.task(
  'serve',
  gulp.series('clean:dist', 'css', 'components', 'js', 'html', 'index', 'assets', function () {
    browserSync.init({
      server: paths.output.base
    })

    gulp.watch([paths.enter.css], gulp.series('css'))
    gulp.watch([paths.enter.components], gulp.series('components'))
    gulp.watch([paths.enter.js], gulp.series('js'))
    gulp.watch(
      [paths.enter.includes, paths.enter.components, paths.enter.index, paths.enter.html],
      gulp.series('html', 'index')
    )
    gulp.watch([paths.enter.assets], gulp.series('assets'))
  })
)

gulp.task('default', gulp.series('serve'))
