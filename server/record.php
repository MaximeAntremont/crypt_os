<?php
/**
 * Ici on va lancer ffmpeg pour enregistrer le son, puis on va retourner l'url
 */

require_once "config.php";

$s = $m = $h = 0;

$s = RECORD_DURATION % 60;

if(RECORD_DURATION > 59)
 $m = floor(RECORD_DURATION/60)%60;
if(RECORD_DURATION > 3599)
 $h = RECORD_DURATION%3600;

$formatted_duration = $h.":".$m.":".$s;

$name = round((microtime(true)*1000));

$cmd = sprintf('ffmpeg -f dshow -i audio="%s" -t %s %s\%s.mp3', AUDIO_DEVICE, $formatted_duration, DIR, $name);
exec($cmd);

$rename = round((microtime(true)*1000));
exec(sprintf('rename %s\%s.mp3 %s.mp3', DIR, $name, $rename));

echo $rename;