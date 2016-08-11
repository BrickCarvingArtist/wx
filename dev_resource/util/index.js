function ajax(option){
	function queryString(object){
		var arrQuery = [];
		for(var i in object){
			arrQuery.push("&" + i + "=" + object[i]);
		}
		return arrQuery.join("").slice(1);
	}
	var xhr = new XMLHttpRequest(),
		type = option.type,
		dataType = option.dataType,
		strQuery = queryString(option.data),
		readyState = [],
		loadingFunction = option.loading,
		successFunction = option.success,
		errorFunction = option.error;
	function loading(readyState){
		typeof loadingFunction === "function" && loadingFunction(readyState);
	}
	function success(responseText){
		typeof successFunction === "function" && successFunction(responseText);
	}
	function error(responseText){
		typeof errorFunction === "function" && errorFunction(responseText);
	}
	function afterOpen(){}
	function afterSend(){}
	function beforeGet(){}
	function alreadyGet(){
		var responseText = dataType && dataType === "text" ? xhr.responseText : JSON.parse(xhr.responseText);
		if(xhr.status === 200){
			success(responseText);
		}else{
			error(responseText);
		}
	}
	xhr.onreadystatechange = function(){
		loading(xhr.readyState);
		[, afterOpen, afterSend, beforeGet, alreadyGet][xhr.readyState]();
	};
	xhr.open(type || "get", option.url + (type === "post" ? "" : strQuery ? "?" + strQuery : ""), option.asnyc || 1);
	strQuery && type === "post" && xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send(strQuery && type === "post" ? strQuery : null);
}