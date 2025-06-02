<?php
class Messages
{
	// Properties
	public $num;
	public $m;//users friends

	public function __construct()
	{
		$this->num = 0;
		$this->m = array();
	}

	public function set_num($num)
	{
		$this->num = $num;
	}

	public function set_num_add($num)
	{
		$this->num = $this->num + $num;
	}

	public function append_m($message)
	{
		array_push($this->m, $message);
	}

	public function asOneString($message, ...$x)
	{
		$n = '';
  		$len = count($x);
  		for($i = 0; $i < $len; $i++) {
    		$n = $n . $x[$i] . ',';
  		}
		$n = $n . $message;
  		return $n;
	}
	
	
	public function print()
	{
		//prints with sructure size:data
		//eg 5:hello7:goodbye
		//$t = 6;
	   
		echo strlen((string) $this->num) . ":" . $this->num;

		if(count($this->m) === 0)
		{
			//nothing
		}
		else
		{
			foreach ($this->m as $x)
			{
				echo strlen($x) . ":" . $x;
			}
		}
		
		//echo $this;
	    //echo $this->num;
	    //echo $this->friends;
	    //$myJSON = json_encode($this);
		//echo "fdfs hello";
        //return $myJSON;
	}
}
