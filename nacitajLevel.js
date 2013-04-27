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

        playtime = 0;

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
			break;
			case 0x1f1f1f:
				var a =new FloatingIsland(((i / 4) % x )* xscale,Math.floor(i / (4 * x) )* yscale,1);
				displayObjects.push(a);
				walls.push(a);	
			break;
			case 0xFF0000:
				var a =new HeroFairy(((i / 4) % x  + .5)* xscale,Math.floor(i / (4 * x) )* yscale,10,.1);
				displayObjects.push(a);		
				stuff.push(a);
				protagonist = a;
			break;
			/*case 0x0000FF:
				var a =new Fairy(((i / 4) % x )* xscale+1,Math.floor(i / (4 * x) )* yscale);
				displayObjects.push(a);		
				fairies.push(a);			
			break;*/
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
	
}
