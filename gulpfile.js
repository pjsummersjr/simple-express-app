var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var ts = require("gulp-typescript");
var watch = require("gulp-watch");
var gulpWebpack = require("gulp-webpack");
var path = require('path');
var webpack = require('webpack')

var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", ["web-files","server"]);

gulp.task("server", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task("copy-html", function() {
    return watch("src/web/*.html", {ignoreInitial: false})
        .pipe(gulp.dest("dist/web"));
});

gulp.task("copy-js", function() {
    return gulp.src("src/web/scripts/adal.js")
        .pipe(gulp.dest("dist/web/scripts"));
});

gulp.task("build-js", function(){
    
    return gulp.src("src/web/scripts/app.js")
        .pipe(gulpWebpack({
            output: {
                path: path.join(__dirname, 'dest', 'web', 'scripts'),
                filename: 'app.js'
            },
            devtool:'source-map',
            module: {
                rules: [
                    { test: /\.js$/,  loader: 'babel-loader'}
                ]
            },
            watch:true
        }, webpack))  
        .pipe(gulp.dest("dist/web/scripts"));
})

gulp.task("web-files", ["copy-html", "copy-js","build-js"]);