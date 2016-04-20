import gulp from 'gulp'
import babel from 'gulp-babel'
import rimraf from 'gulp-rimraf'
import plumber from 'gulp-plumber'
import server from 'gulp-develop-server'
import gutil from 'gulp-util'
import runSequence from 'run-sequence'

/* Build Tasks */

gulp.task('build', () => gulp.src('src/**/*.js')
  .pipe(plumber())
  .pipe(babel())
  .on('error', err => {
    gutil.log(gutil.colors.red('[Code Compilation Error]'))
    gutil.log(gutil.colors.red(err.message))
  })
  .pipe(gulp.dest('build')))

gulp.task('clean-build', () => gulp.src('build', { read: false }).pipe(rimraf()))

gulp.task('watch-build', () => gulp.watch('src/**/*.js', ['build', server.restart]))

gulp.task('project:start', () => server.listen({ path: './build/index.js' }))

/* Watch Tasks */

gulp.task('start-dev', callback => runSequence('clean-build', 'build', 'watch-build', 'project:start', callback))

gulp.task('start', callback => runSequence('clean-build', 'build', 'project:start', callback))
