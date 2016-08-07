const Corp = "-砖雕艺术馆",
	Enum = [
		{
			route : "/",
			callback(req, res){
				res.render("./home", {
					style : [],
					script : [],
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