angular.module("app.controllers", [])
.controller("homeCtrl", function($scope, $location, services) {
    console.log("Home Controller is Working!");
    services.resetGame();
})

.controller("nightCtrl", function($scope, $location, services) {
    console.log("Night Controller is Working!");
    $scope.players = services.getPlayers();
    if(services.isGameOver() != 0)
        $location.path('/results');
    $scope.action = function(index){
        if(services.action(index))
            $location.path('/day');
    };
})

.controller("dayCtrl", function($scope, $location, services) {
    console.log("Day Controller is Working!");
    $scope.players = services.getPlayers();
    if(services.isGameOver() != 0)
        $location.path('/results');
    $scope.nominate = function(index){
        var nom = services.nominate(index);
        if(nom == 7)
            $location.path('/night');
        else if(nom >= 0 && nom <= 6)
            $location.path('/vote');
    };
})

.controller("voteCtrl", function($scope, $location, services) {
    console.log("Vote Controller is Working!");
    $scope.players = services.getPlayers();
    $scope.formal = services.getFormalName();
    $scope.vote = function(ynd){
        services.vote(ynd);
        $location.path('/log');
    };
})

.controller("logCtrl", function($scope, $location, services) {
    console.log("Log Controller is Working!");
    $scope.players = services.getPlayers();
    $scope.formal = services.getFormalName();
    $scope.voteResult = services.passFail();
    $scope.passFail = function(){
        if($scope.voteResult == 'Passed')
            $location.path('/night');
        else
            $location.path('/day');
    };
})

.controller("resultsCtrl", function($scope, $location, services) {
    console.log("Results Controller is Working!");
    $scope.players = services.getPlayers();
    $scope.team = services.isGameOver()
});