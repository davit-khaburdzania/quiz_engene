var bug; 
var answers;
var next;
var status_bar;
var answered;
var questions;
var test;
var a, b, c, d;
var test_url = "scripts/test.json";
var ind = 0;
var q_length;
var user_answers;

window.onload = function() {
	load_test(test_url, init);
}

function init(){
	bug = document.querySelector("#bug p");
	answers = document.querySelector("#answers")
	next = document.querySelector("#next");
	status_bar = document.querySelector("#status_bar");
	answered = document.querySelector("#left");

	a = document.getElementById("a");	
	b = document.getElementById("b");	
	c = document.getElementById("c");	
	d = document.getElementById("d");	
	set_question(questions[ind]);
	ind++;

	next.addEventListener("click", next_clicked);
	answers.addEventListener("click", answer_clicked);

	set_status_bar(1);
}

function load_test(test_url, callback){
	$.getJSON(test_url, function(data) { 
		test = data;
		questions = test.questions;
		question = shuffle(questions);
		q_length = questions.length;
		user_answers = Array(q_length+1);
		callback();
	});
	
}

function set_question(q){
	bug.innerHTML = q.bug;
	a.innerHTML   = q.a;
	b.innerHTML   = q.b;
	c.innerHTML   = q.c;
	d.innerHTML   = q.d;
}

function set_status_bar(ind){
	answered.innerHTML = ind + "/" + q_length;
	 $("#status_bar").animate({"width": (Math.round( 700/q_length * ind ) + "px")}, 600);
}

function shuffle(o){
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}

function next_clicked(event){
	remove_clicked(null);
	if(ind >= questions.length) {
		sum_up();
		return;
	}
	set_question(questions[ind]);
	set_status_bar(ind + 1);
	ind++;
}

function answer_clicked(event){
	 var current_answer = event.target.getAttribute("id") || event.srcElement.getAttribute("id");
	 if(current_answer == null || current_answer == "answers") return;

	 $("#" + current_answer).addClass("clicked");
	 remove_clicked(current_answer);
	 user_answers[ind] = current_answer;
	
}

function remove_clicked(current_answer){
	 var word = "abcd";
	 for(var i = 0; i < 4; i++) {
	 	if(word.charAt(i) == current_answer)
	 		continue;
	 	$("#" + word.charAt(i)).removeClass("clicked");
	 }
}

function sum_up(){
	var correc_answers = 0;
	$("#next").hide();
	$("#left").hide();
	$("#status_bar").hide();
	
	bug.innerHTML = "Test: " + test.name + "<br>";
	bug.innerHTML += "Level: " + test.level + "<br>";
	bug.innerHTML += "Author: " + test.author;
	answers.innerHTML = "";

	for(var i = 1; i <= q_length; i++) {
		if(user_answers[i] == questions[i-1].answer)
			correc_answers++;
		else
			console.log( questions[i-1].bug );
	}
	var percent = (correc_answers/q_length) * 100;
	percent = percent >>> 0;

	answers.innerHTML += "<br><p>you scored " + percent + "%" + "</p>" + "<p>" + 
						(q_length - correc_answers) + " wrong answers </p>";

}