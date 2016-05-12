twoBackApp.controller('questionController', ['$scope', '$resource', function($scope, $resource) {

	var letter_array = generateLetters();
	$scope.started_trial = false;
	$scope.trial_num = -1;
	$scope.current_letter = letter_array[$scope.trial_num + 1];
	var answer_array=[];
	var times_array=[];
	var start_time = Date.now();

	$scope.num_correct = 0;
	$scope.advance = function(answer){
		var end_time = Date.now();
		if($scope.started_trial){
			times_array.push({start_time: start_time,
							  end_time: end_time});
			answer_array.push(answer);
			if($scope.current_letter === letter_array[$scope.trial_num - 1]){
				if(answer ==='match') $scope.num_correct++;
			}else{
				if(answer==='nomatch') $scope.num_correct++;
			}
		}

		if($scope.trial_num === 0){
			$scope.started_trial = true;
		}

		if($scope.trial_num === 40){
			$scope.main.finished = true;
			$scope.main.total = $scope.trial_num;
			$scope.main.num_correct = $scope.num_correct;
			$scope.main.answer_array = answer_array;
			$scope.main.times = times_array;
			$scope.main.letter_array = letter_array;

			submit_browsing_history(function(){
				console.log("done submitting browsing history");
				$scope.save_result();
                $scope.main.browsing_history_submitted = true;
            });

		}else{
			start_time = Date.now();
			$scope.trial_num++;
			$scope.current_letter = letter_array[$scope.trial_num + 1];
		}	
	}


	$scope.pretend_submit = function(feedback){
      $scope.main.feedback = feedback;
      $scope.main.currently_submitting = true;

      if($scope.main.browsing_history_submitted === false){
        console.log("waiting to submit");
        start_spinner();
      }else{
        $scope.save_result();
      }
   }

	$scope.save_result = function(){
		var res = $resource("/testResult");
        res.save({id: $scope.main.username, 
                  num_correct: $scope.main.num_correct,
                  num_total: $scope.main.total,
                  answer_array: $scope.main.answer_array,
                  letters: $scope.main.letter_array,
                  times: $scope.main.times,
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

	function generateLetters(){
		var letters = [];
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		for( var i=0; i < 42; i++ ){
	    	letters.push(possible.charAt(Math.floor(Math.random() * possible.length)));
		}
	    return letters;
	}

}]);