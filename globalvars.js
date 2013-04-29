var hlavnaObr=document.getElementById("hlavnaObr");
var obdl=hlavnaObr.getContext("2d");
var obrazovka=document.getElementById("obrazovka");

var introMenu = document.getElementById("introMenu");
var storyScreen = document.getElementById("story");
var hra = document.getElementById("hra");
var vyhra = document.getElementById("vyhra");
var prehra = document.getElementById("prehra");
var tehWinz = document.getElementById("tehWinz");
var noteone = document.getElementById("noteone");
var notetwo = document.getElementById("notetwo");

var pewpew = document.getElementById("pewpew");
var omnom = document.getElementById("omnom");
var bzzt = document.getElementById("bzzt");


var lvls = new Array();

var lvl0=document.getElementById("lvl0"); 
var lvl1=document.getElementById("lvl1"); 
var lvl2=document.getElementById("lvl2");

lvls[0]=lvl0;
lvls[1]=lvl1;
lvls[2]=lvl2;

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
var inventory = new Array(10);
var activeitem = 0;
var hitpoints;
var mana;
var score = 0;

var walls = new Array();
var wallssorted = new BST2(1000);
var hittestArray = new Array();
var enemies = new Array();
var food = new Array();

var bullets = new Array();
var bulletAmount = 0;

var gates = new Array();
var lastgate = 0;

var potato;
var blitzgun;

var wincondition = 0;

var currentlvl=0;
var checkpointid=0;
var numberlevels = 2;
var checkpoints = new Array();
var checkpointAmount = 0;

$(document).ready(function(){
	$(window).keydown(function(event){
		kbMap[event.which] = true;;
		if (event.which === 'K'.charCodeAt(0)) {
			lives = 0;
		}
	}).keyup(function(event){
		kbMap[event.which] = false;
	}).mouseup(function(event){
		if(bezi) protagonist.action(xmouse + camera.x,ymouse + camera.y);
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
    tehWinz.style.display="none";
}

function magicPushbutton(){
		checkpoints = new Array();
		checkpointAmount = 0;
		currentlvl = 0;
		score = 0;
		inventory[0] = false;
		nacitajLevel(lvls[currentlvl].width,lvls[currentlvl].height,lvls[currentlvl],150,150);
		introMenu.style.display="none";
		hra.style.display="block";
		playtime = 0;
}

function vyhraj(){
	destroyOldGame();
	hra.style.display="none";
	vyhra.style.display="block";
	endtime.innerHTML = playtime;
	endscore.innerHTML = score;
	if(score < 1000) {epicwin.style.display = "block"; badending.style.display = "none"};
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

function win(){
	if(++currentlvl > numberlevels) {		vyhraj()} else {
		checkpointid=0;
		destroyOldGame();
		hra.style.display="none";
		tehWinz.style.display="block";
		inventory[0] = false;
	};
}

function tryagain(){
		nacitajLevel(lvls[currentlvl].width,lvls[currentlvl].height,lvls[currentlvl],150,150);
		
		introMenu.style.display="none";
  		prehra.style.display="none";
		vyhra.style.display="none";	
		tehWinz.style.display="none";
		hra.style.display="block";
		protagonist.po.x = checkpoints[checkpointid].x;
		protagonist.po.y = checkpoints[checkpointid].y;
}

function resume(){
	noteone.style.display="none";
	notetwo.style.display="none";
	hra.style.display="block";
	bezi = true;
}
