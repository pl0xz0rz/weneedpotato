function PhysicsObject(x,y,vx,vy,width,height){


	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;

	this.ax = 0;
	this.ay = 0;

	this.svx = 0;
	this.svy = 0;

	this.sax = 0;
	this.say = 0;

	this.xHardness = .45;
	this.yHardness = .45;
	
	this.xFriction = .5;
	this.yFriction = .5;
		

	this.garbage = false;

	this.width = width;
	this.height = height;
		
	this.idealWidth = this.width;
	this.idealHeight = this.height;

	this.updateFrame = updateFrame;
	function updateFrame(){
		this.x += this.vx + this.ax / 2;
		this.y += this.vy + this.ay / 2;
		this.width += this.svx + this.sax / 2 - this.vx - this.ax/2;
		this.height += this.svy + this.say / 2 - this.vy - this.ay/2;
		this.vx += this.ax;
		this.vy += this.ay;
		this.svx += this.sax;
		this.svy += this.say;
		this.ax = 0;
		this.ay = 0;
		this.sax = 0;
		this.say = 0;
		this.say += this.yHardness * (this.idealHeight - this.height);
		this.sax += this.xHardness * (this.idealWidth  - this.width );
		this.ax -= this.sax;
		this.ay -= this.say;
		
		this.svx -= this.vx;
		this.svx *= this.xFriction * .5;
		this.vx += this.svx;
		this.svx += this.vx;
		
		this.svy -= this.vy;
		this.svy *= this.yFriction * .5;
		this.vy += this.svy;
		this.svy += this.vy;


		}

}

function HeroFairy(x,y,r,str){
  this.po = new PhysicsObject(x-r,y-r,0,0,r*2,r*2);
this.x = x;
this.y = y;
this.str = str;
  this.render = render;
  function render(){
		obdl.beginPath();
		obdl.strokeStyle="#002600";
		obdl.fillStyle="#008000";
		obdl.moveTo(this.po.x - camera.x + this.po.width / 2, this.po.y - camera.y);
		obdl.quadraticCurveTo(this.po.x - camera.x,this.po.y - camera.y,this.po.x - camera.x,this.y - camera.y+ this.po.height / 2);
		obdl.quadraticCurveTo(this.po.x - camera.x,this.po.y - camera.y+ this.po.height,this.po.x  - camera.x + this.po.width/2,this.po.y - camera.y + this.po.height);
		obdl.quadraticCurveTo(this.po.x - camera.x + this.po.width,this.po.y - camera.y + this.po.height,this.po.x - camera.x + this.po.width,this.y - camera.y + this.po.height/2);
		obdl.quadraticCurveTo(this.po.x - camera.x + this.po.width,this.po.y - camera.y,this.po.x  - camera.x+ this.po.width / 2,this.po.y - camera.y);
		obdl.fill();	
  }
  this.updateFrame = updateFrame;
  function updateFrame(){
    this.po.updateFrame();
    this.x = this.po.x + this.po.width / 2;
    this.y = this.po.y + this.po.height / 2;
  }
  this.seek = seek;
  function seek(x,y){
    var dx = x - this.x;
    var dy = y - this.y;
    var pa = this.str/Math.sqrt(dx * dx + dy * dy);
    if(pa){
      this.po.vx += dx * pa;
      this.po.svx += dx * pa;
      this.po.vy += dy * pa;
      this.po.svy += dy * pa;
    }
  }
}

function FloatingIsland(x,y,type){
	this.x = x;
	this.y = y;
	this.type = type;
	
	this.img = imgs[type];
	this.width = widths[type];
	this.height = heights[type];

	this.render = render;
	function render(){
		obdl.drawImage(this.img,this.x - camera.x,this.y - camera.y);
	}
	
}

function Turret(x,y){
        this.x = x;
        this.y = y;

}

function Powerup(x,y,t){
	this.x = x;
	this.y = y;
	
	this.oy = y;
	
	this.vy = 2;
	
	this.width = widths[t];
	this.height = heights[t];
	
	this.eaten = false;
	
	this.img = imgs[t];
	
	this.render = render;
	function render(){
		if(!this.eaten){
			obdl.drawImage(this.img,this.x - camera.x,this.y - camera.y);
		} 
	}
	
	this.updateFrame = updateFrame;
	function updateFrame(){
		this.y += this.vy;
		this.vy -= (this.y -this.oy) * .2;
	}
}

var imgs = [];
var widths = [];
var heights = [];

imgs[0] = document.getElementById("tempfloatingisland"); 
widths[0] = 157;
heights[0] = 11;
imgs[1] = document.getElementById("pentagrambox");
widths[1] = 157;
heights[1] = 157;
imgs[2] = document.getElementById("spud");
widths[2] = 157;
heights[2] = 157;

