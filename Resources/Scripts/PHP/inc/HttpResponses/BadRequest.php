<?php

namespace inc\HttpResponses;

class BadRequest extends Response
{
	public function __construct($message) {
		parent::__construct(400, $message);
	}

	public function __toString(): string {
		return json_encode((object) [
			'code'    => $this->getCode(),
			'message' => $this->getMessage()
		]);
	}


}