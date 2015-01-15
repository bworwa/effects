/*global module */

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: ['gruntfile.js', 'src/*.js', 'src/**/*.js'],
            dev: ['src/*.js', 'src/**/*.js']
        },

        concat: {
            dev: {
                src: [
                    'src/effects.js',
                    'src/css.js',
                    'src/defaults/*.js',
                    'src/utils/isvalidelement.js',
                    'src/utils/isvalidcallbackfunction.js',
                    'src/utils/matrixtodegrees.js',
                    'src/effects/hide.js',
                    'src/effects/show.js',
                    'src/effects/fadein.js',
                    'src/effects/fadeout.js',
                    'src/effects/pulsate.js',
                    'src/effects/rotatez.js'
                ],
                dest: 'build/dev/effects.js'
            }
        },

        watch: {
            dev: {
                files: [
                    'src/*.js',
                    'src/**/*.js'
                ],
                tasks: ['dev']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('dev', ['jshint:dev', 'concat:dev']);
    grunt.registerTask('default', ['dev']);
};
