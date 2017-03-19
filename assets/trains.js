//==============================================================
//
//	various varibles
//
//==============================================================
//	set up firebase var
//	set up trains array
//==============================================================
var db = firebase.database();
var trains = [];


//==============================================================
//
//	event listener - click event
//
//==============================================================
//	input: click event from provided button on page
//	takes input from DOM and parses into new train object
//	adds object to trains array
//	pushes trains array to firebase database,
//	replacing currently existing array
//==============================================================
$("#addNew").on("click", function(){
	//pull user inputs
	var newTrain = {
	name : $("#name").val(),
	dest : $("#dest").val(),
	first : $("#first").val(),
	freq : parseInt($("#freq").val())
	};
	// //add to database
	trains.push(newTrain);
	db.ref("trains").set(trains);
});

//==============================================================
//
//	event listener - firebase
//
//==============================================================
//	input: changes to database
//	intent: every time the database changes, update the table
//	implementation:
//	update trains array via pulling from database
//	loop through array and create new table DOM elements
//	fill DOM elements with contents from train object in array
//	calculate other values as needed
//	append new DOM elements to html
//==============================================================

db.ref().on("value", function(snapshot) {
  trains = snapshot.val().trains;
  //clear DOM element
  $("#trains").empty();
  //draw trains
  for(var i = 0; i < trains.length; i++){
  	//create new row
  	var row = $("<tr>");

  	//easy part: append parts from object
  	row.append( "<td>" + trains[i].name + "</td>");
  	row.append( "<td>" + trains[i].dest + "</td>");
  	row.append( "<td>" + trains[i].freq + "</td>");

  	//calculate next train and minutes till
  	var calc = trainMath(trains[i]);
  	row.append( "<td>" + calc.next + "</td>");
  	row.append( "<td>" + calc.mins + "</td>");

  	//add that shit to the HTML
  	$("#trains").append(row);
  }

});


//==============================================================
//
//	trainMath
//
//==============================================================
//	input: object containing train info
//	output: object containing time of next train and minutes till then
//	implementation: use moments to calculate next train using
//					arrival time of first train and frequency
//					of the trains. return obj containing variables
//					with the time of the next train and difference
//					between now and then.
//==============================================================

function trainMath(trainObj){

	var baseline = moment(trainObj.first,"hh:mm");
	console.log(baseline);
	var freq = trainObj.freq;
	var now = moment();

	//convert current time into mins, subtract baseline
	var runningTime = now.diff(baseline, "minutes");
	//find modulus of current time - baseline, based on freq - time til next
	var timeToNextTrain = freq - runningTime%freq;
	//divide current time - baseline by freq, add 1 and multiply by freq for next train
	var trains = nextTrain/freq;
	var nextTrain = trains++;
	//make it back into time
	nextTrain = nextTrain * freq;
	var next = moment(baseline).add(nextTrain, "minutes").format("hh:mm");


	return {
		mins: timeToNextTrain,
		next: next
	}
}