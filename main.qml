import QtQuick 2.1
import QtQuick.Controls 1.1
import QtWebEngine 1.2

ApplicationWindow {
    width: 1280
    height: 720
    visible: true
    WebEngineView {
        id: webview
        url: "http://10.10.20.17/MDC/out/cryptos/"
        anchors.fill: parent

        onFeaturePermissionRequested: {
            console.log("request")
            grantFeaturePermission(securityOrigin, feature, true);
        }

        settings.autoLoadImages: appSettings.autoLoadImages
        settings.javascriptEnabled: appSettings.javaScriptEnabled
        settings.errorPageEnabled: appSettings.errorPageEnabled
        settings.pluginsEnabled: appSettings.pluginsEnabled
        settings.fullScreenSupportEnabled: appSettings.fullScreenSupportEnabled
    }
}
