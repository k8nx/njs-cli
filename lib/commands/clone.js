module.exports = clone

var request = require('request');
var step = require('step');
var http = require('http');

function clone(args, fn) {
  if (args.length == 0) {
    console.error('PACKAGE_NAME required');
    process.exit(1);
  }
  var id = args[0];
  request({
    method: 'GET'
    , uri: 'http://startic.kr/njs/package/'+id
    , headers: {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'}
  }, function(err, rs) {
    try {
      var pkg = JSON.parse(rs.body).row;
      if (pkg && pkg.repository) {
        var repo = pkg.repository;
        console.log('type:', repo.type, 'url:', repo.url);
        if (pkg.repository.type != 'git') {
          console.error('the package found, but its scm isn\'t git.');
          process.exit(1);
        } else {
          var url = repo.url;
          // replace read/write url with read only url (github)
          url = url.replace('git@github.com:', 'git://github.com/');
          var spawn = require('child_process').spawn;
          var child = spawn('git', ['clone', url]);
          child.stdout.pipe(process.stdout);
          child.stderr.pipe(process.stderr);
        }
      }
    } catch (e) {
      console.error(e);
    }
  });
};
