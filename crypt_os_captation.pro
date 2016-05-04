TEMPLATE = app

QT += qml quick webengine
CONFIG += c++11

SOURCES += main.cpp

RESOURCES += qml.qrc

qtHaveModule(widgets) {
    QT += widgets # QApplication is required to get native styling with QtQuickControls
}

# Additional import path used to resolve QML modules in Qt Creator's code model
QML_IMPORT_PATH =

# Default rules for deployment.
include(deployment.pri)
