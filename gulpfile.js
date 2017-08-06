const gulp = require('gulp');
const fs = require('fs');
const runSequence = require('run-sequence');
const rimraf = require('rimraf');
var del = require('del')
const shell = require('gulp-shell')
 
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


gulp.task('convert_indexhtml', function() {
  console.log('<<<<<convert_indexhtml start>>>>>>>');

     gulp.src( './dist/index.html')
    .pipe(fs.readFile("./dist/index.html", "utf-8", (err, _data) => {

        console.log( _data );
        const num = _data.indexOf("<head>");
        console.log(num);
        const string_begin = _data.slice(0,num +6);
        console.log(string_begin);
        console.log("-----------");
        const string_after = _data.slice(num +6);
        console.log(string_after);

        const converted_string = string_begin + " \n\n  <%= @ogp_data %> \n\n " + string_after;

        console.log(converted_string);

        fs.writeFileSync("./dist/index.ect",converted_string);;
    }))


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
  runSequence('build_angular', 'convert_indexhtml');
});

gulp.task('move', function() {
  runSequence( 'transfer_convertedfile',  'transfer_dist_to_public');
});
