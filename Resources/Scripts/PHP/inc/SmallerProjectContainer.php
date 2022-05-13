<?php

namespace inc;

use Exception;

class SmallerProjectContainer
{
	private const smallProjectItem = '<div class="col-lg-4">' . "\n" .
	/*Picture*/
	"%s" .
	/*Info*/
	"%s" .
	/*Button*/
	"%s" .
	"</div>" . "\n";
	private const noPicture =
		'<svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140">' . '\n' .
		'<title>Placeholder</title>' . '\n' .
		'<rect width="100%%" height="100%%" fill=" %s "/>' . '\n' . //%s=color
		'<text class="placeholder" font-size="45" text-anchor="middle" alignment-baseline="central" fill="#fff"> <tspan x="50%%" dy="60%%">%s</tspan></text></svg>'; //%s shorthand project

	private const withPicture =
		'<img class="bd-img rounded-circle" width="140" height="140" src="%s" alt="%s"/>'; //%s picture,alt %s shorthand project

	private const info =
		/*%s title*/
		'<h2>%s</h2>' . "\n" .
		/*%s infotext */
		"<p>%s</p>" . "\n";

	private const button =
		/*%s link*/
		'<p><a class="btn btn-secondary" href=\'%s\' role="button">' .
		/*%s buttonPicture or buttonLinksTo*/
		" %s" . '</a></p>' . "\n";

	private const DEFAULT_COLOR = "#777";

	private array $projectIndex;
	private array $smallProjects;

	/**
	 * SmallProjectBuilder
	 *
	 * @throws Exception
	 */
	public function __construct() {
		$this->getProjectIndex();
		$this->smallProjects = $this->buildSmallProject($this->projectIndex);
	}

	/**
	 * Gets the index off all smallProjects to be build
	 *
	 * @return void
	 * @throws Exception
	 */
	private function getProjectIndex(): void {
		$pathToIndexFile = "../../Texts/SmallProjects-Index.json";
		if (!file_exists($pathToIndexFile)) {
			throw new Exception("SMALL_PROJECTS_INDEX_FILE_NOT_FOUND", 404);
		} else {
			$this->projectIndex = json_decode(file_get_contents($pathToIndexFile));
		}
	}

	/**
	 * Builds the project objects themselves
	 *
	 * @param array $projectIndex
	 * @return array
	 * @throws Exception
	 */
	private function buildSmallProject(array $projectIndex): array {
		$pathToProjects = "../../Texts/";
		$projects = [];
		foreach ($projectIndex as $pos => $index) {
			if (!file_exists($pathToProjects . $index->title . '.json')) {
				throw new Exception("NOT_FOUND_FILE_FOR_SMALL_PROJECT: " . $index->title . ".json in path:" . $pathToProjects, 404);
			} else {
				$smallProject = json_decode(file_get_contents($pathToProjects . $index->title . '.json'));
				if ($smallProject->picture === null) {
					$picture = sprintf(self::noPicture, ($smallProject->color !== null ? $smallProject->color : self::DEFAULT_COLOR), ($smallProject->short !== null ? $smallProject->short : $this->createShort($smallProject->title)));
				} else {
					$picture = sprintf(self::withPicture, $smallProject->picture, $smallProject->short !== null ? $smallProject->shor : $this->createShort($smallProject->title));
				}
				if ($smallProject->button === true) {
					$buttonProperties = $smallProject->buttonLinksTo;
					if ($smallProject->button_picture !== null) {
						$buttonProperties .= " " . $smallProject->button_picture;
					}
					$button = sprintf(self::button, $smallProject->link, $buttonProperties);
				} else {
					$button = "";
				}
				$info = sprintf(self::info, $smallProject->title, $smallProject->info);
				$projects[] = sprintf(self::smallProjectItem, $picture, $info, $button);
			}

		}
		return $projects;
	}

	/**
	 * Creates a shorthand for a project on the fly.
	 *
	 * @param $title
	 * @return string
	 */
	private function createShort($title): string {
		return strtoupper(substr($title, 0, 2));
	}

	/**
	 * @return array
	 */
	public function getSmallProjects(): array {
		return $this->smallProjects;
	}

	/**
	 * @return string
	 */
	public function getCarouselItemsAsHtml(): string {
		return implode("\n", $this->getSmallProjects());
	}
}