const Corp = "砖雕艺术馆",
	Enum = [
		{
			route : "/",
			callback(req, res){
				res.render("./home", {
					style : ["./css/home.css"],
					script : ["./js/home.js"],
					keywords : ["微信", "移动端", "手机端", "砖雕艺术馆", "ikindness"].join(", "),
					description : "砖雕艺术馆前端培训，砖雕艺术家的个人站",
					title : `${Corp}`
				});
			}
		},
		{
			route : "/random",
			callback(req, res){
				res.render("./random", {
					style : ["./css/random.css"],
					script : ["./js/random.js"],
					keywords : ["抽奖", "点名", "砖雕艺术馆", "ikindness"].join(", "),
					description : "砖雕艺术馆前端培训，砖雕艺术家的个人站",
					title : `点名系统V0.0.2 beta${Corp}`
				});
			}
		}
	];
export default router => {
	Enum.map(list => {
		router.route(list.route).get(function(req, res){
			list.callback(req, res);
		});
	});
	return router;
};