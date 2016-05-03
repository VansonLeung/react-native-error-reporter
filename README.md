# react-native-error-reporter

[![npm version](https://badge.fury.io/js/react-native-error-reporter.svg)](http://badge.fury.io/js/react-native)

<img src="https://dl.dropboxusercontent.com/u/11386030/1.png" height=400 alt="iOS Demo screen"/>
<img src="https://dl.dropboxusercontent.com/u/11386030/2.png" height=400 alt="Android Demo screen"/>

## Objectives
Aims to replicate ```Crashlytics``` and ```ARCA```. For the ease of your clients to report you crash issues.

## Installation
You can install this component through ``npm``:

```shell
npm i react-native-error-reporter --save
```

## Usage

Bootstrap this inside your app header (e.g. app.js , or index.ios.js / index.android.js)

```js
...
var ErrorReporter = require('react-native-error_reporter');
ErrorReporter.init("vanson@vanportdev.com", "My App's Crash Report");
...
```

OR

```js
...
import ErrorReporter from 'react-native-error_reporter';
ErrorReporter.init("vanson@vanportdev.com", "My App's Crash Report");
...
```

## Limitations

If you test the app in 'release' mode for production, all the bundled javascript codes are minified. This plugin could not tell the original stack. You need to view the production codes inside ```index.ios.bundle``` or ```index.android.bundle```

About debugging production apps by showing development codes, as the bundling process obfuscates the code without leaving a trace like Proguard mapping, there's not much thing we could do to improve this. But at least you could try to locate the actual code location with the help of the release bundle file. 

## TODO:

Describe ways to find ```index.ios.bundle``` and ```index.android.bundle``` in this README.md.


## Roadmap
```
✔ Email support @done (16-05-03 17:32)
☐ Stealth mode (send crash reports automatically without calling the alert)
☐ Crashlytics support
☐ Dedicated server SAAS support (Please feel free to post issues / PRs)
```

## License

MIT.
