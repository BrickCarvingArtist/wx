import gulp from "gulp";
import stylus from "gulp-stylus";
import uglify from "gulp-uglify";
const path = {
	stylus : "./dev_resource/stylus/*.styl",
	js : "./dev_resource/js/*.js"
};
gulp.task("stylus", () => {
	return gulp.src(path.stylus).pipe(stylus({
		compress : 1
	})).pipe(gulp.dest("./resource/css"));
});
gulp.task("js", () => {
	return gulp.src(path.js).pipe(uglify()).pipe(gulp.dest("./resource/js"));
});
gulp.task("default", ["js", "stylus"], () => {
	gulp.watch(["./dev_resource/**/*"], ["js", "stylus"]);
});