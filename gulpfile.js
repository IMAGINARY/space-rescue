const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const touch = require('gulp-touch-fd');
const rev = require('gulp-rev');
const del = require('del');
const pugHelper = require('./src/helpers/pug-helper');
const pugData = require('./src/pug/data.js');

const OUTPUT_DIR = '.';
const REV_MANIFEST = './src/pug/rev-manifest.json';

const paths = {
  html: {
    src: ['./src/pug/**/*.pug', '!./src/pug/include/**/*.pug', '!./src/pug/tpl/**/*.pug', '!./src/pug/sections/**/*.pug'],
    watchSrc: ['./src/pug/**/*.pug', REV_MANIFEST],
    dest: `${OUTPUT_DIR}`,
  },
  styles: {
    src: './src/sass/**/*.scss',
    dest: `${OUTPUT_DIR}/assets/css`,
    clean: [`${OUTPUT_DIR}/assets/css/default-??????????.css`, `${OUTPUT_DIR}/assets/css/default-??????????.css.map`],
  },
  scripts: {
    src: './src/js/main.js',
    watchSrc: ['./src/js/**/*.js', '!./src/js/dependencies.js', './app/**/*.js', './common/**/*.js'],
    dest: `${OUTPUT_DIR}/assets/js`,
    filename: 'bundle',
    clean: [`${OUTPUT_DIR}/assets/js/bundle-??????????.min.js`, `${OUTPUT_DIR}/assets/js/bundle-??????????.min.js.map`],
  },
  dependencies: {
    src: './src/js/dependencies.js',
    dest: `${OUTPUT_DIR}/assets/js`,
    filename: 'dependencies',
    clean: [`${OUTPUT_DIR}/assets/js/dependencies-??????????.min.js`, `${OUTPUT_DIR}/assets/js/dependencies-??????????.min.js.map`],
  },
};

function html() {
  return gulp.src(paths.html.src)
    .pipe(pugHelper())
    .pipe(pug({
      pretty: true,
      data: Object.assign({}, pugData),
    }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(touch());
}

function styles() {
  del.sync(paths.styles.clean);
  return gulp.src(paths.styles.src, { sourcemaps: true })
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(rev())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(rev.manifest(REV_MANIFEST, { merge: true }))
    .pipe(gulp.dest('.'));
}

function es(entrypoint, outputName) {
  return browserify({
    extensions: ['.js', '.jsx'],
    entries: entrypoint,
    debug: true,
  })
    .transform('babelify', { presets: ['@babel/env'], sourceMaps: true })
    .on('error', (msg) => {
      // eslint-disable-next-line no-console
      console.error(msg);
    })
    .bundle()
    .pipe(source(`${outputName}.js`))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(uglify())
    .pipe(rename(`${outputName}.min.js`))
    .pipe(rev())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(rev.manifest(REV_MANIFEST, { merge: true }))
    .pipe(gulp.dest('.'));
}

function dependencies() {
  del.sync(paths.dependencies.clean);
  return es(paths.dependencies.src, paths.dependencies.filename);
}

function scripts() {
  del.sync(paths.scripts.clean);
  return es(paths.scripts.src, paths.scripts.filename);
}

function watch() {
  gulp.watch(paths.html.watchSrc || paths.html.src, html);
  gulp.watch(paths.styles.watchSrc || paths.styles.src, styles);
  gulp.watch(paths.dependencies.watchSrc || paths.dependencies.src, dependencies);
  gulp.watch(paths.scripts.watchSrc || paths.scripts.src, scripts);
}

const build = gulp.parallel(html, styles, scripts, dependencies);

exports.html = html;
exports.styles = styles;
exports.dependencies = dependencies;
exports.scripts = scripts;
exports.watch = watch;

exports.build = build;
exports.default = build;
