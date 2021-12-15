<?php 



if (! function_exists('zero_fill')) {
    function zero_fill($val) {
        return sprintf("%08d", $val);
    }
}
  
 ?>