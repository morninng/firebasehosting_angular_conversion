
// http://qiita.com/sekitaka_1214/items/dda3e53c4c69b145dc97

var through = require('through2');
var PluginError = require('gulp-util').PluginError;
const fs = require('fs');
var PLUGIN_NAME = 'my_gulp_convert';

module.exports = function() {
  /**
   * @this {Transform}
   */
  var transform = function(file, encoding, callback) {
    if (file.isNull()) {
      // 何もしない
      return callback(null, file);
    }

    if (file.isStream()) {
      // ストリームはサポートしない
      this.emit('error', new PluginError(PLUGIN_NAME, PLUGIN_NAME + ':Streams not supported!'));
    }

    // プラグインの処理本体
    if (file.isBuffer()) {
      // ファイルの内容をcontentsに読み込み
      var contents = String(file.contents);
     // console.log("  ----   contents ---- ", contents);

/////// original part


       // console.log( contents );
        const num = contents.indexOf("<head>");
        console.log(num);
        const string_begin = contents.slice(0,num +6);
        //console.log(string_begin);
        console.log("-----------");
        const string_after = contents.slice(num +6);
        //console.log(string_after);

        const converted_string = string_begin + " \n\n  <%= @ogp_data %> \n\n " + string_after;


////////
      // 同じ内容を繰り返す(サンプル)
    //  contents = contents + contents;

      // 編集した内容を出力
      file.contents = new Buffer(converted_string);

      // 処理の完了を通知
      return callback(null, file);
    }

    this.push(file);
    callback();
  };

  return through.obj(transform);
};