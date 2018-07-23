/*
Construir el motor de Juego.
Un motor de juego se contruye por:
* Renderización de las imágenes
* Animaciones de los elementos
* Rutinas para detección de colisiones
*/

// Variables globales
var velocidad = 20;
var tamano = 10;

class Objeto {
	constructor(){
		this.tamano = tamano;
	}
	// Las colisiones se evalúan entre las diferencias de x & y
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

/*clase cabeza que hereda de la clase objeto tiene su constructor con un super
llamando a su objeto padre e inicializando x y long en nullcontiene un metodo 
dibu que obtiene como parametro el contexto verifica si la variable es difrente 
de null y vuelve a realizar un llamado del metodo dibua traves de la recursividad 
tambien esta el metodo set_xy donde verifica nuevamenteque el onjeto long sea difrente 
de null si es asi el realiza el llamado del metodo dibu */

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
	crecer(){
		if(this.long == null){
			this.long = new Head(this.x, this.y);
		} else {
			this.long.crecer();
		}
	}
	getCrecer(){
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

//Objetos del juego
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

/*funcion que finaliza el juego realizando un seteo de las variables
y emitiendo un mensaje alert */
function endplay(){
	xdir = 0;
	ydir = 0;
	ejex = true;
	ejey = true;
	head = new Head(20, 20);
	comida = new Comida();
	alert('Bad! :(');
}

function choquecuerpo(){
	var temp = null;
	try {
		temp = head.getCrecer().getCrecer();
	} catch (error){
		temp = null;
	}
	while (temp != null){
		if (head.shock(temp)){
			//Fin Juego
			endplay();
		} else {
			temp = temp.getCrecer();
		}
	} 
}
/*Esto realiza la verificacion de los limites de la pantalla es decir 
valida que la cabeza no se salga de los bordes del area marcada*/
function choquelimit(){
	if(head.x < 0 || head.x > 590 || head.y < 0 || head.y > 590){
		endplay();
	}
}

/*Función de los controles
ESTA FUNCION CONTROLA LAS ENTRADAS DEL TECLADO ARRIBA ABAJO DERECHA IZQUIERDA
*/
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

/*Función para renderizar los gráficos en el objeto canvas*/
function dibu(){
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Aquí va el dibujo
	head.dibu(ctx);
	comida.dibu(ctx);
}

/*Función para animar funcion principal para llamar todos los objetos y metodos*/
function main(){
	choquecuerpo();
	choquelimit();
	dibu();
	movimiento();
	if(head.shock(comida)){
		comida.colocar();
		head.crecer();
	}
}
setInterval("main()", velocidad);