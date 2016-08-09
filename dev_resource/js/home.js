"use strict";
document.documentElement.style.fontSize = window.innerWidth / 16 + "px";
function ajax(option){
	var xhr = new XMLHttpRequest(),
		_this = this;
	xhr.open(option.type || "get", option.url, option.asnyc || 1);
	option.data && xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			var responseText = option.dataType && option.dataType === "text" ? xhr.responseText : JSON.parse(xhr.responseText);
			if(xhr.status === 200){
				option.success && option.success(responseText);
			}else{
				option.fail && option.fail(responseText);
			}
		}
	};
	xhr.send(option.data || null);
}
function Banner(option){
	var position = option.position,
		option = option.option,
		length = option.length,
		width = position.offsetWidth,
		previousIndex = length - 1,
		currentIndex = 0,
		nextIndex = 1,
		arrAd = [],
		arrButton = [],
		timer;
	function Ad(option){
		var dom = document.createElement("a"),
			startX,
			startT,
			endX,
			endT,
			direction,
			distance,
			duration,
			mode,
			animationName,
			shouldChangeIndex;
		dom.href = option.anchorHref;
		dom.style.backgroundImage = "url(" + option.imageUrl + ")";
		dom.title = option.name;
		dom.addEventListener("touchstart", function(e){
			clearInterval(timer);
			this.classList.remove("current");
			startX = e.touches[0].clientX;
			startT = Date.now();
		}, 0);
		dom.addEventListener("touchmove", function(e){
			distance = e.touches[0].clientX - startX;
			direction = distance < 0;
			dom.style.left = distance + "px";
			if(direction){
				arrAd[getIndex(0)].getDOM().style.left = null;
				arrAd[getIndex(1)].getDOM().style.left = width + distance + "px";
			}else{
				arrAd[getIndex(0)].getDOM().style.left = distance - width + "px";
				arrAd[getIndex(1)].getDOM().style.left = null;
			}
		}, 0);
		dom.addEventListener("touchend", function(e){
			endX = e.changedTouches[0].clientX;
			endT = Date.now();
			distance = endX - startX;
			direction = distance > 0;
			distance = Math.abs(distance);
			duration = endT - startT;
			if(distance < width / 2 && duration >= 300){
				if(direction){
					arrAd[getIndex(0)].getDOM().classList.add("rtl");
				}else{
					arrAd[getIndex(1)].getDOM().classList.add("ltr");
				}
				mode = "init";
			}else if(direction && (distance >= width / 2 || duration < 300)){
				arrAd[getIndex(0)].getDOM().classList.add("init");
				mode = "ltr";
				shouldChangeIndex = 1;
			}else{
				arrAd[getIndex(1)].getDOM().classList.add("init");
				mode = "rtl";
				shouldChangeIndex = 1;
			}
			this.classList.add(mode);
			timer = autoSlide();
		}, 0);
		dom.addEventListener("animationend", function(e){
			animationName = e.animationName;
			if(~["init", "ltr", "rtl", "previous"].indexOf(animationName)){
				this.classList.remove(animationName);
				this.style.left = animationName === "init" ? 0 : null;
				if(animationName === "ltr"){
					shouldChangeIndex && setIndex(getIndex(0), 1);
				}else if(animationName === "rtl"){
					shouldChangeIndex && setIndex(getIndex(1), 1);
				}
			}
			shouldChangeIndex = 0;
		});
		this.getDOM = function(){
			return dom;
		};
	}
	function createDOM(){
		var fragment = document.createDocumentFragment(),
			banner = document.createDocumentFragment(),
			ad,
			indicator = document.createElement("div"),
			button;
		indicator.className = "indicator";
		option.map(function(list, index){
			arrAd.push(createBanner(banner, ad, Object.assign({
				index : index
			}, list)));
			arrButton.push(createIndicatorButton(indicator, button, index));
		});
		fragment.appendChild(banner);
		fragment.appendChild(indicator);
		return fragment;
	}
	function createBanner(banner, ad, option){
		ad = new Ad(option);
		banner.appendChild(ad.getDOM());
		return ad;
	}
	function createIndicatorButton(indicator, button, index){
		button = document.createElement("em");
		button.appendChild(document.createTextNode(index + 1));
		button.addEventListener("touchstart", function(e){
			e.stopPropagation();
			clearInterval(timer);
		})
		button.addEventListener("touchend", function(){
			timer = autoSlide();
			setIndex(index);
		}, 0);
		indicator.appendChild(button);
		return button;
	}
	function getIndex(type){
		return [(currentIndex > 0 ? currentIndex : length) - 1, currentIndex < length - 1 ? currentIndex + 1 : 0][type];
	}
	function setIndex(index, mode){
		previousIndex = currentIndex;
		currentIndex = index;
		nextIndex = getIndex(currentIndex, 1);
		if(!mode){
			arrAd[previousIndex].getDOM().classList.remove("current");
			arrAd[previousIndex].getDOM().classList.add("previous");
			arrAd[currentIndex].getDOM().classList.add("current");
		}
		arrButton[previousIndex].classList.remove("current");
		arrButton[currentIndex].classList.add("current");
	}
	function autoSlide(){
		return setInterval(function(){
			setIndex(getIndex(1));
		}, 6000);
	}
	function init(){
		position.appendChild(createDOM());
		arrAd[currentIndex].getDOM().classList.add("current");
		arrButton[currentIndex].classList.add("current");
		timer = autoSlide();
	}
	init();
}
var banner = document.querySelector(".banner");
ajax({
	url : "http://www.ikindness.cn/api/test/get",
	success : function(data){
		new Banner({
			position : banner,
			option : data.data
		});
	}
});