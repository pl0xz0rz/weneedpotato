function nacitajLevel(x,y,map,xs,ys){
	xscale = xs;
	yscale = ys;
	
	cameraMinX = 0;
	cameraMaxX = x * xs;
	cameraMinY = 0;
	cameraMaxY = y * ys;
	
	xoff = 0;
	yoff = 0;
	
	cvx = 0;
	cvy = 0;
	cax = 0;
	cay = 0;

	bulletAmount = 0;

	checkpoints = new Array();
	checkpointAmount = 0;

	enemies = new Array();
	food = new Array();
	gates = new Array();

	score -= 200;

	obdl.drawImage(map,0,0);
	var mapData = obdl.getImageData(0,0,x,y);
	
	for (var i=0;i<mapData.data.length;i+=4)
    {
	/*			console.log(mapData.data[i]);
				console.log(mapData.data[i+1]);
				console.log(mapData.data[i+2]);
				console.log(mapData.data[i+3]);*/
		switch (mapData.data[i] * 0x10000 + mapData.data[i+1] * 0x100 + mapData.data[i+2] * 0x1) {
			case 0:
				var a =new FloatingIsland(((i / 4) % x )* xscale,Math.floor(i / (4 * x) )* yscale,0);
				displayObjects.push(a);
				walls.push(a);
				var alu = new aabbcorner(a.x,a.y,a);
				var ard = new aabbcorner(a.x + a.width,a.y + a.height,a); 
				wallssorted.push(alu); wallssorted.push(ard);	
			break;
			case 0x1f1f1f:
				var a =new FloatingIsland(((i / 4) % x )* xscale,Math.floor(i / (4 * x) )* yscale,1);
				displayObjects.push(a);
				walls.push(a);	
				var alu = new aabbcorner(a.x,a.y,a);
				var ard = new aabbcorner(a.x + a.width,a.y + a.height,a); 
				wallssorted.push(alu); wallssorted.push(ard);
			break;
			case 0xFF0000:
				var a =new HeroFairy(((i / 4) % x  + .5)* xscale,Math.floor(i / (4 * x) )* yscale,10,.1,20,20);
				a.po.y += 87;
				displayObjects.push(a);		
				stuff.push(a);
				protagonist = a;
				checkpoints[0] = new Checkpoint(a.x,a.y + 87,4);
				displayObjects.push(checkpoints[0]);
			break;
			case 0x0000FF:
				var a =new Turret(((i / 4) % x + .25)* xscale+1,Math.floor(i / (4 * x) )* yscale,3,15,15);
				displayObjects.push(a);		
				enemies.push(a);
				stuff.push(a);			
			break;
			case 0xff01ff:
				var a = new Powerup(((i / 4) % x )* xscale+1,Math.floor(i / (4 * x) )* yscale,2);
				displayObjects.push(a);		
				potato = a;			
			break;
			case 0x00ff00:
				var a = new Checkpoint(((i / 4) % x  + .5)* xscale+1,Math.floor(i / (4 * x) )* yscale,4);
				a.y += 87;
				++checkpointAmount;
				checkpoints[checkpointAmount] = a;
				displayObjects.push(a);
			break;
			case 0xb01414:
				var a = new Powerup(((i / 4) % x  + .5)* xscale+1,Math.floor(i / (4 * x) )* yscale,6);
				displayObjects.push(a);		
				blitzgun = a;	
			break;
			case 0xff6600:
				var a = new Imp(((i / 4) % x  + .5)* xscale,Math.floor(i / (4 * x) )* yscale,7,.1,12,30);
				displayObjects.push(a);		
				enemies.push(a);
				stuff.push(a);	
			break;
			case 0x80390a:
				var a = new Gate(((i / 4) % x  + .5)* xscale+1,Math.floor(i / (4 * x) )* yscale);
				gates.push(a);
				displayObjects.push(a);
			break;
		}
	}
	zapniHru();
}

function zapniHru(){
	bezi = true;
	hitpoints = 30;
	
	switchTrack(1);
	
}

function destroyOldGame(){
	protagonist = null;
	stuff = new Array();
	bezi = false;
	displayObjects = new Array();
	walls = new Array();
	wallssorted = new BST2();
	wincondition = 0;
}
