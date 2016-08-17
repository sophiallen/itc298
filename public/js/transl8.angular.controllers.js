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

transl8App.controller('MainController', function($scope, $http, $httpParamSerializer){
	$scope.showForm = false;
	$scope.feedback = feedback;

	$scope.newLanguage = function(){
		$scope.showForm = !$scope.showForm;
		$scope.newLang = {users: 1};
	}

	$http.get('/api/getLangs').then(
		function(response){ //success callback
			$scope.languages = response.data;
		}, function(response){//error callback
			console.log('Error: ' + response.data);
			$scope.languages = 'an error occurred';
		}
	);

	$scope.addLang = function(){ 
		$scope.showForm = false;

		$http.post('/api/create', $scope.newLang).then(function(response){
			$scope.feedback = response.data;

			//reload list of languages
			$http.get('/api/getLangs').then(
				function(response){ //success callback
					$scope.languages = response.data;
				}, function(response){//error callback
					console.log('Error: ' + response.data);
					$scope.languages = 'an error occurred';
				}
			);
		});
	}
});

transl8App.controller('DetailController', function($scope, $http, $routeParams, $window){
	$scope.displayDetailForm = false;

	var focusLanguage = $routeParams.langName;
	$http.get('/api/langDetail/' + focusLanguage).then(
		function(response){
			$scope.language = response.data;
		}, 
		function(response){
			console.log('Error:' + response.data);

			//404, redirect to home page. 
			$window.location.href= "/SPAindex.html#/"
		}
	);

	$scope.showDetailForm = function(){
		$scope.updateData = {current_name: focusLanguage};
		$scope.displayDetailForm = true;
	}

	$scope.updateLang = function(){
		$http.post('/api/update', $scope.updateData).then(function(response){
			$scope.feedback = response.data;
			$scope.displayDetailForm = false;
			$http.get('/api/langDetail/' + $scope.updateData.new_name).then(
				function(response){
					$scope.language = response.data;
				}, 
				function(response){
					console.log('Error:' + response.data);
				}
			);

		}, function(response){
			$scope.feedback = response.data;
			$scope.displayDetailForm = false;
		});
	}

	$scope.deleteLang = function(){
		var proceed = confirm('Are you sure you want to delete ' + focusLanguage +'?');

		var data = {lang: focusLanguage};
		if (proceed){
			$http.post('/api/delete', data).then(function(response){
				$scope.feedback = response.data;
			});
		}
	}
});

transl8App.controller('AboutController', function($scope){
	//nothing really needed here, yet. 
})

transl8App.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});