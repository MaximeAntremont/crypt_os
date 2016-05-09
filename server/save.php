<?php
/**
 * Created by IntelliJ IDEA.
 * User: Maxime
 * Date: 13/02/2015
 * Time: 10:05
 */

foreach(array('video', 'audio') as $type) {
    if (isset($_FILES["${type}-blob"])) {

        define("DIR", "D:/Documents/_DEV/Confluence/crypt_os_repo/server/ress");

        $fileName = $_POST["${type}-filename"];
        $uploadDirectory = DIR.'/'.$fileName;

        if (!move_uploaded_file($_FILES["${type}-blob"]["tmp_name"], $uploadDirectory)) {
            echo(" problem moving uploaded file");
        }

        echo($fileName);
    }
}