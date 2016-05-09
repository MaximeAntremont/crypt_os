<?php
/**
 * Created by IntelliJ IDEA.
 * User: maxim
 * Date: 09/05/2016
 * Time: 11:46
 */

require_once "config.php";

$cmd = sprintf('ffmpeg -i "'.DIR.'/%s" -i "'.DIR.'/%s" -c:v libvpx-vp9 -crf 20 -b:v 0 -c:a libvorbis -strict experimental "'.DIR.'/%s_merged.webm"', $_POST['video'].".webm", $_POST['audio'].".mp3", time());
//exec($cmd);
echo $cmd;