'use strict';

var NativeModules = require('react-native').NativeModules;
var RNErrorReporter = NativeModules.RNErrorReporterManager || NativeModules.RNErrorReporterModule;

var Promise = require('bluebird');
var base64 = require('base-64');
var utf8 = require('utf8');

var _readSourcemaps = Promise.promisify(RNErrorReporter.readSourcemaps);



var convertError = (err) => {
  if (err.isOperational && err.cause) {
    err = err.cause;
  }

  var error = new Error(err.description || err.message);
  error.code = err.code;
  throw error;
};



var RNErrorReporter = {
  readSourcemaps: function() {
    return _readSourcemaps()
      .then((b64) => {
        var contents = utf8.decode(base64.decode(b64));
        if (contents === "") {
          return null;
        }
        return contents;
      })
      .catch((err) => {
        return null;
      });
  },
}



module.exports = RNErrorReporter;


