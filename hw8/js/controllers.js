// var listApp = angular.module('listApp',[]); 
//listApp.controller('ListController', ['$scope', function($scope) { $scope.mydata = [ ];

// 	// sample method $scope.myMethod = function() { // code here to update any variables referenced by the view template }; }]);
// 	

//params: name, [dependencies], 
var listApp = angular.module('listApp', []);

//params: name, function that accepts scope.
listApp.controller('ListController', function($scope){

	// sample data
	$scope.cheeses = [
		{'name': 'Brie', 'price': '5.00', 'style': 'soft-ripened', 'country': 'France'},
		{'name': 'Valdeon','price': '7.00','style': 'blue','country': 'Spain'},
		{'name': 'Stilton','price': '4.00','style': 'blue','country': 'England'},
		{'name': 'Vlaskaas','price': '5.00','style': 'Gouda','country': 'Holland'}
	];


	$scope.showDetail = function(item){
		$scope.hideDetail = false;
	}
});