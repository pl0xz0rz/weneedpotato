function narrowPhase(from,to,type){
	switch(type){
		case 0:
			if (from.x + from.width <= to.x){
				if (from.y + from.height <= to.y){
					if (useckaUsecka(from.x,from.y + from.height,to.x,to.y,from.vx + from.ax / 2,from.svy + from.say / 2,to.width,0) || 
					   useckaUsecka(to.x,to.y,from.x,from.y + from.height,-from.vx - from.ax / 2,-from.svy - from.say / 2,from.width,0)){ //From top
						from.vx *= .5;
						from.vax *= .5;
						from.svx *= .5;
						from.sax *= .5;
						from.say *= -.1;
						from.svy *= -.1;
						return true;
					} else if(useckaUsecka(from.x + from.width,from.y,to.x,to.y,from.svx + from.sax / 2,from.vy + from.ay / 2,0,to.height) ||
							 useckaUsecka(to.x,to.y,from.x + from.width,from.y,-from.svx - from.sax / 2,-from.vy - from.ay / 2,0,from.height)){ //From left
						from.vy *= .5;
						from.ay *= .5;
						from.svy *= .5;
						from.sax *= -.1;
						from.svx *= -.1;
						return true;
					} else return false;
				} else if (from.y >= to.y + to.height){
					if (useckaUsecka(from.x,from.y,to.x,to.y + to.height,from.svx + from.sax / 2,from.vy + from.ay / 2,to.width,0) ||
					   useckaUsecka(to.x,to.y + to.height,from.x,from.y,-from.vx - from.ax / 2,-from.vy - from.ay / 2,from.height,0)){  //From bottom
						from.vx *= .5;
						from.svx *= .5;
						from.ay *= -.1;
						from.vy *= -.1;
						return true;
					} else if(useckaUsecka(from.x + from.width,from.y,to.x,to.y,from.svx + from.sax / 2,from.vy + from.ay / 2,0,to.height) ||
							 useckaUsecka(to.x,to.y,from.x + from.width,from.y,-from.svx - from.sax / 2,-from.vy - from.ay / 2,0,from.height)){ //From left
						from.vy *= .5;
						from.svy *= .5;
						from.sax *= -.1;
						from.svx *= -.1;
						return true;
					} else return false;				
				} else {
					if(useckaUsecka(from.x + from.width,from.y,to.x,to.y,from.svx + from.sax / 2,from.vy + from.ay / 2,0,to.height) ||
					  useckaUsecka(to.x,to.y,from.x + from.width,from.y,-from.svx - from.sax / 2,-from.vy - from.ay / 2,0,from.height)){ //From left
						from.vy *= .5;
						from.ay *= .5;
						from.svy *= .5;
						from.sax *= -.1;
						from.svx *= -.1;
						return true;
					} else return false;	
				}
			} else if (from.x >= to.x + to.width){
				if (from.y + from.height <= to.y){
					if (useckaUsecka(from.x,from.y + from.height,to.x,to.y,from.svx + from.sax / 2,from.svy + from.say / 2,to.width,0) || 
					   useckaUsecka(to.x,to.y,from.x,from.y + from.height,-from.svx - from.sax / 2,-from.svy - from.say / 2,from.width,0)){ //From top
						from.vx *= .5;
						from.svx *= .5;
						from.say *= -.1;
						from.svy *= -.1;
						return true;
					} else if(useckaUsecka(from.x,from.y,to.x + to.width,to.y,from.vx + from.ax / 2,from.vy + from.ay / 2,0,to.height) || 
							 useckaUsecka(to.x + to.width,to.y,from.x,from.y,-from.vx - from.ax / 2,-from.vy - from.ay / 2,0,from.height)){ //From right
						from.vy *= .5;
						from.svy *= .5;
						from.ax *= -.1;
						from.vx *= -.1;
						return true;
					} else return false;
				} else if (from.y >= to.y + to.height){
					if (useckaUsecka(from.x + from.width,from.y,to.x,to.y + to.height,from.svx + from.sax / 2,from.vy + from.ay / 2,to.width,0) ||
					   useckaUsecka(from.x,from.y,to.x,to.y + to.height,from.vx + from.ax / 2,from.vy + from.ay / 2,to.width,0)){ //Bottom
						from.vx *= .5;
						from.svx *= .5;
						from.ay *= -.1;
						from.vy *= -.1;
						return true;
					} else if(useckaUsecka(from.x,from.y,to.x + to.width,to.y,from.vx + from.ax / 2,from.vy + from.ay / 2,0,to.height) || 
							 useckaUsecka(to.x + to.width,to.y,from.x,from.y,-from.vx - from.ax / 2,-from.vy - from.ay / 2,0,from.height)){  //Right
						from.vy *= .5;
						from.svy *= .5;
						from.ax *= -.1;
						from.vx *= -.1;
						return true;
					} else return false;				
				} else {
					if(useckaUsecka(from.x,from.y,to.x + to.width,to.y,from.vx + from.ax / 2,from.vy + from.ay / 2,0,to.height) || 
							 useckaUsecka(to.x + to.width,to.y,from.x,from.y,-from.vx - from.ax / 2,-from.vy - from.ay / 2,0,from.height)){ //Right
						from.vy *= .5;
						from.svy *= .5;
						from.ax *= -.1;
						from.vx *= -.1;
						return true;
					} else return false;	
				}
			} else {
				if ( from.y + from.height <= to.y){
					if (useckaUsecka(from.x,from.y + from.height,to.x,to.y,from.vx + from.ax / 2,from.svy + from.say / 2,to.width,0) ||
					   useckaUsecka(to.x,to.y,from.x,from.y + from.height,-from.vx - from.ax / 2,-from.svy - from.say / 2,from.width,0)){ //Top
						from.vx *= .5;
						from.ax *= .5;
						from.svx *= .5;
						from.sax *= .5;
						from.say *= -.1;
						from.svy *= -.1;
						boef = true;
						return true;
					} else return false;
				} else if (from.y >= to.y + to.height){
					if (useckaUsecka(from.x,from.y,to.x,to.y + to.height,from.vx + from.ax / 2,from.vy + from.ay / 2,to.width,0) ||
					   useckaUsecka(to.x,to.y + to.height,from.x,from.y,-from.vx - from.ax / 2,-from.vy - from.ay / 2,from.width,0)){ //Bottom
						from.vx *= .5;
						from.ax *= .5;
						from.svx *= .5;
						from.sax *= .5;
						from.ay *= -.1;
						from.vy *= -.1;
						return true;
					}
				} else {/*console.log("inside");
					console.log(from.height);
					console.log(from.y);
					console.log(to.y);
					throw "wtf";*/
					return true;
				}
			}
		break;
	}
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
		if ((xv === 0) && (yv === 0)) return false;
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
		if ( r < 0 || r > 1 || s < 0 || s > 1) { return false; }
		else { return true; };
}

