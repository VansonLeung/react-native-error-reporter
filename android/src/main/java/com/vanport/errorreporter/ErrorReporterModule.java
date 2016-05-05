package com.vanport.errorreporter;

import android.content.Context;
import android.util.Base64;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.io.InputStream;

public class ErrorReporterModule extends ReactContextBaseJavaModule {

  public ErrorReporterModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "RNErrorReporterModule";
  }

  @ReactMethod
  public void readSourcemaps(Callback callback) {
    try {

      Context context = getReactApplicationContext();
      InputStream is = context.getAssets().open("fonts/errorreporter_sourcemaps_android.ttf");
      int size = is.available();
      byte[] buffer = new byte[size]; 
      is.read(buffer); 
      is.close();
      String base64Content = Base64.encodeToString(buffer, Base64.NO_WRAP);
      callback.invoke(null, base64Content);

    } catch (Exception ex) {
      ex.printStackTrace();
      callback.invoke(makeErrorPayload(ex));
    }
  }

  private WritableMap makeErrorPayload(Exception ex) {
    WritableMap error = Arguments.createMap();
    error.putString("message", ex.getMessage());
    return error;
  }
}
