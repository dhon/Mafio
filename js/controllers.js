angular.module("app.controllers", [])
.controller("homeCtrl", function($scope, $location, services) {
    console.log("Home Controller is Working!");
    services.setNames();
    services.setRoles();
    services.setButtons();
    services.setStatus();
    services.setSaved();
    services.setVotes();
    services.setMessages();
})

.controller("dayCtrl", function($scope, $location, services) {
    console.log("Day Controller is Working!");
    $scope.players = services.getPlayers();
    $scope.nominate = function(index){
        var nom = services.nominate(index);
        if(nom == 10)
            $location.path('/day');
        else if(nom == 7)
            $location.path('/night');
        else
            $location.path('/vote');
    };
})

.controller("nightCtrl", function($scope, $location, services) {
    console.log("Night Controller is Working!");
    $scope.players = services.getPlayers();
    $scope.action = function(index){
        var act = services.action(0);
        if(act == 'check') services.check(index);
        if(act == 'save') services.save(index);
        if(act == 'kill') services.kill(index);
        $location.path('/day');
    };
})

.controller("voteCtrl", function($scope, $location, services) {
    console.log("Vote Controller is Working!");
    $scope.players = services.getPlayers();
    $scope.voted = function(bool){
        players[0].vote = bool;
        // RANDOM AI VOTES HERE
    }
})

.controller("logCtrl", function($scope, $location, services) {
    console.log("Log Controller is Working!");
    $scope.players = services.getPlayers();
    $scope.passfail = function(){
        // if pass, go night
        // if fail, go day
    }
})

.controller("resultsCtrl", function($scope, $location, services) {
    console.log("Results Controller is Working!");
    $scope.players = services.getPlayers();
});