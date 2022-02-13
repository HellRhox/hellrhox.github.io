<?php

namespace inc\HttpResponses;


use http\Message;

abstract class Response
{
	private $code;
	private $message;
	private $data;

	/**
	 * @return mixed
	 */
	public function getCode() {
		return $this->code;
	}

	/**
	 * @return mixed|null
	 */
	public function getMessage(): mixed {
		return $this->message;
	}

	/**
	 * @return mixed|null
	 */
	public function getData(): mixed {
		return $this->data;
	}

	public function __construct($code, $message = null, $data = null) {
		http_response_code($code);
		$this->code = $code;
		$this->message = $message;
		$this->data = $data;
		echo $this;
		$this->__destruct();
	}

	public function __destruct() {

	}

	public function __toString(): string {
	}


}