<?php

namespace inc\HttpResponses;

class Ok extends Response
{
	public function __construct($data = null, $message = null) {
		parent::__construct(200, $message, $data);
	}

	public function __toString(): string {
		$response = ['code' => $this->getCode()];
		$message = $this->getMessage();
		$data = $this->getData();
		if ($message !== null) {
			$response["message"] = $message;
		}
		if ($data !== null) {
			$response["data"] = $data;
		}
		return json_encode((object) $response);
	}

}