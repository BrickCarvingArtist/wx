import gulp from "gulp";
import stylus from "gulp-stylus";
const path = {
	stylus : "./dev_resource/stylus/*.styl",
	script : "./dev_resource/js/*.js"
};
gulp.task("stylus", () => {
	return gulp.src(path.stylus).pipe(stylus({
		compress : 1
	})).pipe(gulp.dest("./resource/css"));
});
gulp.task("script", () => {
	return gulp.src(path.script).pipe(gulp.dest("./resource/js"));
});
gulp.task("watch", () => {
	gulp.watch(path.stylus, ["stylus"]);
	gulp.watch(path.script, ["script"]);
});
gulp.task("default", ["watch", "stylus", "script"]);