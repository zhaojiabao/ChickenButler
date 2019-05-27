window.onload = function() {
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
	//	            var kkk=encodeURIComponent('北京')
	//	            console.log(kkk)
	var areas = decodeURI(GetQueryString('area'))
	document.getElementById('city_area').innerHTML = areas
}