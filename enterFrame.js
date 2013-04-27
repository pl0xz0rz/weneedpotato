function renderStuff(){

	obdl.fillStyle="#c1c1c1";
	obdl.fillRect(0,0,camera.width,camera.height);
	
	for (i=displayObjects.length-1;i>=0;--i){
		displayObjects[i].render();
	}

}

function updateCam(){
	cvx *= .9;
	cvy *= .9;
	
	camera.x += cvx;
	camera.y += cvy;
	
	if (cameraMinX > camera.x) {
		camera.x = cameraMinX;
		cvx *= -.2;
	}
	if (cameraMinY > camera.y) {
		camera.y = cameraMinY;
		cvy *= -.2;
	}
	if (cameraMaxX < camera.x + camera.width) {
		camera.x = cameraMaxX - camera.width;
		cvx *= -.2;
	}
	if (cameraMaxY < camera.y + camera.height) {
		camera.y = cameraMaxY - camera.height;
		cvy *= -.2;
	}
	
	for (i in pozadia){
		pozadia[i].x -= cvx / pozadia[i].z;
		pozadia[i].y -= cvy / pozadia[i].z;		
	}	
}

function collisionDetection(){
	for (var i=0;i<stuff.length;i++){
		var aoc = wallssorted.hittestAABB(stuff[i].po,hittestArray);
//		console.log(aoc);
		for (var j=0;j<aoc;j++){
			if(narrowPhase(stuff[i].po,hittestArray[j].box,0)) stuff[i].canJump = 8;
		/*	console.log(hittestArray[j].box);
			console.log(aoc);
			console.log(stuff[i].x);*/
		}
	}


}

function removeGarbage(){

}

function enterFrame(){
 if(bezi){
  collisionDetection();
  for(i in stuff) stuff[i].updateFrame();
  updateCam();
  renderStuff();
  removeGarbage();
	for(i in stuff){
	stuff[i].ay += 1;
	stuff[i].vx *= .995;
	stuff[i].vy *= .995;	

	}
  protagonist.seek(xmouse + camera.x, ymouse + camera.y);
  if(hitpoints <= 0) prehraj();

	camera.x = protagonist.x - 300;
	camera.y = protagonist.y - 200;
  wallssorted.sort();
 }
 t=setTimeout(function(){enterFrame()},12);
}
