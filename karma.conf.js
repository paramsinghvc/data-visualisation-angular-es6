module.exports = function(config) {
    config.set({

        basePath: '',
        frameworks: ['browserify', 'jasmine'],

        files: [
            'bower_components/angular/angular.min.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'app/src/**/*.js',
            'tests/**/*test.js'
        ],

        exclude: [],

        plugins: [
            'karma-browserify',
            'karma-jasmine',
            'karma-phantomjs-launcher'
        ],

        preprocessors: {
            'app/src/**/*.js': ['browserify'],
            'tests/**/*test.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: ['babelify', 'stringify']
        },

        reporters: ['progress', 'spec'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_DEBUG,

        autoWatch: true,

        browsers: ['PhantomJS'],

        singleRun: false
    });
}
