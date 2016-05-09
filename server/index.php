<?php
require_once "config.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <video poster="./assets/img/load.gif" preload="auto" muted="muted" autoplay name="media" width="400" height="300">
        Ce navigateur ne supporte pas la vidéo...
    </video>
    <input id="start" type="button" value="Start">
    <input id="stop" type="button" value="Stop">
    <div id="log"></div>
    <div id="timer">
        <span id="sec"></span>
        <span id="diz"></span>
        <span id="cent"></span>
    </div>
    <progress value="0" max="<?php echo RECORD_DURATION ?>"></progress>
    <script src="assets/js/RecordRTC.js"></script>
    <script type="text/javascript">
        var recordDuration = <?php echo RECORD_DURATION ?>;//en seconde
    </script>
    <script type="text/javascript" src="assets/js/main.js"></script>
</body>
</html>