window.onload = function() {

	function $(divid){
		return document.getElementById(divid);
	}

	$("a").onclick = function(){
		$("two").style.display = "none";
		$("one").style.display = "block";
		$("a").setAttribute("class", $("a").getAttribute("class").replace("btn-default","btn-primary"));
		$("b").setAttribute("class", $("b").getAttribute("class").replace("btn-primary","btn-default"));
	}

		$("b").onclick = function(){
		$("one").style.display = "none";
		$("two").style.display = "block";
		$("b").setAttribute("class", $("b").getAttribute("class").replace("btn-default","btn-primary"));
		$("a").setAttribute("class", $("a").getAttribute("class").replace("btn-primary","btn-default"));
	}
}