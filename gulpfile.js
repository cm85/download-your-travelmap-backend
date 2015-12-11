/*global require */
(function (require) {
    'use strict';
    var gulp = require('gulp'),
        lambda = require('gulp-awslambda'),
        zip = require('gulp-zip'),
        jshint = require('gulp-jshint'),
        del = require('del'),
        config = require('./backend/config.json'),

        deploy = function (config) {
            return gulp.src('./backend/**/*')
                .pipe(zip('archive.zip'))
                .pipe(lambda(config.lambda, config));
        };
    gulp.task('copy',['clean'],function(){
        return gulp.src('./node_modules/**/*',{'base':'./node_modules'})
            .pipe(gulp.dest('./backend/node_modules'));
    });

    gulp.task('clean',['jshint'], function () {
        return  del(['./backend/node_modules']);
    });

    gulp.task('deploy_prod',['copy'], function () {
        console.log('deploy prod 🚚🚚🚚🚚🚚🚚🚚🚚🚚');
        config = config.aws.prod;
        deploy(config);


    });

    gulp.task('deploy_stage',['copy'], function () {
        config = config.aws.stage;
        deploy(config);
    });



    gulp.task('jshint', function () {
        return gulp.src(['./gulpfile.js','./test/*.js','./backend/**/*','!./backend/node_modules/**'])
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'));
    });

}(require));
