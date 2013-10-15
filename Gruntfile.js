var fs = require('fs');

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify : {
            test : {
                src : ["./index.js"],
                dest : 'build/m.js',
                options : {
                    standalone : "m"
                }
            }
        },

        uglify : {
            build : {
                src : ['build/m.js'],
                dest : 'build/m.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.registerTask('default', ['browserify','webworkerify','uglify','addLicense']);

    grunt.registerTask('webworkerify','Fixes the browserify bundle so it works in Web Workers',function(){
        var src = fs.readFileSync("build/m.js");
        fs.writeFileSync("build/m.js",src.toString().replace("global.m","self.m"));
    });

    grunt.registerTask('addLicense','Adds the LICENSE to the top of the built files',function(){
        var text = fs.readFileSync("LICENSE").toString();

        var dev = fs.readFileSync("build/m.js").toString();
        var min = fs.readFileSync("build/m.min.js").toString();

        fs.writeFileSync("build/m.js",text+"\n"+dev);
        fs.writeFileSync("build/m.min.js",text+"\n"+min);
    });
};
