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