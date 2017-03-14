angular.module('app.services', [])
.factory('services', [function(){

    var players = [
        {name:"", role:"", button:"", status:true, saved:false, vote:false, message:""},
        {name:"", role:"", button:"", status:true, saved:false, vote:false, message:""},
        {name:"", role:"", button:"", status:true, saved:false, vote:false, message:""},
        {name:"", role:"", button:"", status:true, saved:false, vote:false, message:""},
        {name:"", role:"", button:"", status:true, saved:false, vote:false, message:""},
        {name:"", role:"", button:"", status:true, saved:false, vote:false, message:""},
        {name:"", role:"", button:"", status:true, saved:false, vote:false, message:""}
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

    function setNames(){
        players[0].name = 'YOU';
        players[1].name = 'Joey';
        players[2].name = 'Pope';
        players[3].name = 'Guy';
        players[4].name = 'Slip';
        players[5].name = 'Ryuzilla';
        players[6].name = 'Trump';
    };

    function setRoles(){
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

    function setButtons(){
        players[0].button = 'YOU';
        players[1].button = 'Joey';
        players[2].button = 'Pope';
        players[3].button = 'Guy';
        players[4].button = 'Slip';
        players[5].button = 'Ryuzilla';
        players[6].button = 'Trump';
    };

    function setStatus(){
        for(var i = 0; i < 7; i++)
            players[i].status = true;
    };

    function setSaved(){
        for(var i = 0; i < 7; i++)
            players[i].saved = false;
    };

    function setVotes(){
        for(var i = 0; i < 7; i++)
            players[i].vote = false;
    };

    function setMessages() {
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

    function action(){
        if(players[0].role == 'Cop')
            return 'check';
        if(players[0].role == 'Medic')
            return 'save';
        if(players[0].role == 'Mafia')
            return 'kill';
    }

    function check(index){
        if(index == 7)
            return;
        var team = 'town';
        if(players[index].role == 'Mafia')
            team = 'mafia';
        players[0].message += ', ' + players[index].name + ' is ' + team;
    };

    function save(index){
        setSaved();
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
        if(index == 7)
            return 7;
        else if(players[index].status == true)
            return index;
        else
            return 10;
    };

    function getPlayer(index){
        return players[index];
    };

    function getPlayers(){
        return players;
    };

    return{
        shuffle, setNames, setRoles, setButtons, setStatus, setSaved, setVotes, setMessages,
        action, check, save, kill, nominate, getPlayer, getPlayers
    };

}]);