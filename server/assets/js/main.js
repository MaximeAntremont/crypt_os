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
    stream,
    audioName = null,
    videoName = null,
    _log = document.querySelector("#log"),
    _cent = document.querySelector("#cent"),
    _diz = document.querySelector("#diz"),
    _sec = document.querySelector("#sec"),
    progress = document.querySelector("progress");

_cent.value = 0;
_diz.value = 0;
_sec.value = 0;
progress.max = recordDuration;

function log(msg){
    _log.innerHTML += new Date().getTime() + " : " +  msg + "<br/>";
}


function successCallback(_stream) {
    stream = _stream;
    webmVideoRecorder = RecordRTC(stream, {
        mimeType: 'video/webm',
        type: 'video'
    });
    log("Start audio recorder");
    xhr('record.php', null, function(resp){
        console.log(resp);
        audioName = resp.timestamp;
    });

    log("Start video recorder");
    webmVideoRecorder.startRecording();


    var timeout = setInterval(function(){
        _cent.value ++;
        if(_cent.value > 9){
            _diz.value ++;
            _cent.value = 0;
            if(_diz.value > 9){
                _sec.value ++;
                _diz.value = 0;
            }
        }
        _cent.textContent = _cent.value;
        _diz.textContent  = _diz.value;
        _sec.textContent  = _sec.value;
        progress.value = _sec.value;
    }, 10);

    setTimeout(function(){
        stop_btn.onclick();
        window.clearTimeout(timeout);
        progress.value = progress.max;
    }, recordDuration*1000);

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
        var blob = webmVideoRecorder.blob;
        saveToFile(blob);
        stream.stop();
    });

    var interval = setInterval(function(){
        if(
            audioName != null &&
            videoName != null
        ){
            window.clearInterval(interval);
            var formData = new FormData();
            formData.append('video', videoName);
            formData.append('audio', audioName);
            xhr('merge.php', formData, function (resp) {
                console.log(resp.response);
            });
            var v = document.createElement("video"),
                a = document.createElement("audio"),
                c = document.createElement("div");

            v.src = window.location + "ress/" + videoName + ".webm";
            a.src = window.location + "ress/" + audioName + ".mp3";
            a.type = "audio/mpeg";
            v.type = "video/webm";
            a.controls = v.controls = true;
            a.loop = v.loop = true;

            c.appendChild(v);
            c.appendChild(a);

            body.appendChild(c);

            audioName = parseInt(audioName);
            videoName = parseInt(videoName);

           /* a.play();
            v.play();*/

            var offset =  1000;

            console.log("Compensation de",offset, "millisecondes de décalage");
            var f = (audioName > videoName ? a : v);
            console.log(audioName, videoName, f);
            f.play();

            setTimeout(function(){
                var l = (audioName < videoName ? a : v);
                console.log(audioName, videoName, l);
                l.play();
                audioName = null;
                videoName = null;
            }, offset);
        }
    }, 500);
};

function xhr(url, data, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            callback({
                response : request.responseText,
                location : location.href + "ress/" + request.responseText,
                timestamp : request.responseText.match(/\d+/)[0]
            });
        }
    };
    request.open('POST', url);
    request.send(data);
}

function saveToFile(blob){
    console.log(blob);

    var fileType = blob.type.match(/([a-z]+)\//)[1];
    var fileName = new Date().getTime() + "." + blob.type.match(/\/([a-z]+)/)[1]; //Quand on coupe le record on prend le timestamp

    var formData = new FormData();
    formData.append(fileType + '-filename', fileName);
    formData.append(fileType + '-blob', blob);

    xhr('save.php', formData, function (resp) {
        //window.open(location.href + fName);
        console.log(resp);
        videoName = resp.timestamp;
    });
}


