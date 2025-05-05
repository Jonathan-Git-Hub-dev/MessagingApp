<?php
class Error
{
	// Properties
	private $num;
	// Methods
	function __construct($num)
	{
		$this->num = $num;
	}
	
	function set_num($num)
	{
	  
		$this->num = $num;
	}
	function get_num()
	{
	  
		return $this->num;
	}
}
