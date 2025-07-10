import UIKit
import React

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?
  var bridge: RCTBridge?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {

    let jsCodeLocation: URL

    #if DEBUG
    // Use Metro dev server for debug builds
    jsCodeLocation = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
    #else
    // Use pre-bundled file on release builds
    jsCodeLocation = Bundle.main.url(forResource: "main", withExtension: "jsbundle")!
    #endif

    bridge = RCTBridge(bundleURL: jsCodeLocation, moduleProvider: nil, launchOptions: launchOptions)

    let rootView = RCTRootView(bridge: bridge!, moduleName: "main", initialProperties: nil)
    rootView.backgroundColor = UIColor.white

    window = UIWindow(frame: UIScreen.main.bounds)
    let rootViewController = UIViewController()
    rootViewController.view = rootView
    window?.rootViewController = rootViewController
    window?.makeKeyAndVisible()

    return true
  }

  // Handle deep links
  func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    return RCTLinkingManager.application(app, open: url, options: options)
  }

  // Handle universal links
  func application(_ application: UIApplication, continue userActivity: NSUserActivity,
                   restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    return RCTLinkingManager.application(application, continue: userActivity, restorationHandler: restorationHandler)
  }
}
