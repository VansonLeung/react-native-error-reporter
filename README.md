# react-native-error-reporter

[![npm version](https://badge.fury.io/js/react-native-error-reporter.svg)](http://badge.fury.io/js/react-native)

<img src="https://dl.dropboxusercontent.com/u/11386030/3.png" height=300 alt="Step 1"/>
<img src="https://dl.dropboxusercontent.com/u/11386030/4.png" height=300 alt="Step 2"/>
<img src="https://dl.dropboxusercontent.com/u/11386030/5.png" height=300 alt="Step 3"/>
<img src="https://dl.dropboxusercontent.com/u/11386030/6.png" height=300 alt="Step 4"/>

## Objectives
Aims to replicate ```ARCA``` and connect to ```Crashlytics```. For the ease of your clients to report you crash issues.
After reporting the crash, the default Crash red screen will come out / crash when in production mode.
The images above shows the current steps you will go through for the crash reporting process.

## Installation
You can install this component through ``npm``:

```shell
npm i react-native-error-reporter --save
```

```shell
rnpm link
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



------------


## EXPERIMENTAL - TO BE IMPROVED: How to allow Sourcemap crash log in Production Apps

The steps below heavily relies on ```rnpm```. Please install this if you don't have it.

### After Installation

```shell
rnpm link
```


### iOS - 

#### Step 1: 

```shell
react-native bundle --platform ios --entry-file index.ios.js --dev false --bundle-output ./ios/main.jsbundle --assets-dest ./ios --sourcemap-output "node_modules/react-native-error-reporter/sourcemaps/errorreporter_sourcemaps_ios.ttf"
```

#### Step 2:
Go to XCode project, Uncomment: 
```
jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
```

#### Step 3:
Run the project in ```Release``` mode. 



### Android - 

#### Step 1:

```shell
react-native bundle --platform android --dev false --entry-file index.android.js   --bundle-output android/app/src/main/assets/index.android.bundle   --assets-dest android/app/src/main/res/ --sourcemap-output "node_modules/react-native-error-reporter/sourcemaps/errorreporter_sourcemaps_android.ttf"
```


### Step 2:

```shell
rnpm link
```

### Step 3:

After setting up your signing configs inside build.gradle, run:

```shell
cd android && ./gradlew installRelease
```


----------


## Roadmap
```
✔ Email support @done (16-05-03 17:32)
✔ (EXPERIMENTAL) Support sourcemaps for iOS and Android production builds (inspect decoded error stacks for production builds) @done (16-05-06 01:08)
☐ Stealth mode (send crash reports automatically without calling the alert)
☐ Crashlytics support (as a Crashlytics stack source provider)
☐ Dedicated server SAAS support (Please feel free to post issues / PRs)
```

## License

MIT.
