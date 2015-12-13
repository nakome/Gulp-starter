var app = (function(){
	'use strict';
	return {
		init: function(){
			console.log('Start');
		}
	};
})();

window.addEventListener('load',function(){
	app.init();
});