twoBackApp.controller('questionController', ['$scope', '$interval', '$resource', function($scope, $interval, $resource) {

	var letter_array = $scope.main.generateLetters(42, 2);
	$scope.started_trial = false;
	$scope.trial_num = -1;
	$scope.current_letter = letter_array[$scope.trial_num + 1];
	var answer_array=[];
	var times_array=[];
	var start_time = Date.now();
	$scope.offset = 2;
	var countdown = 0;
	$scope.showletter = true;
	$scope.showmatches = false;
	var intervalPromise = $interval(function(){
										countdown += 0.5;
										if(countdown===0.5){
											$scope.showletter = false;
										}
										if(countdown===3.5){
											$scope.showmatches = true;
										}
									},500,8); //starts the countdown

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
			$scope.main.two_back = false;

			$scope.main.two_back_results = {
				num_correct: $scope.num_correct,
				num_total: $scope.trial_num,
				answer_array: answer_array,
				letter_array: letter_array,
				times: times_array
			};
			$scope.main.started = false;

		}else{
			start_time = Date.now();
			$scope.trial_num++;
			$scope.current_letter = letter_array[$scope.trial_num + 1];
			$interval.cancel(intervalPromise);
			$scope.showletter = true;
			$scope.showmatches = false;
			countdown = 0;
			intervalPromise = $interval(function(){
										countdown += 0.5;
										if(countdown===0.5){
											$scope.showletter = false;
										}
										if(countdown===3.5){
											$scope.showmatches = true;
										}
									},500,8); //starts the countdown
		}	
	}


}]);

twoBackApp.controller('threebackController', ['$scope', '$resource', function($scope, $resource) {

	var letter_array = $scope.main.generateLetters(43, 3);
	$scope.started_trial = false;
	$scope.trial_num = -2;
	$scope.current_letter = letter_array[$scope.trial_num + 2];
	var answer_array=[];
	var times_array=[];
	var start_time = Date.now();
	$scope.offset = 3;

	var countdown = 0;
	$scope.showletter = true;
	$scope.showmatches = false;
	var intervalPromise = $interval(function(){
										countdown += 0.5;
										if(countdown===0.5){
											$scope.showletter = false;
										}
										if(countdown===3.5){
											$scope.showmatches = true;
										}
									},500,8); //starts the countdown

	$scope.num_correct = 0;
	$scope.advance = function(answer){
		var end_time = Date.now();
		if($scope.started_trial){
			times_array.push({start_time: start_time,
							  end_time: end_time});
			answer_array.push(answer);
			if($scope.current_letter === letter_array[$scope.trial_num -1]){
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
			$scope.main.three_back_results = {
				num_correct: $scope.num_correct,
				num_total: $scope.trial_num,
				answer_array: answer_array,
				letter_array: letter_array,
				times: times_array
			};

			submit_browsing_history(function(){
				console.log("done submitting browsing history");
				$scope.main.save_result();
                $scope.main.browsing_history_submitted = true;
            });

		}else{
			start_time = Date.now();
			$scope.trial_num++;
			$scope.current_letter = letter_array[$scope.trial_num + 2];
			$interval.cancel(intervalPromise);
			$scope.showletter = true;
			$scope.showmatches = false;
			countdown = 0;
			intervalPromise = $interval(function(){
										countdown += 0.5;
										if(countdown===0.5){
											$scope.showletter = false;
										}
										if(countdown===3.5){
											$scope.showmatches = true;
										}
									},500,8); //starts the countdown
		}	
	}
}]);
