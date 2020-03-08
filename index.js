const beautify = require("js-beautify"),
    path = require('path'),
    fs = require('fs');

function malta_beautify(o, options) {
    
    const self = this,
        start = new Date(),
        ext = o.name.split('.').pop(),
        proceed = ext in beautify,
        pluginName = path.basename(path.dirname(__filename));
        
    let msg;

    options = options || {};

    return (solve, reject) => {
        if (proceed) {
            try {
                o.content = beautify[ext](o.content, options) + "";
                fs.writeFile(o.name, o.content, err => {
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