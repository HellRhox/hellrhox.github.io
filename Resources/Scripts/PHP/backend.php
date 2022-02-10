<?php

use inc\Carousel;

$loader = require_once $_SERVER["DOCUMENT_ROOT"] . '/vendor/autoload.php';
$loader->addPsr4('inc\\', __DIR__);

$carousel = new Carousel();
return json_encode("hello");