/**
A binary hash tree, for broad-phase collision detection and the post office problem.


*/
function BinaryHashTree(depth,height,condition){
	this.wantedHeight = height;
	this.height = height+1;
	
	this.smallSorted = true;
	this.bigSorted = true;    

	this.iBucket = 0;
	
	this.c = 0;
	
	this.width = 1;
	for (var l = depth;l>0;l--) this.width <<= 1;
	
	this.condition = condition;
	
	this.rows = new Array(height);
	for(l = 0;l<height+1;l++)	this.rows[l] = new Array(this.width+1);
	
	this.heights = new Array(this.width+1);
	for(l = 0;l<this.width+1;l++)	this.heights[l] = 0;
	
	this.push = push;
	function push(item){
		this.iBucket = 1;
		this.c = this.condition(item,this.iBucket,1);
		while ((this.c !==0) && ((this.iBucket << 1) < this.width)) {
			this.c = this.condition(item,this.iBucket,1);
			if ((this.c !== 0) ) {
				this.iBucket <<= 1;
				if (this.c === 1) {this.iBucket |= 1}
			}
		} 
		this.inbucketPush(item,this.iBucket);
	}
	
	this.inbucketPush = inbucketPush;
	function inbucketPush(item,bucket){
		this.smallSorted = false;
		this.iBucket = bucket;
		while (!this.smallSorted){
	/*		if (this.heights[bucket] < this.wantedHeight){ //If the stack doesn't overflow, simply push the item on the stack
				this.heights[bucket] ++;
				this.rows[this.heights[bucket]][bucket] = item;
				this.smallSorted = true;
			} else if(bucket << 1 <= this.width){ //Else, if the heap allows it, attempt to sink the stack.
				this.heights[bucket] ++;
				this.rows[this.heights[bucket]][bucket] = item;
				this.branch(bucket);
			} else */if(this.heights[bucket] < (this.height - 1)){ //Or this, a bigger collision in the hash function than expected. But the hashtable allows it.
				this.rows[this.heights[bucket]][bucket] = item;
				this.heights[bucket] ++;
				this.smallSorted = true;
			} else { //Create a new hashtable
				this.height ++;
				this.rows.push(new Array(this.width));
				this.rows[this.heights[bucket]][bucket] = item;
				this.heights[bucket] ++;
				this.smallSorted = true;
			}
		}	
	}
	
	this.bucketPop = bucketPop;
	function bucketPop(bucket){
		this.rows[this.heights[bucket]][bucket] = null;
		this.heights[bucket] --;
	}
	
	this.branch = branch;
	function branch(bucket){
		var hardheight = 0;
		var i = this.heights[bucket]-1;
		var c;
		while(i>hardheight){
			c = this.condition(this.rows[i][bucket],bucket,1);
			if (c <= -1) { //Sink left
				this.inbucketPush(this.rows[i][bucket],bucket << 1);
				this.bucketPop(bucket);
				i--;
			} else if (c >= 1){ //Sink right
				this.inbucketPush(this.rows[i][bucket],(bucket << 1) | 1);
				this.bucketPop(bucket);
				i--;
			} else { //Swap with stack bottom
				var temp = this.rows[i][bucket];
				this.rows[i][bucket] = this.rows[hardheight][bucket];
				this.rows[hardheight][bucket] = temp;
				hardheight ++;
			}
		}
		
	}
	
	this.getCollisions = getCollisions;
	function getCollisions(item){
		var bucket = 1;
		var high;
		var low;
		var i;
		var result = new Array();
		var c = this.condition(item,bucket,1);
		while((c !== 0) && (bucket << 2 < this.width)){
//			if(this.heights[bucket] > 0)
			for (i=0;i<this.heights[bucket];i++){
				result.push(this.rows[i][bucket]);
			}
			bucket <<= 1;
			if(c > 0) bucket ++;
			c = this.condition(item,bucket,1);
		}
		high = bucket;
		low = bucket;
		while(high < this.width){
			for(bucket = low; bucket <= high; bucket ++){
//				if(this.heights[bucket] > 0)
				for (i=0;i<this.heights[bucket];i++){
					result.push(this.rows[i][bucket]);
				}
			}
			high <<= 1;
			low <<= 1;
			high ++;
		}
		return result;
	}
	
	this.sort = sort; //Bubbles everything that is supposed to be bubbled, resinks everything, and then deletes empty hashtables. Should be O(N log N)
	function sort(){
		var bucket;
		var c;
		var i;
		var temp;
		var hardheight;
		
		for (bucket = this.width;bucket>1;bucket --){ //Bubbles everything that wants to be bubbled.
			hardheight = 0;
			i=this.heights[bucket]-1;
			while (i>hardheight){
				if(this.condition(this.rows[i][bucket],bucket,0) === 0){ //If it's zero, it means keep, else bubble 
					temp = this.rows[i][bucket];
					this.rows[i][bucket] = this.rows[hardheight][bucket];
					this.rows[hardheight][bucket] = temp;
					hardheight ++;
				} else if(this.heights[bucket >> 1] < this.height){ //If the hashtable allows bubbling
					this.rows[this.heights[bucket >> 1]][bucket >> 1] = this.rows[i][bucket];
					this.heights[bucket >> 1] ++;
					this.bucketPop(bucket);
					i--;
				} else { //Create a new hashtable
					this.height ++;
					this.rows.push(new Array(this.width));
					this.rows[this.heights[bucket >> 1]][bucket >> 1] = this.rows[i][bucket];
					this.heights[bucket >> 1] ++;
					this.bucketPop(bucket);
					i--;
				}
			}
		}
		
			hardheight = 0; //If it's at index 1, they instead get deleted on bubble
			i=this.heights[1]-1;
			while (i>hardheight){
				if(this.condition(this.rows[i][1],1,0) === 0){ //If it's zero, it means keep, else bubble 
					temp = this.rows[i][1];
					this.rows[i][1] = this.rows[hardheight][1];
					this.rows[hardheight][1] = temp;
					hardheight ++;
				} else { //Delete
					this.bucketPop(1);
					i--;
				}
			}
		
		
		
		//Resinks everything
		for (i=1;i<this.width >> 1;i++){
			this.branch(i);
		}
		//It doesn't delete empty hashtables yet.
	}
	
	this.empty = empty;
	function empty(){
		for (this.iBucket = 1; this.iBucket < this.width+1;this.iBucket ++){
			while(this.heights[this.iBucket]>=0)this.bucketPop(this.iBucket);
			this.heights[this.iBucket] = 0;
		}
	}
	
	
}

