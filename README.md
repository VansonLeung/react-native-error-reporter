# react-native-error-reporter

[![npm version](https://badge.fury.io/js/react-native-error-reporter.svg)](http://badge.fury.io/js/react-native)
[![NPM](https://nodei.co/npm/react-native-error-reporter.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-native-keyboard-aware-view/)

Supports iOS & Android React Native 0.21+

<img src="https://dl.dropboxusercontent.com/u/11386030/3.png" height=300 alt="Step 1"/>
<img src="https://dl.dropboxusercontent.com/u/11386030/4.png" height=300 alt="Step 2"/>
<img src="https://dl.dropboxusercontent.com/u/11386030/5.png" height=300 alt="Step 3"/>
<img src="https://dl.dropboxusercontent.com/u/11386030/6.png" height=300 alt="Step 4"/>

## Objectives
Aims to replicate <a href='https://github.com/ACRA/acra'>ARCA</a> and connect to ```Crashlytics``` (Crashlytics Connection Not finished). For the ease of your clients to report you crash issues.
After reporting the crash, the default Crash red screen will come out / crash when in production mode.
The images above shows the current steps you will go through for the crash reporting process.

## Installation
You can install this component through ``npm``:

```shell
npm i react-native-error-reporter --save
```

## Usage

Bootstrap this inside your app header (e.g. app.js , or index.ios.js / index.android.js)

```js
...
var ErrorReporter = require('react-native-error-reporter');
ErrorReporter.init("vanson@vanportdev.com", "My App's Crash Report");
...
```

OR

```js
...
import ErrorReporter from 'react-native-error-reporter';
ErrorReporter.init("vanson@vanportdev.com", "My App's Crash Report");
...
```

## Limitations

### Update: [2016/05/04] Investigations prove that it is possible to obtain the sourcemaps for the minified javascript codes & then locate the real stack locations. Error Reporter tested OK on iOS release builds. Now starting to work on a more user-friendly solution for this.

If you test the app in 'release' mode for production, all the bundled javascript codes are minified. This plugin could not tell the original stack. You need to view the production codes inside ```index.ios.bundle``` or ```index.android.bundle```

About debugging production apps by showing development codes, as the bundling process obfuscates the code without leaving a trace like Proguard mapping, there's not much thing we could do to improve this. But at least you could try to locate the actual code location with the help of the release bundle file. 

Remember to keep one copy of the release bundle file after any production release to App Store / Google Play for your reference.
You may also keep the IPA / APK copies. You could uncompress the IPA / APK files to obtain the bundle file.


## TODO:

Describe all ways to find ```index.ios.bundle``` and ```index.android.bundle``` in this README.md.


## Roadmap
```
✔ Email support @done (16-05-03 17:32)
☐ Support release sourcemaps
☐ Stealth mode (send crash reports automatically without calling the alert)
☐ Crashlytics support
☐ Dedicated server SAAS support (Please feel free to post issues / PRs)
```

## License

MIT.
