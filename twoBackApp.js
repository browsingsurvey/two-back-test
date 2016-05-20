var twoBackApp = angular.module('twoBackApp', ['ngResource']);


twoBackApp.controller('MainController', ['$scope', '$resource', function($scope, $resource) {
	
	$scope.main = {};
	username = $scope.main.username = gup('username', window.location.href);

	$scope.main.finished = false;
	$scope.main.started = false;
	$scope.main.submitted = false;
	$scope.main.total;
	$scope.main.num_correct;
	$scope.main.browsing_history_submitted = false;
	$scope.main.currently_submitting = false;


	function gup( name, url ) {
	  if (!url) url = location.href;
	  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  var regexS = "[\\?&]"+name+"=([^&#]*)";
	  var regex = new RegExp( regexS );
	  var results = regex.exec( url );
	  return results == null ? null : results[1];
	}

}]);