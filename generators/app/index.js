'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            `Welcome to the ${chalk.red('Solubis') } generator!`
            ));

        var prompts = [{
            type: 'input',
            name: 'name',
            message: 'What is the name of application?',
            required: true,
            default: this.appname
        }];

        this.prompt(prompts, (props) => {
            this.props = props;

            done();
        });
    },

    writing: function () {
        var options = { name: this.props.name };

        var templates = [
            'package.json',
            'index.html',
            'README.md'];

        var files = [
            'tslint.json',
            'eslint.json',
            'tsconfig.json',
            'webpack.config.js',
            'src/',
            'typings/'

        ];

        templates.forEach((item) => {
            this.fs.copyTpl(
                this.templatePath(item),
                this.destinationPath(item),
                options);
        })

        files.forEach((item) => {
            let glob = item;

            if (/\/$/.test(item)) {
                glob = `${item}**/*`;
            }

            this.fs.copy(
                this.templatePath(glob),
                this.destinationPath(item));
        })
    },

    install: function () {
        this.log(chalk.blue('Installing dependencies'));
        this.npmInstall([], {}, () => {
           this.log(chalk.bgGreen.white.bold('Success!!!'));
            this.log(chalk.green('Run "npm start"\n'));
        });
    }
});
