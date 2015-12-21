Observer
===========

Simple JavaScript REPLE that keep track of what's in global scope.  
Only built & tested on OSX

Try [online demo](https://kosamari.github.io/observer/)

## Dependency
In order to run this from source, you'll need electron installed.
`npm install -g electron`

## To started
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