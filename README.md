Gulp analog: [gulp-webpcss](https://github.com/lexich/gulp-webpcss)  
PostCSS filter: [webpcss](https://github.com/lexich/webpcss)  
# grunt-webpcss

[![Build Status](https://travis-ci.org/lexich/grunt-webpcss.svg?branch=master)](https://travis-ci.org/lexich/grunt-webpcss)

> Process css file to generate addition css ruless to add webp compatble

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-webpcss --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-webpcss');
```

## The "webpcss" task

### Overview
In your project's Gruntfile, add a section named `webpcss` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  webpcss: {
    task: {
      options: {
        baseClass:'.webp',
        replace_from:/\.(png|jpg|jpeg)/,
        replace_to:'.webp'
      },
      files: {
        'main.css':['main.css']
      }
    }
  },
});
```

### Options

#### options.baseClass
Type: `String`
Default value: `'.webp'`

Class which prepend selector. For expample:  
before
```css
.test { background-image:url('test.png'); }
```

after
```css
.test { background-image:url('test.png'); }
.webp .test { background-image:url('test.webp'); }
```

.webp class indicate webp browser support. Reccomends to use [Modernizr](https://modernizr.com/‎)

#### options.replace_from
Type: `RegExp`
Default value: `/\.(png|jpg|jpeg)/,`

RegExp pattern for replace

#### options.replace_to
Type: `String`
Default value: `.webp`

Replacing value

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. 
Css transforms from
```css
.test { background-image:url('test.png'); }
```
to
```css
.test { background-image:url('test.png'); }
.webp .test { background-image:url('test.webp'); }
```


```js
grunt.initConfig({
  webpcss: {
    task: {
      options: {},
      files: {
        'dest/default_options.css': ['default_options.css'],
      },
    }
  },
});
```

#### Custom Options
In this example, the default options are used to do something with whatever. 
Css transforms from
```css
.test { background-image:url('test.png'); }
```
to
```css
.test { background-image:url('test.png'); }
.webp1 .test { background-image:url('test.webp'); }
```


```js
grunt.initConfig({
  webpcss: {
    options: {
      baseClass:'.webp1',
      replace_from:/\.(png|jpg|jpeg)/,
      replace_to:'.webp',
    },
    files: {
      'dest/default_options.css': ['default_options.css'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_0.1.0_ - Plugin release
