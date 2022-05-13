<?php

namespace inc;

use Exception;
use JetBrains\PhpStorm\Pure;

class Carousel
{
	private const LIST_ITEM = "<li data-target=\"#myCarousel\" data-slide-to= %d class%s></li>";
	private const CAROUSEL_ITEMS = [
		"carouselItem" => "<div class=\"carousel-item\">",

		"carouselItemActive"     => "<div class=\"carousel-item active\">",

		/** %s placeholder for picture var **/
		"carouselWithPicture"    => "<img class=\"bd-img\" width=\"100%%\" height=\"100%%\" src=\" %s \"/>",

		/** %s placeholder for color var**/
		"carouselWithoutPicture" => "<svg class=\"bd-placeholder-img\" width=\"100%%\" height=\"100%%\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"xMidYMid slice\" focusable=\"false\" role=\"img\"><rect width=\"100%%\" height=\"100%%\" fill=\" %s \"/></svg>",

		/** frist %s=carouselItems.title second %s=carouselItems.info */
		"carouselItemTexts"      => "<div class=\"container\">\n<div class=\"carousel-caption text-left\">\n<h1>%s</h1>\n<p>%s</p>\n",

		/** 1.%s=carouselItems.link 2.%s=carouselItems.button_picture 3.%s=carouselItems.buttonLinksTo*/
		"carouselItemButton"     => "<p class=\"buttonContainer\"><a class=\"btn btn-lg btn-primary\" href=\"%s \" role=\"button\"> %s %s </a></p>\n",

		"carouselClosingDiv" => "</div> \n"
	];

	private const DEFAULT_COLOR = "#777";

	private array $htmlListItems;
	private array $projectIndex;
	private array $carouselItems;


	public function __construct() {
		$this->buildList();
		$this->buildCarousel();
	}

	/**
	 * @param array $htmlListItems
	 */
	public function setHtmlListItems(array $htmlListItems): void {
		$this->htmlListItems = $htmlListItems;
	}

	/**
	 * @param array $projectIndex
	 */
	public function setProjectIndex(array $projectIndex): void {
		$this->projectIndex = $projectIndex;
	}

	/**
	 * @return array
	 */
	public function getHtmlListItems(): array {
		return $this->htmlListItems;
	}

	#[Pure] public function getHtmlListItemsAsHtml(): string {
		return implode("\n", $this->getHtmlListItems());
	}

	/**
	 * @return array
	 */
	public function getCarouselItems(): array {
		return $this->carouselItems;
	}

	/**
	 * @return string
	 */
	public function getCarouselItemsAsHtml(): string {
		return implode("\n", $this->getCarouselItems());
	}

	/**
	 * @return array
	 */
	public function getProjectIndex(): array {
		return $this->projectIndex;
	}


	function buildList() {
		$projectIndex = json_decode(file_get_contents("../../Texts/BigProjects-Index.json"));
		$items = [];
		foreach ($projectIndex as $i => $index) {
			$classValue = '';
			if ($i === 0) {
				$classValue = "='active'";
			}
			$items[] = sprintf(self::LIST_ITEM, $i, $classValue);
		}
		$this->setProjectIndex($projectIndex);
		$this->setHtmlListItems($items);
	}

	function buildCarousel(): void{
		$carouselItems = [];
		foreach ($this->projectIndex as $pos => $index) {
			$item = '';
			$path = "../../Texts/" . $index->title . ".json";
			if (!file_exists($path)) {
				throw new Exception("Project: " . $index->title . ".json not found in " . $path, 404);
			}
			$project = json_decode(file_get_contents($path));
			if ($pos === 0) {
				$item .= self::CAROUSEL_ITEMS["carouselItemActive"];
			} else {
				$item .= self::CAROUSEL_ITEMS["carouselItem"];
			}
			if ($project->picture === null) {
				$item .= sprintf(self::CAROUSEL_ITEMS["carouselWithoutPicture"], (!empty($project->color) ? $project->color : self::DEFAULT_COLOR));
			} else {
				$item .= sprintf(self::CAROUSEL_ITEMS["carouselWithPicture"], $project->picture);
			}
			$item .= sprintf(self::CAROUSEL_ITEMS["carouselItemTexts"], $project->title, $project->info);
			if ($project->button) {
				$item .= sprintf(self::CAROUSEL_ITEMS["carouselItemButton"], $project->link, $project->button_picture, $project->buttonLinksTo);
			}
			$item .= str_repeat(self::CAROUSEL_ITEMS["carouselClosingDiv"], 3);
			$carouselItems[] = $item;
		}

		$this->carouselItems = $carouselItems;
	}

}