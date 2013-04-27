/**********************
This contains generic math algos required by the game.
Pl0xz0rz
*/

/**********
Vector2, copypasta'd from my old C++ school project
*/

function vektor2d(x,y){
	this.x = new Number;
	this.y = new Number;
   this.x=x;
   this.y=y;
   
   this.velkostnadruhu=velkostnadruhu;
   function velkostnadruhu(){
	return this.x*this.x + this.y*this.y;
   }
   
   this.pridat=pridat;
   function pridat(h) {
		this.x += h.x;
		this.y += h.y;
   }
   
   this.otoc=otoc;
   function otoc(bx,by) {
		var pom;
		pom = this.x;
		this.x = this.x * bx - this.y * by;
		this.y = pom * by + this.y * bx;
	}
	
	this.ssucin=ssucin;
	function ssucin(bx,by) {
		return this.x * bx + this.y * by;
	}
	
	this.vsucin=vsucin;
	function vsucin(bx,by){
		return this.x * by - this.y * bx;
	}
	
	this.kinverzia = kinverzia;
	function kinverzia() {
		var pom;
		pom = this.x;
		this.x /= (this.x * this.x + this.y * this.y);
		this.y /= (pom * pom + this.y * this.y);
	}
	
	this.kolmyPriemet = kolmyPriemet;
	function kolmyPriemet(bx,by) {
	    var pom = this.x * 1;
		this.x = bx * (this.x * bx + this.y * by) / (bx * bx + by * by) ;
		this.y = by * (pom * bx + this.y * by) / (bx * bx + by * by);
	}
}
//this belongs to Vector2 too
function vyrovnane(x,y,a){
	var o;
	var pa;
	o = false;
	if (a < 0) {
		o = true;
		a *= -1;
	}
	pa = a/Math.sqrt(x * x + y * y);
	var c = new vektor2d(x*pa,y*pa);
	if (o) {
		c.x *= -1;
		c.y *= -1;
	}
	return c;		
		
	
}

/*******************
My implementation of A* search
*/
function PathNode(graphIndex,parentIndex,fcost,gcost){
	this.graphIndex = graphIndex;
	this.parentIndex = parentIndex;
	this.fcost = fcost;
	this.gcost = gcost;
	
	this.get = get;
	function get(item){
		switch (item){
			case 0:
			return this.fcost;
			break;
			case 1:
			return this.graphIndex;
			break;
			default:
			throw "Waypoint access error";
			break;
		}
	}
}

function xisequal(checkedx,checkedArray){
	if ((checkedArray[0] != null) && (checkedArray[0].graphIndex === checkedx)) return true;
	for(var i=1;i<checkedArray.length;i++){
		if(checkedArray[i].graphIndex === checkedx) return true;
	}
	return false;
}

function searchGrid2(width,height,startNodeID,hcost,cost,tl){//int;int;int;function(int);function(int,int);int)
	//var openSet = new Heap(0);
	var timeLimit = tl;
	//openSet.a[1] = new PathNode(startNodeID,-1,heuristic(startNodeID,width),0);
	//var closedSet = new IndexedArray(width * height,1);
	
	var tree = new PathNodeSet(width * height);
	tree.push(startNodeID,-1,hcost(startNodeID,width),0);
	
	var foundAnswer = -1;
	var lastNode;
	var lastGcost;
	var correctPath = new Array();
	
	var addedNode;
	var addedFcost;
	var addedGcost;
	
	while((timeLimit > 0) && (foundAnswer === -1) && (tree.heapLength > 0)){
	
		lastNode = tree.pop();
		lastGcost = tree.gcosts[lastNode];
//		closedSet.add(lastNode);
		
		if((lastNode > width) && (tree.heapIndex[lastNode - width] === -1)){
			addedNode = lastNode - width;
			addedGcost = cost(lastNode,addedNode,width);
			addedGcost += lastGcost;
			addedFcost = addedGcost + hcost(addedNode,width); 
			tree.push(addedNode,lastNode,addedFcost,addedGcost);
		}
		if((lastNode % width > 0) && (tree.heapIndex[lastNode - 1] === -1)){
			addedNode = lastNode - 1;
			addedGcost = cost(lastNode,addedNode,width);
			addedGcost += lastGcost;
			addedFcost = addedGcost + hcost(addedNode,width); 
			tree.push(addedNode,lastNode,addedFcost,addedGcost);
		}
		if((lastNode % width < width - 1) && (tree.heapIndex[lastNode + 1] === -1)){
			addedNode = lastNode + 1;
			addedGcost = cost(lastNode,addedNode,width);
			addedGcost += lastGcost;
			addedFcost = addedGcost + hcost(addedNode,width); 
			tree.push(addedNode,lastNode,addedFcost,addedGcost);
		}
		if((lastNode + width < width * height) && (tree.heapIndex[lastNode + width] === -1)){
			addedNode = lastNode + width;
			addedGcost = cost(lastNode,addedNode,width);
			addedGcost += lastGcost;
			addedFcost = addedGcost + hcost(addedNode,width); 
			tree.push(addedNode,lastNode,addedFcost,addedGcost);
		}		
		
		if(hcost(lastNode,width) === 0) foundAnswer = 1;
		
		timeLimit --;
	}
	
	while(lastNode > -1) {
		correctPath.push(lastNode);
		lastNode = tree.parents[lastNode];
	}
	
	//console.log(correctPath);
	
	return correctPath;
}

/***********
Collision detection
*/
//AABB
function aabb(x1,y1,xs1,ys1,x2,y2,xs2,ys2){
	return ((((x1 >= x2) && (x1 <= x2 + xs2)) ||  ((x1 <= x2) && (x1 + xs1 >= x2))) && (((y1 >= y2) && (y1 <= y2 + ys2)) ||  ((y1 <= y2) && (y1 + ys1 >= y2))));
}

//raycasting
function useckaUsecka(x1,y1,x2,y2,xv,yv,xl,yl){
	    var hcgd;
		var decf;
		var ehfg;
		var r;
		var s;
		hcgd = yl * xv - xl * yv;
		decf = yv * (x2 - x1) - xv * (y2 - y1);
		ehfg = (x2 - x1) * yl - (y2 - y1) * xl;
		r = decf / hcgd;
		s = ehfg / hcgd;
		if ( r < 0 || r > 1 || s < 0 || s > 1) { return -1; }
		else { return s; };
}

//type aabb

function AxisAlignedBoundingBox(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	
	this.contains = contains;
	function contains(item){
		return ((this.x <= item.x) && (this.y <= item.y) && (this.x + this.width >= item.x + item.width) && (this.y + this.height >= item.y + item.height));
	}
	
}

/********************
An indexed array.
***/
function IndexedArray(length,getCall){
	this.array=new Array(length);
	for (var i=0;i<length;i++) this.array[i] = null;
	
	this.g = getCall;
	
	this.membership = membership;
	function membership(item){
		return (this.array[item.get(this.g)] !== null);
	}
	
	this.hasValue = hasValue;
	function hasValue(value){
		return (this.array[value] !== null);
	}
	
	this.add = add;
	function add(item){
		if (item !== undefined) {
			this.array[item.get(this.g)] = item;
		}
	}
	
	this.remove = remove;
	function remove(item){
		this.array[item.get(this.g)] = null;
	}
}
/***********
Other stuff
**********/
function screenToAIGrid(x,y,width){
	var nx = Math.floor((x - cameraMinX) / (xscale * 4));
	var ny = Math.floor((y - cameraMinY) / (yscale * 4));
	return width * ny + nx;
}
