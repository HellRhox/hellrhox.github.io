<?php

namespace PHP\inc;

class Carusel
{
	private const LIST_ITEM = "<li data-target=\"#myCarousel\" data-slide-to= %d class%s></li>";
	private const CAROUSEL_ITEMS = [
		"caruselItem"           => "<div class=\"carousel-item\">",
		"caruselItemActive"     => "<div class=\"carousel-item active\">",

		/** %s placeholder for picture var **/
		"caruselWithPicture"    => "<img class=\"bd-img\" width=\"100%\" height=\"100%\" src=\"%s \"/>",

		/**placeholder for color var**/
		"caruselWithoutPicture" => "<svg class=\"bd-placeholder-img\" width=\"100 %\" height=\"100 %\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"xMidYMid slice\" focusable=\"false\" role=\"img\"><rect width=\"100%\" height=\"100%\" fill=\"%s\"/></svg>",
	];
	private array $htmlListItems;
	private object $projectIndex;

	public function __construct() {
		$this->buildList();
		$this->buildCarusel();
	}

	/**
	 * @param array $htmlListItems
	 */
	public function setHtmlListItems(array $htmlListItems): void {
		$this->htmlListItems = $htmlListItems;
	}

	/**
	 * @param object $projectIndex
	 */
	public function setProjectIndex(object $projectIndex): void {
		$this->projectIndex = $projectIndex;
	}

	/**
	 * @return array
	 */
	public function getHtmlListItems() {
		return $this->htmlListItems;
	}

	/**
	 * @return object
	 */
	public function getProjectIndex() {
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
		$this->htmlListItems($items);
	}

	function buildCarusel() {
		foreach ($this->projectIndex as $pos => $index) {
			var_dump($pos, $index);
		}
	}

}