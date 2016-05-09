/**
 * Created by maxim on 09/05/2016.
 */

var body = document.querySelector("body"),
    start_btn = document.querySelector("#start"),
    stop_btn = document.querySelector("#stop"),
    video = document.querySelector("video"),
    webmVideoRecorder;


function successCallback(stream) {
    webmVideoRecorder = RecordRTC(stream, {
        type: 'video'
    });

    webmVideoRecorder.initRecorder(function() {
        webmVideoRecorder.startRecording();
    });

    video.src = URL.createObjectURL(stream);
}

function errorCallback(error) {
    // maybe another application is using the device
}

var mediaConstraints = { video: true, audio: false };

start_btn.onclick = function(){
    navigator.getUserMedia(mediaConstraints, successCallback, errorCallback);
};

stop_btn.onclick = function () {
    webmVideoRecorder.stopRecording(function() {
            video.controls = true;
            video.src = URL.createObjectURL(webmVideoRecorder.blob);
    });
};

