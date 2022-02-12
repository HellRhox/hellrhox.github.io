<?php

use inc\Carousel;
use inc\HttpResponses\BadRequest;
use inc\HttpResponses\Ok;

$loader = require_once $_SERVER["DOCUMENT_ROOT"] . '/vendor/autoload.php';
$loader->addPsr4('inc\\', __DIR__);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

call_user_func(function () {
	$controller = new Controller();
	$method = $_SERVER["REQUEST_METHOD"];
	$controller->main($method);
	exit();
});

class Controller
{
	private $carousel;

	public function __construct() {
		$this->carousel = new Carousel();
	}


	public function main($httpMethod) {
		if ($httpMethod === 'GET') {
			$simpleString = "Hello World";
			return new Ok($simpleString);
		} else if ($httpMethod === 'POST') {
			$requestBody = json_decode(file_get_contents('php://input'));
			if (empty($requestBody)) {
				return new BadRequest("POST_WITHOUT_BODY_GIVEN");

			}
			if (!property_exists($requestBody, "function")) {
				return new BadRequest("MISSING_FUNCTION_PARAMETER");

			}
			switch ($requestBody->function) {
				case 'buildCarousel':
					return new Ok($this->carousel->getHtmlListItemsAsHtml());
					break;
				case 'switchSide':
					return new Ok("tbi");
					break;
				default:
					return new BadRequest("Wrong function");

			}
		}
	}
}
