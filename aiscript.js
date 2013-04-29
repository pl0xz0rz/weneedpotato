function aiLoop(){
  protagonist.seek(xmouse + camera.x, ymouse + camera.y);
  for(i in enemies) computeAI(enemies[i]);
}
function computeAI(creep){
  if(creep.hp > 0){
  	switch(creep.t){
		case 3:
			if((creep.x - protagonist.x) * (creep.x - protagonist.x) + (creep.y - protagonist.y) * (creep.y - protagonist.y) < 50000) {creep.seek(protagonist.x,protagonist.y);creep.action	(protagonist.x,protagonist.y)};
		break;
		case 7:
			if((creep.x - protagonist.x) * (creep.x - protagonist.x) + (creep.y - protagonist.y) * (creep.y - protagonist.y) < 50000) {creep.action	(protagonist.x,protagonist.y)};
			if((creep.x - protagonist.x) * (creep.x - protagonist.x) + (creep.y - protagonist.y) * (creep.y - protagonist.y) < 10000)  {creep.avoid  (protagonist.x,protagonist.y)}
			else if((creep.x - protagonist.x) * (creep.x - protagonist.x) + (creep.y - protagonist.y) * (creep.y - protagonist.y) < 50000) {creep.seek(protagonist.x,protagonist.y)}
			else creep.standstill();
		break;
 	 }
  }
}
