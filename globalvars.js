var hlavnaObr=document.getElementById("hlavnaObr");
var obdl=hlavnaObr.getContext("2d");
var obrazovka=document.getElementById("obrazovka");

var introMenu = document.getElementById("introMenu");
var storyScreen = document.getElementById("story");
var hra = document.getElementById("hra");
var vyhra = document.getElementById("vyhra");
var prehra = document.getElementById("prehra");


var lvl1=document.getElementById("lvl1"); 

var stuff = new Array();

var pozadia = new Array();

var vypnutyZvuk;

var bezi = false;

var kbMap = new Array(256);

var displayObjects = new Array();

var protagonist;

var xmouse;
var ymouse;

var camera = new AxisAlignedBoundingBox(0,0,600,400);

var playtime;

var walls = new Array();

$(document).ready(function(){
	$(window).keydown(function(event){
		kbMap[event.which] = true;;
		if (event.which === 'K'.charCodeAt(0)) {
			lives = 0;
		}
	}).keyup(function(event){
		kbMap[event.which] = false;
	}).mouseup(function(event){
		//if(bezi) protagonist.vystrel();
	}).mousemove(function(event){
		xmouse = event.clientX - hlavnaObr.offsetLeft;
		ymouse = event.clientY - hlavnaObr.offsetTop;
	});
	var t = setTimeout(function(){enterFrame()},12);
	cinterval = setInterval(function(){if(bezi){++ playtime;playtimespan.innerHTML = playtime}},1000);
});

function zobrazPribeh(){
	introMenu.style.display="none";
	storyScreen.style.display="block";
}

function moveLevelUp(){
	introMenu.style.display="block";
	storyScreen.style.display="none";
    prehra.style.display="none";
    vyhra.style.display="none";	
}

function magicPushbutton(){
		nacitajLevel(40,30,lvl1,150,150);
		introMenu.style.display="none";
		hra.style.display="block";
}

function vyhraj(){
	destroyOldGame();
	hra.style.display="none";
	vyhra.style.display="block";
	endtime.innerHTML = playtime;
}

function prehraj(){
	destroyOldGame();
	hra.style.display="none";
	prehra.style.display="block";
}

function muteButton(){
	if(vypnutyZvuk){
	vypnutyZvuk = false;
	uvodhudba.muted = false;
	} else {
	vypnutyZvuk = true;
	uvodhudba.muted = true;
	}
}

function switchTrack(to){

}
