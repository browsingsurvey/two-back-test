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
	$scope.main.clicked_submit = false;

	$scope.main.two_back = true;

	$scope.main.pretend_submit = function(feedback){
	  $scope.main.clicked_submit = true;
      $scope.main.feedback = feedback;
      $scope.main.currently_submitting = true;

      if($scope.main.browsing_history_submitted === false){
        console.log("waiting to submit");
        start_spinner();
      }else{
        $scope.main.save_result();
      }
   	}

	$scope.main.save_result = function(){
		console.log($scope.main.two_back_results);
		console.log($scope.main.three_back_results);


		var res = $resource("/testResult");
        res.save({id: $scope.main.username,
        		  two_back_results: $scope.main.two_back_results,
        		  three_back_results: $scope.main.three_back_results,
                  feedback:$scope.main.feedback
                }, function(response){
                  $scope.main.code = calcMD5($scope.main.username);
                  $scope.main.submitted = true;
                  end_spinner();
                  console.log("saved successfully!");
            }, function errorHandling(err) { 
                console.log("could not save result");
            });

	}

	function gup( name, url ) {
	  if (!url) url = location.href;
	  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  var regexS = "[\\?&]"+name+"=([^&#]*)";
	  var regex = new RegExp( regexS );
	  var results = regex.exec( url );
	  return results == null ? null : results[1];
	}


	$scope.main.generateLetters = function(num, offset){
		var letters = [];
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		var prev1 = null;
		var prev2 = null;
		for( var i=0; i < num; i++ ){
			var is_same_as_prev2 = Math.random() < 1.0/3;
			if (i < offset) {
				is_same_as_prev2 = false;
			}
			var current =  null;
			if (is_same_as_prev2) {
				current = letters[i-offset];
			} else {
				var new_possible = possible.split('').filter(function(x) { return x != letters[num-offset] }).join('');
				var letter_idx = Math.floor(new_possible.length * Math.random());
				current = new_possible[letter_idx];
			}
			letters.push(current);
		}
	    return letters;
	}

}]);