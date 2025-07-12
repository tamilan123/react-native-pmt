package com.anonymous.reactnativepmt;

import android.app.Application;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.List;

public class PackageList {
  private ReactNativeHost reactNativeHost;
  private MainApplication application;

  public PackageList(ReactNativeHost reactNativeHost) {
    this.reactNativeHost = reactNativeHost;
  }

  public PackageList(Application application) {
    this.application = (MainApplication) application;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost != null ? this.reactNativeHost : this.application.getReactNativeHost();
  }

  public List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
      new MainReactPackage(null)
    );
  }
}
