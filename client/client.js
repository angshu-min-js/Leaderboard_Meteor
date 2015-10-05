
 Meteor.subscribe('thePlayers');
  
  Template.leaderboard.helpers({
    'player': function(){
       var currentUserId = Meteor.userId();
	return PlayersList.find({}, {sort: {score: -1, name: 1}});
    },
       'selectedClass': function() {
     	var playerId = this._id;
	var selectedPlayer = Session.get('selectedPlayer');
	if(playerId === selectedPlayer){
	return "selected";
	}
	},
	'showSelectedPlayer': function(){
	var selectedPlayer = Session.get('selectedPlayer');
	return PlayersList.findOne(selectedPlayer);
	}

	
  });
  

  Template.leaderboard.events({
    'click .player': function(){
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
      //console.log("You clicked a .player element");
      //var selectedPlayer = Session.get('selectedPlayer');
     // console.log(selectedPlayer);
    },
	'click .increment': function(){
	var selectedPlayer = Session.get('selectedPlayer');
	Meteor.call('modifyPlayerScore', selectedPlayer, 5);
	//PlayersList.update(selectedPlayer, {$inc: {score: 5}});
	//console.log(selectedPlayer);
	},
	'click .decrement': function(){
	var selectedPlayer = Session.get('selectedPlayer');
	Meteor.call('modifyPlayerScore', selectedPlayer, -5);
	console.log(selectedPlayer);
	},
	'click .remove': function(){
	var selectedPlayer = Session.get('selectedPlayer');
	//PlayersList.remove(selectedPlayer);
	Meteor.call('removePlayerData', selectedPlayer);
}
  });

	Template.playerForm.events({
	'submit form': function(event){
	event.preventDefault();
	var playerNameVar = event.target.playerName.value;
	Meteor.call('insertPlayerData', playerNameVar);
	}
	});