/************************
A quadtree. It's a condition for the above binary hash tree.

*/

function QuadTreeAABB(width,height,level,itemsInOneLevel){ //Takes axis-aligned boxes
	this.width = width;
	this.height = height;
	this.level = level;
	
	
	this.treeWidth = 1;
	for (var l = level;l>0;l--) this.treeWidth <<= 1;
	this.treeWidth ++;
	
	
	this.boundingBoxes = new Array(this.treeWidth);
	for(var i=0;i<=this.treeWidth;i++){
		this.boundingBoxes[i] = null;
	}
	
	this.bbOrientations = new Array(this.treeWidth);
	
	this.makeBoundingBoxes = makeBoundingBoxes;
	function makeBoundingBoxes(x,y,width,height){
		this.boundingBoxes[1] = new AxisAlignedBoundingBox(x,y,width,height);
		this.bbOrientations[1] = 0;
		for (var i=2;i<=this.treeWidth;i++){
			if (this.bbOrientations[i >> 1] === 0){
				if (i & 1) {
					this.boundingBoxes[i] = new AxisAlignedBoundingBox(this.boundingBoxes[i >> 1].x,this.boundingBoxes[i >> 1].y,this.boundingBoxes[i >> 1].width/2,this.boundingBoxes[i >> 1].height);
				} else {
					this.boundingBoxes[i] = new AxisAlignedBoundingBox(this.boundingBoxes[i >> 1].x+this.boundingBoxes[i >> 1].width/2,this.boundingBoxes[i >> 1].y,this.boundingBoxes[i >> 1].width/2,this.boundingBoxes[i >> 1].height);
				}
				this.bbOrientations[i] = 1;
			} else {
				if (i & 1) {
					this.boundingBoxes[i] = new AxisAlignedBoundingBox(this.boundingBoxes[i >> 1].x,this.boundingBoxes[i >> 1].y,this.boundingBoxes[i >> 1].width,this.boundingBoxes[i >> 1].height/2);
				} else {
					this.boundingBoxes[i] = new AxisAlignedBoundingBox(this.boundingBoxes[i >> 1].x,this.boundingBoxes[i >> 1].y+this.boundingBoxes[i >> 1].height/2,this.boundingBoxes[i >> 1].width,this.boundingBoxes[i >> 1].height/2);
				}
				this.bbOrientations[i] = 0;
			}
	//		console.log(this.boundingBoxes[i]);
		}
	}
	
	this.makeBoundingBoxes(0,0,width,height);
	
	this.condition = condition;
	function condition(item,bucket,direction){
		if (direction === 1){
			if (this.boundingBoxes[bucket << 1].contains(item)) {
				if (this.boundingBoxes[(bucket << 1) | 1].contains(item)) {
					return 0;
				}
				return -1;
			} else if(this.boundingBoxes[(bucket << 1) | 1].contains(item)) {
				return 1;
			}
			return 0;
		} else {
			if (this.boundingBoxes[bucket].contains(item) || item.width < -555) {return 0} else {return 1}
		
		}
	}
	
	
	this.tree = new BinaryHashTree(level,itemsInOneLevel,condition);
	
	this.tree.boundingBoxes = this.boundingBoxes;
//	this.tree.condition = function(item,bucket,direction){return this.condition(item,bucket,direction)};
	
	this.transform = transform;
	function transform(sx,sy){
		for (var i=1;i<this.tree.boundingBoxes.length;i++){
			this.tree.boundingBoxes[i].x *= sx;
			this.tree.boundingBoxes[i].y *= sy;
			this.tree.boundingBoxes[i].width *= sx;
			this.tree.boundingBoxes[i].height *= sy;
		}
	}
	
	this.push = push;
	function push(item){
		this.tree.push(item);
	}
	
}

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

