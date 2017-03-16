angular.module("app.controllers", [])
.controller("homeCtrl", function($scope, $location, services) {
    console.log("Home Controller is Working!");
    services.resetGame();
})

.controller("dayCtrl", function($scope, $location, services) {
    console.log("Day Controller is Working!");
    $scope.players = services.getPlayers();
    $scope.nominate = function(index){
        var nom = services.nominate(index);
        if(nom == 7)
            $location.path('/night');
        else if(nom >= 0 && nom <= 6)
            $location.path('/vote');
    };
})

.controller("nightCtrl", function($scope, $location, services) {
    console.log("Night Controller is Working!");
    $scope.players = services.getPlayers();
    $scope.action = function(index){
        services.action(index)
        $location.path('/day');
    };
})

.controller("voteCtrl", function($scope, $location, services) {
    console.log("Vote Controller is Working!");
    $scope.players = services.getPlayers();
    $scope.formal = services.getFormalName();
    $scope.vote = function(bool){
        services.vote(bool);
        $location.path('/log');
    };
})

.controller("logCtrl", function($scope, $location, services) {
    console.log("Log Controller is Working!");
    $scope.players = services.getPlayers();
    $scope.formal = services.getFormalName();
    $scope.passFail = function(){
        var pf = services.passFail();
        if(pf == true)
            $location.path('/night');
        else
            $location.path('/day');
    };
})

.controller("resultsCtrl", function($scope, $location, services) {
    console.log("Results Controller is Working!");
    $scope.players = services.getPlayers();
});