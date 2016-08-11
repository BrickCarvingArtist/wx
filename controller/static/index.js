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
					title : `首页${Corp}`
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