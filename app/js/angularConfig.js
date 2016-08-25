var transl8App = angular.module('transl8App', ['ngRoute']);

var feedback = {
		'display': false,
		'type': 'success',
		'msg': 'test message'
}

transl8App.config(function($routeProvider){
	$routeProvider
		.when('/', { //render home page template
			templateUrl: 'partials/main.html',
			controller: 'MainController'
		})
		.when('/languages/:langName', { //render detail page template
			templateUrl: 'partials/detail.html',
			controller: 'DetailController'
		})
		.when('/about', {
			templateUrl: 'partials/about.html',
			controller: 'AboutController'
		})		 
		.otherwise({//handle 404s by redirecting to the home page.
			redirectTo: '/'
		});
});

transl8App.controller('AboutController', function($scope){
	//nothing really needed here, yet. 
})

transl8App.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});