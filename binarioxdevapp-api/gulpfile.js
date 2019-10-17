var gulp = require('gulp')
var del = require('del')

var config = {
  /* src */
  credentials: 'src/credentials/*',

  /* dist */
  credentialsout: 'dist/credentials'
}
gulp.task('copy-credentials', ['clean-credentials'], function () {
  return gulp
    .src(config.credentials)
    .pipe(gulp.dest(config.credentialsout))
})

gulp.task('clean-credentials', function () {
  return del([config.credentialsout])
})

gulp.task('credentials', ['copy-credentials'], function () { })

gulp.task('default', ['credentials'], function () { })
