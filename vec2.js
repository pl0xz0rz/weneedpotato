/**********
Vec2, copypasta'd from my old C++ school project
*/

function vec2(x,y){


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

