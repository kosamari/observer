Observer
===========

Simple JavaScript REPLE that keep track of what's in global scope.  
Only built & tested on OSX

! There are few issues with showing state of global scope (which I'll fix it over the break). REPL itself should be working correctly.

Download [OSX app](https://github.com/kosamari/observer/raw/master/observer.zip) or Try [online demo](https://kosamari.github.io/observer/)

![capture](https://cloud.githubusercontent.com/assets/4581495/11929776/e316c2f4-a7ab-11e5-8a7a-84f76f6c54f8.gif)

## Dependency
In order to run this from source, you'll need electron installed.
`npm install -g electron`

## To start
```
cd [repo's directory]
npm install
electron .
```

## To build .app file
```
cd [repo's directory]
electron-packager . observer --platform=darwin --arch=x64 --version=0.36.1 --icon=observer.icns
```