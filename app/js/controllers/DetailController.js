
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