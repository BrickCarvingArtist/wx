function Random(option){
	function random(){
		var sum,
			history,
			index = 0,
			arrMember,
			pageGame = document.querySelector(".page.game"),
			fragment = document.createDocumentFragment();
		function loading(callback){
			var loader = document.querySelector(".loader");
			loader.classList.remove("hidden");
			var progress = 0,
				numberBar = loader.querySelector(".number"),
				progressBar = loader.querySelector(".progress"),
				progressBarWidth = progressBar.offsetWidth,
				progressBarInner = progressBar.querySelector(".inner"),
				timerDelay,
				timerLoad = setInterval(function(){
					numberBar.innerHTML = progress = Math.min(100, progress += Math.ceil(Math.random() * 5));
					progressBarInner.style.width = progressBarWidth / 100 * progress + "px";
					if(progress === 100){
						clearInterval(timerLoad);
						timerDelay = setTimeout(function(){
							clearTimeout(timerDelay);
							loader.classList.add("hidden");
							callback();
						}, 500);
					}
				}, 50);
		}
		function init(){
			var btnStart = pageGame.querySelector(".btn.start"),
				iptCongrat = pageGame.querySelector(".ipt-txt.congrat"),
				btnCongrat = pageGame.querySelector(".btn.congrat"),
				iptRegret = pageGame.querySelector(".ipt-txt.regret"),
				btnRegret = pageGame.querySelector(".btn.regret"),
				value,
				newMember;
			pageGame.classList.remove("hidden");
			arrMember = new Array(sum);
			loading(function(){
				createAllMember();
				pageGame.appendChild(fragment);
				btnStart.onclick = function(){
					start();
				};
				btnCongrat.onclick = function(){
					value = +iptCongrat.value;
					arrMember.filter(function(list){
						return list.index === value;
					}).map(function(list){
						pageGame.removeChild(list.dom);
					});
					arrMember = arrMember.filter(function(list){
						return list.index !== value;
					});
				};
				btnRegret.onclick = function(){
					value = +iptRegret.value;
					newMember = createMember(value);
					pageGame.appendChild(newMember);
					arrMember.push({
						index : value,
						dom : newMember
					});
				};
			});
		}
		function createMember(text){
			var dom = document.createElement("div");
			dom.className = "member";
			dom.innerText = text;
			fragment.appendChild(dom);
			return dom;
		}
		function createAllMember(){
			if(history){
				arrMember = history.map(function(list){
					return {
						index : list,
						dom : createMember(list, fragment)
					};
				});
			}else{
				var i = 0,
					len = arrMember.length;
				for(; i < len; i++){
					arrMember[i] = {
						index : i + 1,
						dom : createMember(i + 1, fragment)
					};
				}
			}
		}
		function start(){
			var duration = 0,
				len = arrMember.length,
				timer;
			function getIndex(index){
				return index < len - 1 ? index + 1 : 0;
			}
			function animation(){
				if(duration < 10){
					timer = setTimeout(function(){
						clearTimeout(timer);
						arrMember[index].dom.classList.remove("current");
						index = getIndex(index);
						arrMember[index].dom.classList.add("current");
						animation();
					}, Math.pow(2, duration += Math.random() / Math.pow(7, Math.sqrt(Math.random()))));
				}else{
					clearTimeout(timer);
					arrMember[index].dom.classList.add("flash");
					arrMember[index].dom.addEventListener("animationend", function clearFlash(){
						this.classList.remove("flash");
						this.removeEventListener("animationend", clearFlash);
					});
				}
			}
			animation();
		}
		return {
			init : function(option){
				sum = option.sum;
				history = option.history;
				init();
			}
		};
	}
	function init(){
		var container = document.querySelector(".random"),
			pageWelcome = container.querySelector(".page.welcome"),
			btnStart = container.querySelector(".btn.start"),
			btnSetting = container.querySelector(".btn.setting"),
			btnExit = container.querySelector(".btn.exit"),
			dialogSetting = container.querySelector(".dialog.setting"),
			btnSure = container.querySelector(".btn.sure"),
			iptSum = container.querySelector(".sum"),
			iptHistory = container.querySelector(".history"),
			sum = +iptSum.value,
			history,
			validHistory;
		btnStart.onclick = function(){
			pageWelcome.classList.add("hidden");
			random().init({
				sum : sum,
				history : history
			});
		};
		btnSetting.onclick = function(){
			dialogSetting.classList.toggle("hidden");
		};
		btnExit.onclick = function(){
			document.body.removeChild(container);
		};
		btnSure.onclick = function(){
			sum = +iptSum.value;
			validHistory = iptHistory.value.replace(/\s/g, "");
			history = validHistory ? validHistory.split(",").map(function(list){
				return +list;
			}) : undefined;
			dialogSetting.classList.add("hidden");
		};
	}
	init();
}
Random();