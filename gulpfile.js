const gulp = require('gulp');
const fs = require('fs');
const runSequence = require('run-sequence');
 
gulp.task('hello', function() {
  console.log('Hello gulp!');
});
 

gulp.task('convert_indexhtml', function() {
  console.log('convert_indexhtml start');

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
    console.log("transfer_convertedfile");
    gulp.src([
        './dist/index.ect'
    ])
    .pipe(gulp.dest('./../../functions/views'))

})


gulp.task('delete_index_html', ()=>{
    console.log("delete_index_html");

})

gulp.task('transfer_dist_to_public', ()=>{
    console.log("transfer_dist_to_public");

})



// http://blog.anatoo.jp/entry/20140420/1397995711 

gulp.task('build', function() {
  runSequence('convert_indexhtml', 'transfer_convertedfile', 'delete_index_html', 'transfer_dist_to_public');
});

gulp.task('sequence_test', function() {
  runSequence('transfer_convertedfile', 'delete_index_html', 'transfer_dist_to_public');
});
