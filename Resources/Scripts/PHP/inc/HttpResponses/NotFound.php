<?php

namespace inc\HttpResponses;

class NotFound extends Response
{
	public function __construct($message) {
		parent::__construct(404, $message);
	}

	public function __toString(): string {
		return json_encode((object) [
			'code'    => $this->getCode(),
			'message' => $this->getMessage()
		]);
	}

}