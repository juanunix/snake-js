var velocidad = 20;
var tamano = 10;

class Objeto {
	constructor(){
		this.tamano = tamano;
	}
	shock(obj){
		var difx = Math.abs(this.x - obj.x);
		var dify = Math.abs(this.y - obj.y);
		if (difx >= 0 && difx < tamano && dify >= 0 && dify < tamano){
			return true;
		} else {
			return false;
		}
	}
}

class Head extends Objeto {
	constructor(x, y){
		super();
		this.x = x;
		this.y = y;
		this.long = null;
	}
	dibu(context){
		if (this.long != null){
			this.long.dibu(context);
		}
		context.fillStyle = '#0000FF';
		context.fillRect(this.x, this.y, this.tamano, this.tamano);
	}
	set_xy(x, y){
		if (this.long != null){
			this.long.set_xy(this.x, this.y);
		}
		this.x = x;
		this.y = y;
	}
	grow(){
		if(this.long == null){
			this.long = new Head(this.x, this.y);
		} else {
			this.long.grow();
		}
	}
	getgrow(){
		return this.long;
	}
}

class Comida extends Objeto {
	constructor(){
		super();
		this.x = this.generar();
		this.y = this.generar();
	}
	generar(){
		var num = (Math.floor(Math.random() * 59))*10;
		return num;
	}
	colocar(){
		this.x = this.generar();
		this.y = this.generar();
	}
	dibu(context){
		context.fillStyle = '#FF0000';
		context.fillRect(this.x, this.y, this.tamano, this.tamano);
	}
}

var head = new Head(20, 20);
var comida = new Comida();
var ejex = true;
var ejey = true;
var xdir = 0;
var ydir = 0;

function movimiento(){
	var nx = head.x+xdir;
	var ny = head.y+ydir;
	head.set_xy(nx, ny);
}

function endplay(){
	xdir = 0;
	ydir = 0;
	ejex = true;
	ejey = true;
	head = new Head(20, 20);
	comida = new Comida();
	alert('Bad! :(');
}

function shockbody(){
	var temp = null;
	try {
		temp = head.getGrow().getGrow();
	} catch (error){
		temp = null;
	}
	while (temp != null){
		if (head.shock(temp)){
			
			endplay();
		} else {
			temp = temp.getGrow();
		}
	} 
}
function shocklimit(){
	if(head.x < 0 || head.x > 590 || head.y < 0 || head.y > 590){
		endplay();
	}
}


function control(event){
	var cod = event.keyCode;
	if (ejex){
		if (cod == 38){
			ydir = -tamano;
			xdir = 0;
			ejex = false;
			ejey = true;
		}
		if (cod == 40){
			ydir = tamano;
			xdir = 0;
			ejex = false;
			ejey = true;
		}
	} 
	if (ejey){
		if (cod == 37){
			ydir = 0; 
			xdir = -tamano;
			ejey = false;
			ejex = true;
		}
		if (cod == 39){
			ydir = 0; 
			xdir = tamano;
			ejey = false;
			ejex = true;
		}
	}
}

function dibu(){
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	head.dibu(ctx);
	comida.dibu(ctx);
}


function main(){
	shockbody();
	shocklimit();
	dibu();
	movimiento();
	if(head.shock(comida)){
		comida.colocar();
		head.grow();
	}
}
setInterval("main()", velocidad);