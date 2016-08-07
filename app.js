import express from "express";
import bodyParser from "body-parser";
import {ServerConfig} from "./config";
import RouterApi from "./controller/api";
import RouterStatic from "./controller/static";
const port = process.env.PORT || ServerConfig.port,
	app = express(),
	router = express.Router();
app.use(bodyParser.urlencoded({
	extended : 1
}));
app.set("views", `${__dirname}/view`);
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/resource`, {
	maxAge : 600000
}));
app.all("*", (req, res, next) => {
	next();
});
app.all("/api/*", (req, res, next) => {
	console.log(req.path);
	next();
});
app.use(RouterApi(router));
app.use(RouterStatic(router));
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});