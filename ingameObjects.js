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

function HeroFairy(x,y,r,str,hp,mana){
  this.po = new PhysicsObject(x-r,y-r,0,0,r*2,r*2);
this.x = x;
this.y = y;
this.str = str;
this.hp = hp;
this.maxhp = hp;
this.mana = mana;
this.maxmana = mana;
  this.render = render;
  this.exists = true;
  this.cooldown = 5;
  this.cdtime = 0;
  function render(){
		obdl.beginPath();
		obdl.strokeStyle="#000000";
		obdl.fillStyle="#c1ff99";
		obdl.lineWidth=2;
		obdl.moveTo(this.po.x - camera.x + this.po.width / 2, this.po.y - camera.y);
		obdl.quadraticCurveTo(this.po.x - camera.x,this.po.y - camera.y,this.po.x - camera.x,this.y - camera.y+ this.po.height / 2);
		obdl.quadraticCurveTo(this.po.x - camera.x,this.po.y - camera.y+ this.po.height,this.po.x  - camera.x + this.po.width/2,this.po.y - camera.y + this.po.height);
		obdl.quadraticCurveTo(this.po.x - camera.x + this.po.width,this.po.y - camera.y + this.po.height,this.po.x - camera.x + this.po.width,this.y - camera.y + this.po.height/2);
		obdl.quadraticCurveTo(this.po.x - camera.x + this.po.width,this.po.y - camera.y,this.po.x  - camera.x+ this.po.width / 2,this.po.y - camera.y);
		obdl.fill();
		obdl.stroke();
		var p = new Particle(this.x,this.y,10,"#99ff99",30);
		displayObjects.push(p);	
  }
  this.updateFrame = updateFrame;
  function updateFrame(){
    this.po.updateFrame();
    this.x = this.po.x + this.po.width / 2;
    this.y = this.po.y + this.po.height / 2;
    if(Math.abs(this.po.vx - this.po.svx) > .5) this.hp -= 1;
    if(Math.abs(this.po.vy - this.po.svy) > .7) this.hp -= 1;
    if(this.cdtime < (this.cooldown + 2))this.cdtime ++;
    this.hp -= .01;
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
  this.action = action;
  function action(x,y){
	if(inventory[activeitem]){
		switch(activeitem){
			case 0:
				if((this.cdtime >= this.cooldown) && (this.mana >= 1)) {
					var d = 5000;
					var td = 0;
					var bi = -1;
					for(var i in enemies){
						td = (enemies[i].x - this.x) * (enemies[i].x - this.x) + (enemies[i].y - this.y) * (enemies[i].y - this.y);
						if(td < d) {d = td; bi = i} 
					}
					if(bi > -1){
						this.cdtime -= this.cooldown;
						this.mana -= 1;
						enemies[bi].hp -= 6;
						var a = new LightningBolt(this.x,this.y,enemies[bi].x,enemies[bi].y);
						displayObjects.push(a);	
						bzzt.currentTime = 0;
						bzzt.play();
					}	
				}
			break;
		}
	}
  }
}

function Imp(x,y,t,str,hp,mana){
	this.t = t;
	this.width = widths[t];
	this.height = heights[t];
        this.img = imgs[t];
  this.po = new PhysicsObject(x,y,0,0,this.width,this.height);
this.x = x;
this.y = y;
this.hp = hp;
this.maxhp = hp;
this.mana = mana;
this.maxmana = mana;
  this.render = render;
  this.exists = true;
  this.cooldown = 5;
  this.cdtime = 0;
  this.ox = x;
  this.oy = y;
  this.str = str;
  function render(){
		obdl.drawImage(this.img,this.x - camera.x - this.width / 2,this.y - camera.y - this.height / 2);
		var p = new Particle(this.x,this.y,10,"#330033",30);
		displayObjects.push(p);	
  }
  this.updateFrame = updateFrame;
  function updateFrame(){
    this.po.updateFrame();
    this.x = this.po.x + this.po.width / 2;
    this.y = this.po.y + this.po.height / 2;
    if(Math.abs(this.po.vx - this.po.svx) > .5) this.hp -= 1;
    if(Math.abs(this.po.vy - this.po.svy) > .7) this.hp -= 1;
    if(this.cdtime < (this.cooldown + 2))this.cdtime ++;
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
  this.avoid = avoid;
  function avoid(x,y){
    var dx = x - this.x;
    var dy = y - this.y;
    var pa = this.str/Math.sqrt(dx * dx + dy * dy);
    if(pa){
      this.po.vx -= dx * pa;
      this.po.svx -= dx * pa;
      this.po.vy -= dy * pa;
      this.po.svy -= dy * pa;
    }
  }
  this.standstill = standstill;
  function standstill(){
	this.seek(this.ox,this.oy);
  }

  this.action = action;
  function action(x,y){
	if((this.cdtime >= this.cooldown) && (this.mana >= 3)) {
		this.cdtime -= this.cooldown;
		this.mana -= 3;
    var dx = x - this.x;
    var dy = y - this.y;
    var pa = this.str/Math.sqrt(dx * dx + dy * dy);
    if(pa){
		var l = new BlackOrb(this.x,this.y,4,pa * dx * 30 + this.po.vx,pa * dy * 30 + this.po.vy);
		displayObjects.push(l);
		bullets[bulletAmount] = l;
		++bulletAmount;
						pewpew.currentTime = 0;
						pewpew.play();
    }
		

	}	
  }
}

function FloatingIsland(x,y,type){
	this.x = x;
	this.y = y;
	this.type = type;

	this.exists = true;
	
	this.img = imgs[type];
	this.width = widths[type];
	this.height = heights[type];

	this.render = render;
	function render(){
		obdl.drawImage(this.img,this.x - camera.x,this.y - camera.y);
	}
	
}

function Turret(x,y,t,hp,mana){
	this.t = t;
	this.width = widths[t];
	this.height = heights[t];
        this.img = imgs[t];
  this.po = new PhysicsObject(x,y,0,0,this.width,this.height);
this.x = x;
this.y = y;
this.hp = hp;
this.maxhp = hp;
this.mana = mana;
this.maxmana = mana;
  this.cannon = new vec2(0,30);
  this.render = render;
  this.cooldown = 20;
  this.cdtime = 0;
  this.exists = true;
  function render(){
		obdl.drawImage(this.img,this.x - camera.x - this.width / 2,this.y - camera.y - 40);
		obdl.strokeStyle="#333333";
		obdl.lineWidth=4;
		obdl.beginPath();
		obdl.moveTo(this.x - camera.x,this.y - 5 - camera.y);
		obdl.lineTo(this.x+this.cannon.x - camera.x,this.y+this.cannon.y - 5 - camera.y);
		obdl.stroke();
  }
  this.updateFrame = updateFrame;
  function updateFrame(){
    this.po.updateFrame();
    this.x = this.po.x + this.po.width / 2;
    this.y = this.po.y + 40;
    if(this.cdtime < (this.cooldown + 2))this.cdtime ++;
    if(this.mana < this.maxmana)this.mana += .01;
  }
  this.seek = seek;
  function seek(x,y){
		x -= this.x;
		y -= this.y - 5;
		var temp = 1 / Math.sqrt((x*x+y*y)/(this.cannon.x*this.cannon.x + this.cannon.y * this.cannon.y));
		this.cannon.x = temp*x;
		this.cannon.y = temp*y;
  }
  this.action = action;
  function action(x,y){
	if((this.cdtime >= this.cooldown) && (this.mana >= 3)) {
		this.cdtime -= this.cooldown;
		this.mana -= 3;
		
		
		var l = new BlackOrb(this.cannon.x + this.x,this.cannon.y + this.y - 5,4,this.cannon.x*.3,this.cannon.y*.3);
		displayObjects.push(l);
		bullets[bulletAmount] = l;
		++bulletAmount;
						pewpew.currentTime = 0;
						pewpew.play();

		
	}
  }
}

function Gate(x,y){
	this.x = x;
	this.y = y;
	this.w = 2.5;
	this.vw = 0;

	this.exists = true;

	this.render = render;
	function render(){
		obdl.strokeStyle="#c1c1ff";
		this.vw -= this.w / 5;
		this.w += this.vw;
		obdl.lineWidth=this.w + 5;
		obdl.beginPath();
		obdl.moveTo(this.x - camera.x,this.y - camera.y);
		obdl.lineTo(this.x - camera.x,this.y + 150 - camera.y);
		obdl.stroke();		
	}
}

function Powerup(x,y,t){
	this.x = x;
	this.y = y;
	
	this.oy = y;
	

	


	this.width = widths[t];
	this.height = heights[t];

	this.vy = 3;
	
	this.exists = true;
	
	this.img = imgs[t];
	
	this.render = render;
	function render(){
		if(!this.eaten){
			obdl.drawImage(this.img,this.x - camera.x,this.y - camera.y);
		this.y += this.vy;
		this.vy -= (this.y -this.oy) * .05; //animation, couldn't make anything better
		} 
	}
	
}

function Checkpoint(x,y,t){
	this.x = x;
	this.y = y;
	this.t = t;

	this.width = widths[t];
	this.height = heights[t];
	
	this.used = false;

	this.exists = true;
	
	this.img = imgs[t];
	
	this.render = render;
	function render(){
		obdl.drawImage(this.img,this.x - camera.x,this.y - camera.y); 
	}

	this.use = use;
	function use(){
		this.t += 1;
		this.used = true;
		this.img = imgs[this.t];
	}
}

function BlackOrb(x,y,r,vx,vy){
	this.vx = vx;
	this.vy = vy;
	this.x = x;
	this.y = y;
	this.r = r;
	this.width = 1;
	this.height = 1;

	this.exists = true;
	
	this.updateFrame=updateFrame;
	function updateFrame(){
		this.x += this.vx;
		this.y += this.vy;
	}
	
	this.render = render;
	function render(){
		obdl.fillStyle="#110011";
		obdl.beginPath();
		obdl.arc(this.x - camera.x,this.y - camera.y,this.r,0,2*Math.PI);
		obdl.fill();	
	}
}

function LightningBolt(x1,y1,x2,y2){
	this.x1 = x1;
	this.x2 = x2;
	this.y1 = y1;
	this.y2 = y2;
	this.timer = 30;
	this.exists = true;

	this.render = render;
	function render(){
		obdl.strokeStyle="#ffffc1";
		obdl.lineWidth=this.timer/5;
		obdl.beginPath();
		obdl.moveTo(this.x1 - camera.x,this.y1 - camera.y);
		obdl.lineTo(this.x2 - camera.x,this.y2 - camera.y);
		obdl.stroke();
		if(--this.timer<0) this.exists = false;
	}

}

function Particle(x,y,r,color,timer){
	this.x = x;
	this.y = y;
	this.r = r;
	this.color = color;
	this.tick = r / timer;
	this.exists = true;

	this.render = render;
	function render(){
		obdl.fillStyle=color;
		obdl.beginPath();
		obdl.arc(this.x - camera.x,this.y - camera.y,this.r,0,2*Math.PI);
		obdl.fill();	
		this.r -= this.tick;
		if(this.r <= 1) this.exists = false;
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
imgs[3] = document.getElementById("tripod");
widths[3] = 100;
heights[3] = 100;
imgs[4] = document.getElementById("checkpointoff");
widths[4] = 40;
heights[4] = 70;
imgs[5] = document.getElementById("checkpointon");
widths[5] = 40;
heights[5] = 70;
imgs[6] = blitzgunimg;
widths[6] = 30;
heights[6] = 30;
imgs[7] = impimg;
widths[7] = 50;
heights[7] = 50;
