/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import {
  Alert,
  Dimensions,
  Platform,
  Linking,
} from 'react-native';
// import StackTrace from 'stacktrace-js'
// import Reactotron from 'reactotron'
const RNFS = require('./native_sourcemap_loader');
const parseErrorStack = require('react-native/Libraries/JavaScriptAppEngine/Initialization/parseErrorStack');
const stacktraceParser = require('react-native/node_modules/stacktrace-parser/');
const SourceMap = require('source-map');

var init = function init(email, subject) {

  var originalHandler = global.ErrorUtils.getGlobalHandler();

  function getObjectValues(obj) {
    var values = [];
    for (var key in obj) {
      values.push(obj[key]);
    }
    return values;
  }

  function resolveSourceMaps(sourceMapInstance, stackFrame) {
    try {
      var orig = sourceMapInstance.originalPositionFor({
        line: stackFrame.lineNumber,
        column: stackFrame.column,
      });
      if (orig) {
        // remove query string if any
        const queryStringStartIndex = orig.source.indexOf('?');
        stackFrame.file = queryStringStartIndex === -1
          ? orig.source
          : orig.source.substring(0, queryStringStartIndex);
        stackFrame.lineNumber = orig.line;
        stackFrame.column = orig.column;
      }
    } catch (innerEx) {
    }
  }
  
  function makeStackLines(stacks) {
    var stackLines = "";
    for (var i = 0; i < stacks.length; i++) {
      var stack = stacks[i];
      var {file, methodName, lineNumber, column} = stack;
      var line = "" + (i+1) + ". ";
      if (file != null) { 
        // file = file.split("/");
        // file = file[file.length - 1];
        line += file;
      }
      if (methodName != null) { line += ":" + methodName }
      if (lineNumber != null) { line += ", Line: " + lineNumber }
      if (column != null) { line += ", Column: " + column }
      stackLines += line + "\n\n";
    }
    return stackLines;
  }

  function startPromptError(originalHandler, e, fatal, stackLines) {
    Alert.alert((fatal ? "Fatal " : "Non-fatal ") + "App Error", e.message,
    [
      {text: 'Close', style: 'cancel', onPress: () => {runOriginalHandler(originalHandler, e, fatal);} },
      {text: 'Email to ' + email.substring(0, 20) + "...", onPress: () => { reportError(stackLines, () => { runOriginalHandler(originalHandler, e, fatal); } ); } },
      {text: 'Show Stack Trace', onPress: () => {
        Alert.alert((fatal ? "Fatal " : "Non-fatal ") + "App Error", e.message + "\n\n========\nStack Trace:\n========\n" + stackLines,
        [
          {text: 'Close', style: 'cancel', onPress: () => {runOriginalHandler(originalHandler, e, fatal);} },
          {text: 'Email to ' + email.substring(0, 20) + "...", onPress: () => { reportError(stackLines, () => { runOriginalHandler(originalHandler, e, fatal); } ); } },
        ]);
      }},
    ]);
  }

  function reportError(stacklines, callback) {
    var url = "mailto:"+email+"?subject="+subject+"&body=Type your issue description here: \n\n========\n\nStack Trace:\n========\n" + stacklines;

    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        // Reactotron.log('Can\'t handle url: ' + url.substring(0, 100));
        Alert.alert("Ooops", "Your device does not have an email client installed so we could not report this issue.",
        [
          {text: 'Close', style: 'cancel', onPress: () => { if (callback) { callback(); } } },
        ]);
      } else {
        Alert.alert("Thanks!", "Thank you for reporting the error to us. We will work out the way to fix this issue.",
        [
          {text: 'Close', style: 'cancel', onPress: () => { if (callback) { callback(); } } },
        ]);
        Linking.openURL(url);
        // if (callback) { callback(); }
      }
    }).catch(err => {
        Alert.alert("Ooops", "Invalid exception inhibits the issue-reporting.",
        [
          {text: 'Close', style: 'cancel', onPress: () => { if (callback) { callback(); } } },
        ]);
    });

  }

  function runOriginalHandler(originalHandler, e, fatal) {
    // And then re-throw the exception with the original handler
    if (originalHandler) {
      originalHandler(e, fatal);
    }
  }



  function runDevSourceMapsCache(e, fatal, fallback) {
    require('react-native/Libraries/JavaScriptAppEngine/Initialization/SourceMapsCache').getSourceMaps()
    .then(sourceMaps => {
      if (!sourceMaps) {
        fallback();
      } else {
        const prettyStack = parseErrorStack(e, sourceMaps);
        var stackLines = makeStackLines(prettyStack);
        startPromptError(originalHandler, e, fatal, stackLines);
      }
    })
    .catch(error => {
      fallback();
    })
  }


  function runRelSourceMapsCache(e, fatal, fallback) {
    RNFS.readSourcemaps('utf8')
    .then((data) => {
      if (!data) {
        fallback();
      } else {
        var sourceMap = new SourceMap.SourceMapConsumer(data);
        var stack = Array.isArray(e.stack) ? e.stack : stacktraceParser.parse(e.stack);
        var framesToPop = e.framesToPop || 0;
        while (framesToPop--) {
          stack.shift();
        }

        stack.forEach(frame => {
          resolveSourceMaps(sourceMap, frame);
        });

        var stackLines = makeStackLines(stack);
        startPromptError(originalHandler, e, fatal, stackLines);
      }
    })
    .catch(error => {
      fallback();
    });

  }


  function runUglySourceMapsCache(e, fatal) {
    const notPrettyStack = parseErrorStack(e);
    var stackLines = makeStackLines(notPrettyStack);
    startPromptError(originalHandler, e, fatal, stackLines);
  }



  function errorHandler(e, fatal) {
    
    // Reactotron.log(e.message); 
    // Reactotron.log(e); 
    // StackTrace.fromError(e).then((x) => { Reactotron.log("Stack here..." + x) });//Reactotron.log(x); } );

    // runOriginalHandler(originalHandler, e);

    runDevSourceMapsCache(e, fatal, () => {
      runRelSourceMapsCache(e, fatal, () => {
        runUglySourceMapsCache(e, fatal);
      })
    })
  }


  global.ErrorUtils.setGlobalHandler(errorHandler);
}

module.exports = {
  init: init,
}