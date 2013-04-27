function aiLoop(){
  protagonist.seek(xmouse + camera.x, ymouse + camera.y);
  for(i in enemies) computeAI(enemies[i]);
}
function computeAI(creep){
  switch(creep.t){
	case 3:
	creep.seek(protagonist.x,protagonist.y);
	break;
  }
}
