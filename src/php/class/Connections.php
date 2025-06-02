<?php
class Connections
{
	// Properties
	public $num;
	public $f;//users friends
	public $i;//requests to be friends with the user
	public $o;//requests from user to be anothrer users friend

	public function __construct()
	{
		$this->f = array();
		$this->i = array();
		$this->o = array();
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
	   
		//echo strlen((string) $this->num) . ":" . $this->num;

		//echo "number of friends" . count($this->f) . "   ";
		//echo "first\n\n" . $this->f[0];
		//if(count($this->f) === 0)
		if(empty($this->f))
		{
			//echo "empty";
			echo "0:";
		}
		else
		{
			//echo "not empty";
			$str = "";
			foreach ($this->f as $x)
			{
				//echo "sfd";
				$str = $str . strlen($x) . ":" . $x;
			}
			echo strlen($str) . ":" . $str;

		}



		if(count($this->i) === 0)
		{
			echo "0:";
		}
		else
		{
			$str = "";
			foreach ($this->i as $x)
			{
				$str = $str . $x . ',';
			}
			$str = rtrim($str, ",");
			echo strlen($str) . ":" . $str;
		}

		if(count($this->o) === 0)
		{
			echo "0:";
		}
		else
		{
			$str = "";
			foreach ($this->o as $x)
			{
				$str = $str . $x . ',';
			}
			$str = rtrim($str, ",");
			echo strlen($str) . ":" . $str;
		}
	}


}
