/**
 * Created by maxim on 09/05/2016.
 */
navigator.getUserMedia = ( navigator.getUserMedia ||
navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia ||
navigator.msGetUserMedia ||
navigator.mediaDevices.getUserMedia);


var body = document.querySelector("body"),
    start_btn = document.querySelector("#start"),
    stop_btn = document.querySelector("#stop"),
    video = document.querySelector("video"),
    webmVideoRecorder,
    stream;


function successCallback(_stream) {
    stream = _stream;
    webmVideoRecorder = RecordRTC(stream, {
        mimeType: 'video/webm',
        type: 'video'
    });
    webmVideoRecorder.startRecording();

    video.src = URL.createObjectURL(stream);
}

function errorCallback(error) {
    // maybe another application is using the device
    console.log(error);
}

var mediaConstraints = { video: true, audio: false };

start_btn.onclick = function(){
    navigator.getUserMedia(mediaConstraints, successCallback, errorCallback);
};

stop_btn.onclick = function () {
    webmVideoRecorder.stopRecording(function(url) {
            //video.controls = true;
            video.src = url;
        var blob = webmVideoRecorder.blob;
        saveToFile(blob);
        stream.stop();
    });
};

function xhr(url, data, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            callback(location.href + "ress/" + request.responseText);
        }
    };
    request.open('POST', url);
    request.send(data);
}

function saveToFile(blob){

    var fileType = blob.type.match(/([a-z]+)\//)[1];
    var fileName = new Date().getTime().toString() + "." + blob.type.match(/\/([a-z]+)/)[1]; //Quand on coupe le record on prend le timestamp

    var formData = new FormData();
    formData.append(fileType + '-filename', fileName);
    formData.append(fileType + '-blob', blob);

    xhr('save.php', formData, function (fName) {
        //window.open(location.href + fName);
        console.log(fName);
    });
}


