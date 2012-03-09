var _commands = [
  'info'
  , 'clone'
];

njs = module.exports;
njs.commands = {};

_commands.forEach(function(c) {
  njs.commands[c] = require(__dirname+'/commands/'+c+'.js');
});

njs.load = function(command, args) {
  if (njs.commands[command]) {
    njs.commands[command](args);
  } else {
    process.exit(1);
  }
};
