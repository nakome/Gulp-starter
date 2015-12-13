#Install example

Open console with Admin.

	// update dependencies please wait ;)
	npm update --save
	// run gulp
	gulp 

**That's it!**


#Documentation for new Gulp theme

Init package.json

	npm init

Add dependencies

	npm install --save-dev gulp-plugin-name

Basic dependencies

	npm install --save-dev gulp
	npm install --save-dev gulp-concat
	npm install --save-dev gulp-uglify

Install with package.json

	"devDependencies": {
	    "browser-sync": "*",
	    "gulp": "*",
	    "gulp-concat": "*",
	    "gulp-file-include": "*",
	    "gulp-imagemin": "*",
	    "gulp-jsbeautifier": "*",
	    "gulp-jshint": "*",
	    "gulp-less": "*",
	    "gulp-rename": "*",
	    "gulp-uglify": "*",
	    "gulp-uglifycss": "*"
	},

Update dependencies

	npm update --save


Create tasks in gulpfile.js  ( View gulpfile.js to understand )



Run gulp with server

	gulp

