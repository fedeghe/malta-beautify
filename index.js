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
		proceed = ext in beautify;

	options = options || {};

	if (proceed){
		o.content = beautify[ext](o.content, options) + "";
	}

	return function (solve, reject){
		if (proceed) {
			fs.writeFile(o.name, o.content, function(err) {
				
				if (err == null) {
					msg = 'plugin ' + path.basename(path.dirname(__filename)).white() + ' wrote ' + o.name + ' (' + self.getSize(o.name) + ')';
				} else {
					console.log('[ERROR] js-beautify says:');
					console.dir(err);
					self.stop();
				}
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