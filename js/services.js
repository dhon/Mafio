angular.module('app.services', [])
.factory('services', [function(){

    var players = [
        {name:"", role:"", button:"", status:true, saved:false, vote:false, formal:false, message:""},
        {name:"", role:"", button:"", status:true, saved:false, vote:false, formal:false, message:""},
        {name:"", role:"", button:"", status:true, saved:false, vote:false, formal:false, message:""},
        {name:"", role:"", button:"", status:true, saved:false, vote:false, formal:false, message:""},
        {name:"", role:"", button:"", status:true, saved:false, vote:false, formal:false, message:""},
        {name:"", role:"", button:"", status:true, saved:false, vote:false, formal:false, message:""},
        {name:"", role:"", button:"", status:true, saved:false, vote:false, formal:false, message:""}
    ];

    // Fisher–Yates shuffle
    function shuffle(array){
        var m = array.length, t, i;
        while(m){
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    };

    function resetGame(){
        resetName();
        resetRole();
        resetButton();
        resetStatus();
        resetSaved();
        resetVote();
        resetFormal();
        resetMessage();
    };

    function resetName(){
        players[0].name = 'YOU';
        players[1].name = 'Joey';
        players[2].name = 'Pope';
        players[3].name = 'Guy';
        players[4].name = 'Slip';
        players[5].name = 'Ryuzilla';
        players[6].name = 'Trump';
    };

    function resetRole(){
        var nums = [0, 1, 2, 3, 4, 5, 6];
        shuffle(nums);
        players[nums[0]].role = 'Cop';
        players[nums[1]].role = 'Medic';
        players[nums[2]].role = 'Vanilla';
        players[nums[3]].role = 'Vanilla';
        players[nums[4]].role = 'Vanilla';
        players[nums[5]].role = 'Mafia';
        players[nums[6]].role = 'Mafia';
    };

    function resetButton(){
        players[0].button = 'YOU';
        players[1].button = 'Joey';
        players[2].button = 'Pope';
        players[3].button = 'Guy';
        players[4].button = 'Slip';
        players[5].button = 'Ryuzilla';
        players[6].button = 'Trump';
    };

    function resetStatus(){
        for(var i = 0; i < 7; i++)
            players[i].status = true;
    };

    function resetSaved(){
        for(var i = 0; i < 7; i++)
            players[i].saved = false;
    };

    function resetVote(){
        for(var i = 0; i < 7; i++)
            players[i].vote = false;
    };

    function resetFormal(){
        for(var i = 0; i < 7; i++)
            players[i].formal = false;
    };

    function resetMessage() {
        var a = null;
        var b = null;
        for(var i = 0; i < 7; i++){
            players[i].message = 'You are ' + players[i].role;
            if (players[i].role == 'Mafia')
                if(a == null)
                    a = i;
                else
                    b = i;
        }
        players[a].message += ' with ' + players[b].name;
        players[b].message += ' with ' + players[a].name;
    };

    // Create RNG Actions Here
    function action(index){
        if(players[0].role == 'Cop')
            check(index);
        if(players[0].role == 'Medic')
            save(index);
        if(players[0].role == 'Mafia')
            kill(index);
    };

    function check(index){
        if(index == 7)
            return;
        var team = 'town';
        if(players[index].role == 'Mafia')
            team = 'mafia';
        players[0].message += ', ' + players[index].name + ' is ' + team;
    };

    function save(index){
        resetSaved();
        if(index == 7)
            return;
        players[index].saved == true;
    };

    function kill(index){
        if(index == 7)
            return;
        if(players[index].saved == false){
            players[index].status = false;
            players[index].button += ' is a dead ' + players[index].role + '.'
        }
    };

    function nominate(index){
        resetFormal();
        if(index == 7)
            return 7;
        else if(players[index].status == true)
            players[index].formal = true;
            return index;
    };

    function vote(bool){
        players[0].vote = bool;
        for(var i = 1; i < 7; i++){
            var array = [true, true, true, false, false];
            array = shuffle(array);
            players[i].vote = array[0];
        }
        var pf = passFail();
        if(pf == true)
            voteKill();
    };

    function voteKill(){
        var i = getFormalID();
        players[i].status = false;
        players[i].button += ' is a dead ' + players[i].role;
    };

    function passFail(){
        var alive = 0;
        var vote = 0;
        for(var i = 0; i < 7; i++){
            if(players[i].status == true){
                alive++;
                if(players[i].vote == true)
                    vote++;
            }
        }
        if(vote*2 > alive)
            return true;
        return false;
    };

    function getFormalID(){
        for(var i = 0; i < 7; i++)
            if(players[i].formal == true)
                return i;
    };

    function getFormalName(){
        for(var i = 0; i < 7; i++)
            if(players[i].formal == true)
                return players[i].name;
    };

    function getPlayers(){
        return players;
    };

    return{
        resetGame, action, nominate, vote, passFail, getFormalName, getPlayers
    };

}]);