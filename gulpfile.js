const gulp = require('gulp');
const fs = require('fs');
const runSequence = require('run-sequence');
const rimraf = require('rimraf');
const del = require('del')
const shell = require('gulp-shell')
const rename = require("gulp-rename");
const myConvert = require('./gulp-myconvert');
 
gulp.task('hello', function() {
  console.log('Hello gulp!');
});
 

gulp.task('build_angular', () => {
    console.log("<<<<<build_angular>>>>>>>");
   return gulp.src('./src/index.html', {read: false})
  .pipe(shell([
    'echo _____shell_script_start_____',
    'ng build --prod --aot=true',
    'echo ______shell_script_finish____',
  ]))
})



gulp.task('convert', function() {
    console.log("convert");
    return gulp.src([
        './dist/index.html'
    ])
    .pipe(myConvert())
    .pipe(rename('index.ect'))
    .pipe(gulp.dest('./dist'))

});


gulp.task('transfer_convertedfile', ()=>{
    console.log("<<<<<transfer_convertedfile>>>>>>>");
    return gulp.src([
        './dist/index.ect'
    ])
    .pipe(gulp.dest('./../../functions/views'))

})

/*
gulp.task('delete_index_html', ()=>{
    console.log("<<<<<delete_index_html>>>>>>>");
     del(['./dist/index.html', './dist/index.ect'], function(){ 
         console.log("file deleted")
    });

})
*/

gulp.task('transfer_dist_to_public', ()=>{
    console.log("<<<<<transfer_dist_to_public>>>>>>>");
    gulp.src([
        './dist/*', '!./dist/index.html', '!./dist/index.ect'
    ])
    .pipe(gulp.dest('./../../public'))

})



// http://blog.anatoo.jp/entry/20140420/1397995711 

gulp.task('build', function() {
  runSequence('build_angular', 'convert', 'transfer_convertedfile',  'transfer_dist_to_public');
});

gulp.task('move', function() {
  runSequence( 'transfer_convertedfile',  'transfer_dist_to_public');
});
