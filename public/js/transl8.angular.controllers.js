var transl8App = angular.module('transl8App', ['ngRoute']);

var feedback = {
		'display': true,
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
		.otherwise({//handle 404s by redirecting to the home page.
			redirectTo: '/'
		});
});

transl8App.controller('MainController', function($scope, $http, $httpParamSerializer){
	$scope.languages = 'nothing here yet';
	$scope.showForm = false;
	$scope.feedback = feedback;

	$scope.newLanguage = function(){
		$scope.showForm = !$scope.showForm;
		$scope.newLang = {users: 1};
	}

	$http.get('/api/getLangs').then(
		function(response){ //success callback
			$scope.languages = response.data;
			console.log($scope.languages);
		}, function(response){//error callback
			console.log('Error: ' + response.data);
			$scope.languages = 'an error occurred';
		}
	);

	$scope.addLang = function(){ 

		//need something here to prevent error on hitting "addlang button" too many times.
		//Maybe make the send button un-pressable until the data changes, or clear out $scope.newLang...
		$http.post('/api/create', $scope.newLang).then(function(response){
			$scope.feedback = response.data;
			$scope.showForm = false;
		});

	}
});

transl8App.controller('DetailController', function($scope, $http, $routeParams){
	// $scope.message = $routeParams;
	var focusLanguage = $routeParams.langName;
	$http.get('/api/langDetail/' + focusLanguage).then(
		function(response){
			$scope.language = response.data;
			console.log('got detail data successfully');
		}, 
		function(response){
			console.log('Error:' + response.data);
			$scope.language = '404: language not found.';
		}
	);
});

transl8App.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});