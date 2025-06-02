<?php
class Friend
{
	// Properties
	private $name;
	// Methods
	function __construct($name)
	{
		$this->name = $name;
	}
	
	function set_name($name)
	{
	  
		$this->name = $name;
	}
	function get_name()
	{
	  
		return $this->name;
	}
}
