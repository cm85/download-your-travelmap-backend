/*global require */
(function (require) {
    'use strict';
    var gulp = require('gulp'),
        lambda = require('gulp-awslambda'),
        zip = require('gulp-zip'),
        jshint = require('gulp-jshint'),
        del = require('del'),

        deploy = function (env) {
            var config = require('./backend/config.' + env + '.json');
            return gulp.src(['./backend/**/*'])
                .pipe(zip('archive.zip'))
                //.pipe(gulp.dest('.'));
                .pipe(lambda(config.aws.lambda, config));
        };
    gulp.task('copy',['clean'],function(){
        return gulp.src('./node_modules/**/*',{'base':'./node_modules'})
            .pipe(gulp.dest('./backend/node_modules'));
    });

    gulp.task('clean',['jshint'], function () {
        return  del(['./backend/node_modules']);
    });

    gulp.task('deploy_prod',['copy'], function () {
        var buildNumber = require('./backend/buildNumber');
        console.log('buildNumber: '+buildNumber.buildNumber);
        console.log('deploy prod 🚚🚚🚚🚚🚚🚚🚚🚚🚚');
        deploy('prod');

    });

    gulp.task('deploy_stage',['copy'], function () {
        deploy('stage');
    });



    gulp.task('jshint', function () {
        return gulp.src(['./gulpfile.js','./test/*.js','./backend/**/*.js','!./backend/node_modules/**'])
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'));
    });

}(require));
