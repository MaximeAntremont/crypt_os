<?php
/**
 * Created by IntelliJ IDEA.
 * User: Maxime
 * Date: 13/02/2015
 * Time: 10:05
 */

require_once "config.php";

foreach(array('video', 'audio') as $type) {
    if (isset($_FILES["${type}-blob"])) {

        $fileName = $_POST["${type}-filename"];
        $uploadDirectory = DIR.'\\'.$fileName;

        if (!move_uploaded_file($_FILES["${type}-blob"]["tmp_name"], $uploadDirectory)) {
            echo(" problem moving uploaded file " . $uploadDirectory . "  ");
        }

        echo($fileName);
    }
}