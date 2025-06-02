<?php
class Bundle
{
	// Properties
	public $num;
	public $f;//users friends
	public $i;//requests to be friends with the user
	public $o;//requests from user to be anothrer users friend

	public function __construct()
	{
		$this->num = 0;
		$this->f = array();
		$this->i = array();
		$this->o = array();
	}

	public function set_num($num)
	{
		$this->num = $num;
	}

	public function append_f($friend)
	{
		array_push($this->f, $friend);
	}
	
	public function append_i($inRequest)
	{
		array_push($this->i, $inRequest);
	}
	public function append_o($outRequest)
	{
		array_push($this->o, $outRequest);
	}
	
	public function print()
	{
	    //echo $this;
	    //echo $this->num;
	    //echo $this->friends;
	    $myJSON = json_encode($this);

        return $myJSON;
	}
}
