//keeping track of the trains
var trainIndex;
var database = firebase.database();
database.ref("index").on("value", function(snapshot) {
  trainIndex = snapshot.val();
});

//event listener - click event
$("#addNew").on("click", function(){
	//update index
	database.ref("index").set(trainIndex+1);
	//pull user inputs
	var newTrain = {
	name : $("#name").val(),
	dest : $("#dest").val(),
	first : $("#first").val(),
	freq : $("#freq").val()
	};
	// //add to database
	database.ref("trains").push().set(newTrain);
});


//event listener - firebase
database.ref("trains").on("value", function(snapshot) {
  //stuff
});


//init
	//update from firebase

//timer
	//update from firebase

//algorithm
	//take vars
	//return next train & next arrival


// 	first;
// 	freq;
// 	var now = moment();
// 	var runningTime = moment(first).toNow();
// 	var timeToNextTrain = runningTime%freq;
// 	var trains = nextTrain/freq;
// 	var nextTrain = trains++;
// 	nextTrain = nextTrain * freq;
// 	moment(baseline).add(nextTrain, "minutes");
// }