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
        pluginName = path.basename(path.dirname(__filename));

    options = options || {};

    return function (solve, reject) {
        if (proceed) {
            try {
                o.content = beautify[ext](o.content, options) + "";
                fs.writeFile(o.name, o.content, function (err) {
                    if (err) {
                        self.doErr(err, o, pluginName);
                    }
                    msg = 'plugin ' + pluginName.white() + ' wrote ' + o.name + ' (' + self.getSize(o.name) + ')';
                    err
                        ? reject(`Plugin ${pluingName} write error:\n${err}`)
                        : solve(o);
                    self.notifyAndUnlock(start, msg);
                });
            } catch (err) {
                reject(`Plugin ${pluingName} beautyfication error:\n${err}`)
                self.doErr(err, o, pluginName);
            }
        } else {
            solve(o);
            self.notifyAndUnlock(start, msg);
        }
    };
}
malta_beautify.ext = ['js', 'css', 'html', 'pug', 'md', 'less', 'scss', 'ts', 'coffee', 'haml'];
module.exports = malta_beautify;