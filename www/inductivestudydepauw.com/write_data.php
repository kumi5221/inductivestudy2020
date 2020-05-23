<?php
  error_reporting(E_ALL);
  ini_set('display_errors', 'On');

  $post_data = json_decode(file_get_contents('php://input'), true);
  // the directory "data" must be writable by the server
  $name = "/var/www/data/".$post_data['filename'].".csv";
  $data = $post_data['filedata'];
  // write the file to disk
  file_put_contents($name, $data);


?>
