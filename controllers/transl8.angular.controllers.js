var transl8App = angular.module('transl8App', []);

transl8App.controller('Transl8Controller', function($scope, $http){
	$scope.languages = 'nothing here yet';
	$http.get('/api/getLangs').then(
		function(response){ //success callback
			$scope.languages = response.data;
			console.log('got data successfully');
		}, function(response){//error callback
			console.log('Error: ' + response.data);
			$scope.languages = 'an error occurred';
		}
	);
});