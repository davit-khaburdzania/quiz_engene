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
	 $("#status_bar").animate({"width": (Math.round( 700/q_length * ind ) + "px")}, 800);
}

function shuffle(o){
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}

function next_clicked(event){
	if(ind >= questions.length) {
		alert("its all thank u !");
		return;
	}
	set_question(questions[ind]);
	set_status_bar(ind + 1);
	ind++;
}

function answer_clicked(event){
	 var current_answer = event.srcElement.getAttribute("id")
	 if(question[ind-1].answer == current_answer)
	 	alert("your are right");
}