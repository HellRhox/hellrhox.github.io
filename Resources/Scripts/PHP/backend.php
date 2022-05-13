<?php

use inc\Carousel;
use inc\HttpResponses\BadRequest;
use inc\HttpResponses\NotFound;
use inc\HttpResponses\Ok;
use inc\SmallerProjectContainer;

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

	const SUBSITE_PATH = '../../Subsites/';
	private Carousel $carousel;
	private SmallerProjectContainer $container;

	public function __construct() {
		try {
			$this->carousel = new Carousel();
			$this->container = new SmallerProjectContainer();
		} catch (Exception $e) {
			if ($e->getCode() === 404) {
				return new NotFound($e->getMessage());
			} else if ($e->getCode() === 400) {
				return new BadRequest($e->getMessage());
			}
		}
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

					return new Ok((object) [
						"listItems"     => $this->carousel->getHtmlListItemsAsHtml(),
						"carouselItems" => $this->carousel->getCarouselItemsAsHtml(),
					]);
					break;
				case 'switchSite':
					$subSiteName = $requestBody->subsite ? $requestBody->subsite : null;
					if ($subSiteName === null) {
						return new BadRequest("EMPTY_SUB_SITE_GIVEN");
					} else {
						return $this->loadSubSite($subSiteName);
					}
				case'buildSmallProjects':
					return new Ok((object) ["smallProjects" => $this->container->getCarouselItemsAsHtml()]);
					break;
				default:
					return new BadRequest("Wrong function");

			}
		}
	}

	private function loadSubSite($siteName) {
		$path = self::SUBSITE_PATH . $siteName . '.html';
		if (file_exists($path)) {
			return new Ok(file_get_contents($path));
		} else {
			return new NotFound("NO_SUBSITE_FOUND_IN_PATH: " . $path);
		}
	}
}