/**************************************
2D BST - for prune and sweep collsion detection
*************************/
function BST2(length){
        var l = 1;
	while (length > (l <<= 1));
	this.buffer = new Array(l);
	this.xtemp = new Array(l);
	this.ytemp = new Array(l);
	this.l = 0;

	this.sort = sort;
	function sort(){
		this.xtemp.sort(function(a,b){return a.x - b.x});
		this.ytemp.sort(function(a,b){return a.y - b.y});
		//TODO: Perform reverse quicksort
	}

	this.push = push;
	function push(item){
		this.xtemp[this.l] = item;
		this.ytemp[this.l] = item;
		this.l++; 
	}

	this.hittestAABB = hittestAABB;
	function hittestAABB(box,selectarray){
		var aoc = 0;
		var hi,lo,t;
		hi = this.l-1;
		lo = 0;
		t = hi >> 1;
		var lx = box.x - 111;
		var hx = lx + box.width + 222;
//		console.log((this.xtemp[t].x > hx) || (this.xtemp[t].x < lx));
		while((hi>=lo) && ((this.xtemp[t].x > hx) || (this.xtemp[t].x < lx))) {
			if (this.xtemp[t].x < lx) {lo = t+1;}
			else hi = t-1;
			t = (hi+lo)>> 1;
		}
		if (hi < lo) return 0;
		selectarray[0] = this.xtemp[t];
		++aoc;
		hi = t+1;
		lo = t-1;
//		console.log(hi);
//		console.log(lo);
		while ((hi < this.l) && (this.xtemp[hi].x <= hx)){
			selectarray[aoc] = (this.xtemp[hi]);
			++hi;
			++aoc;		
		} 
		while((lo >= 0) && (this.xtemp[lo].x >= lx)){
			selectarray[aoc] = (this.xtemp[lo]);
			--lo;
			++aoc;
		}
		return aoc;
		//TODO: Optimize
	}
}

function bih2d(length){
        var l = 1;
	while (length > (l <<= 1));
	this.buffer = new Array(l);
	this.length = l;	

}

function aabbcorner(x,y,bb){
	this.x = x;
	this.y = y;
	this.box = bb;
}
