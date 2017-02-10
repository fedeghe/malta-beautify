This plugin can be used on: **.js**, **.css**, **.html** files  
and even on  **.pug**, **.md**, **.less**, **.scss** after using the right plugin

Options : all options of the [js-beautify package](https://www.npmjs.com/package/js-beautify)

Sample usage:  
```
malta app/source/index.js public/js -plugins=malta-beautify[\"space_after_anon_function\": false,
\"brace_style\": \"collapse\"]
```
or in the .json file :
```
"app/source/index.js" : "public/js -plugins=malta-beautify",
"app/source/index.md" : "public/ -plugins=malta-markdown...malta-beautify",
"app/source/style.less" : "public/css -plugins=malta-less...malta-beautify"
```
or in a script : 
``` js
var Malta = require('malta');
Malta.get().check([
    'app/source/index.js',
    'public/js',
    '-plugins=malta-beautify',
    '-options=showPath:false,watchInterval:500,verbose:0'
    ]).start(function (o) {
        var s = this;
        console.log('name : ' + o.name)
        console.log("content : \n" + o.content);
        'plugin' in o && console.log("plugin : " + o.plugin);
        console.log('=========');
    });
```