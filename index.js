require('malta').checkDeps('js-beautify');

var beautify = require("js-beautify"),
	path = require('path'),
	fs = require('fs');

function malta_beautify(o, options) {

	var self = this,
		name = o.name,
		start = new Date(),
		msg,
		ext = o.name.split('.').pop(),
		proceed = ext in beautify,
		pluginName = path.basename(path.dirname(__filename)),
		doErr = function (e) {
			console.log(('[ERROR on ' + o.name + ' using ' + pluginName + '] :').red());
			console.dir(e);
			self.stop();
		};

	options = options || {};

	if (proceed){
		try {
			o.content = beautify[ext](o.content, options) + "";
		} catch(err) {
			doErr(err);
		}
	}

	return function (solve, reject){
		if (proceed) {
			fs.writeFile(o.name, o.content, function(err) {
				err && doErr(err);
				msg = 'plugin ' + pluginName.white() + ' wrote ' + o.name + ' (' + self.getSize(o.name) + ')';
				solve(o);
				self.notifyAndUnlock(start, msg);
			});
		} else {
			solve(o);
			self.notifyAndUnlock(start, msg);
		}
	};
}
malta_beautify.ext = ['js', 'css', 'html', 'pug', 'md', 'less', 'scss', 'ts', 'coffee'];
module.exports = malta_beautify;