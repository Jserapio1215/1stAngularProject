var app = angular.module("HangmanApp",[]);
app.controller("GameController",['$scope','$timeout',function($scope,$timeout){

	var words = ["Aboushi", "Avril", "Baldwin", "Bass", "Bennett", "Boykin", "Britt", "Brown", "Brown", "Carson", "Chancellor", "Clark", "Coleman", "Collins", "Cromartie", "Darboh", "Davis", "Davis", "Desir", "Donatell", "Elliott", "Fant", "Frese", "Garvin", "Glowinski", "Graham", "Grayson Jr.", "Griffin", "Harris", "Hill", "Hunt", "Ifedi", "Jefferson", "Jenkins", "Joeckel", "Jones", "Jordan", "Kearse", "Lacy", "Lane", "Lawler", "Liggins", "Lockett", "Lucas", "Madden", "Marsh", "McCray", "McDonald", "McDougald", "McDowell", "McEvoy", "McKissic", "Moore", "Myers", "Odhiambo", "Ott", "Palacio", "Pericak", "Peters", "Pierre-Louis", "Pocic", "Powell", "Prosise", "Rawls", "Reed", "Richardson", "Rogers", "Roos", "Rubin", "Ryan", "Senior", "Shead", "Sherman", "Simone", "Smith", "Smith", "Swoopes", "Thomas", "Thompson", "Thorpe", "Tyson", "Usher", "Vannett", "Wagner", "Walsh", "Wilhoite", "Williams", "Willson", "Wilson", "Wright"];
	$scope.incorrectLettersChosen = [];
	$scope.correctLettersChosen = [];
	$scope.guess = 6;
	$scope.displayWord = '';
	$scope.input = {
		letter: ''
	}
	// console.log($scope.input);

	var wordSelection = function() {
		var index = Math.round(Math.random() * words.length);
		return words[index];
	}

	$scope.newGame = function() {

		$scope.incorrectLettersChosen = [];
		$scope.correctLettersChosen = [];
		$scope.guess = 6;
		$scope.displayWord = '';

		$scope.selectedWord = wordSelection();
		console.log($scope.selectedWord);

		var tempDisplayWord = '';
		for (var i = 0; i < $scope.selectedWord.length; i++) {
			tempDisplayWord += '*';
		}
		$scope.displayWord = tempDisplayWord;

	}

	$scope.letterChosen = function(){
		for (var i = 0; i < $scope.correctLettersChosen.length; i++) {
			if($scope.correctLettersChosen[i].toUpperCase() == $scope.input.letter.toUpperCase()) {
				$scope.input.letter = "";
				return;
			}
		}

		for (var i = 0; i < $scope.incorrectLettersChosen.length; i++) {
			if($scope.incorrectLettersChosen[i].toUpperCase() == $scope.input.letter.toUpperCase()) {
			$scope.input.letter = "";
			return;
			}
		}

		var correct = false;
		for (var i = 0; i < $scope.selectedWord.length; i++) {
			if($scope.selectedWord[i].toUpperCase() == $scope.input.letter.toUpperCase()) {
				$scope.displayWord = $scope.displayWord.slice(0,i) + $scope.input.letter.toUpperCase() + $scope.displayWord.slice(i + 1);
				correct = true;
			}
		}
		if(correct){
			$scope.correctLettersChosen.push($scope.input.letter.toUpperCase());
		} else {
			$scope.incorrectLettersChosen.push($scope.input.letter.toUpperCase());
			$scope.guess = $scope.guess - 1;
		}
		$scope.input.letter = '';
		if($scope.guess === 0){
			$("loser").addClass('showResult');
			alert("You Lost! The player was " + $scope.selectedWord);
			// $timeout(function(){
			// 	$scope.newGame();
			// },500)
		}
		if($scope.displayWord.indexOf("*") == -1){
			alert("You Won!");
			// $timeout(function(){
			// 	$scope.newGame();
			// },500)
		}

	}

$scope.newGame();
}]);