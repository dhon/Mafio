angular.module('app.services', [])
.factory('services', [function(){

    var players = [
        {name:"", role:"", button:"", status:true, saved:false, checked:false, formal:false, vote:"", message:""},
        {name:"", role:"", button:"", status:true, saved:false, checked:false, formal:false, vote:"", message:""},
        {name:"", role:"", button:"", status:true, saved:false, checked:false, formal:false, vote:"", message:""},
        {name:"", role:"", button:"", status:true, saved:false, checked:false, formal:false, vote:"", message:""},
        {name:"", role:"", button:"", status:true, saved:false, checked:false, formal:false, vote:"", message:""},
        {name:"", role:"", button:"", status:true, saved:false, checked:false, formal:false, vote:"", message:""},
        {name:"", role:"", button:"", status:true, saved:false, checked:false, formal:false, vote:"", message:""}
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
        resetChecked();
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
        var array = [0, 1, 2, 3, 4, 5, 6];
        shuffle(array);
        players[array[0]].role = 'Cop';
        players[array[1]].role = 'Medic';
        players[array[2]].role = 'Vanilla';
        players[array[3]].role = 'Vanilla';
        players[array[4]].role = 'Vanilla';
        players[array[5]].role = 'Mafia';
        players[array[6]].role = 'Mafia';
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

    function resetChecked(){
        for(var i = 0; i < 7; i++)
            players[i].checked = false;
    };

    function resetVote(){
        for(var i = 0; i < 7; i++)
            players[i].vote = "";
    };

    function resetFormal(){
        for(var i = 0; i < 7; i++)
            players[i].formal = false;
    };

    function resetMessage(){
        var a = null;
        var b = null;
        for(var i = 0; i < 7; i++){
            players[i].message = 'You are ' + players[i].role;
            if(players[i].role == 'Mafia')
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
        if(players[0].role == 'Cop'){
            saveRNG();
            killRNG();
            check(index);
        }else if(players[0].role == 'Medic'){
            save(index);
            killRNG();
            checkRNG();
        }else if(players[0].role == 'Mafia'){
            saveRNG();
            kill(index);
            checkRNG();
        }else{
            saveRNG();
            killRNG();
            checkRNG();
        }
    };

    function save(index){
        if(index == 7)
            return;
        players[index].saved = true;
    };

    function saveRNG(){
        var array = [];
        for(var i = 1; i < 7; i++)
            if(players[i].role == 'Medic' && players[i].status){
                for(var j = 0; j < 7; j++)
                    if(i != j && players[j].status)
                        array.push(j);
                shuffle(array);
                players[array[0]].saved = true;
                save(array[0]);
            }
    };

    function kill(index){
        if(index == 7)
            return;
        if(players[index].saved == false){
            players[index].status = false;
            players[index].vote = 'DEAD';
            players[index].button += ' is a dead ' + players[index].role + '.'
        }
        resetSaved();
    };

    function killRNG(){
        var array = [];
        for(var i = 1; i < 7; i++)
            if(players[i].role == 'Mafia' && players[i].status){
                for(var j = 1; j < 7; j++)
                    if(players[j].role != 'Mafia' && players[j].status)
                        array.push(j);
                shuffle(array);
                kill(array[0]);
                break;
            }
    };

    function check(index){
        if(index == 7)
            return;
        var team = 'town';
        if(players[index].role == 'Mafia')
            team = 'mafia';
        players[0].message += ', ' + players[index].name + ' is ' + team;
        players[index].checked = true;
    };

    function checkRNG(){
        var array = [];
        for(var i = 1; i < 7; i++)
            if(players[i].role == 'Cop' && players[i].status){
                for(var j = 0; j < 7; j++)
                    if(i != j && players[j].checked == false && players[j].status)
                        array.push(j);
                if(array.length > 0){
                    shuffle(array);
                    check(array[0]);
                }
            }
    };

    function nominate(index){
        resetFormal();
        if(index == 7)
            return 7;
        else if(players[index].status)
            players[index].formal = true;
            return index;
    };

    function vote(ynd){
        players[0].vote = ynd;
        for(var i = 1; i < 7; i++)
            if(players[i].status){
                var array = ['Yes', 'Yes', 'Yes', 'No', 'No'];
                shuffle(array);
                players[i].vote = array[0];
            }
        if(passFail() == 'Passed')
            voteKill();
    };

    function voteKill(){
        var i = getFormalID();
        players[i].status = false;
        players[i].vote = 'DEAD';
        players[i].button += ' is a dead ' + players[i].role;
    };

    function passFail(){
        var alive = 0;
        var vote = 0;
        for(var i = 0; i < 7; i++)
            if(players[i].status){
                alive++;
                if(players[i].vote == 'Yes')
                    vote++;
            }
        if(vote*2 > alive)
            return 'Passed';
        return 'Failed';
    };

    function isGameOver(){
        var mafia = 0;
        var town = 0;
        for(var i = 0; i < 7; i++)
            if(players[i].status)
                if(players[i].role == 'Mafia')
                    mafia++;
                else
                    town++;
        if(mafia == 0)
            return 'Town';
        if(mafia == town)
            return 'Mafia';
        return 0;
    };

    function getFormalID(){
        for(var i = 0; i < 7; i++)
            if(players[i].formal)
                return i;
    };

    function getFormalName(){
        for(var i = 0; i < 7; i++)
            if(players[i].formal)
                return players[i].name;
    };

    function getPlayers(){
        return players;
    };

    return{
        resetGame, action, nominate, vote, passFail, isGameOver, getFormalName, getPlayers
    };

}]);