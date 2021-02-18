var calculadora = {
	//definicion de propiedades
	valorPantalla: "0",
	primerValor: 0,
	segundoValor: 0,
	operacion: "",
	ultimoValor: 0,
	resultado: 0,
	booIgual: false,

	init: (function () {
		this.assignEventos();
		this.assignEventosTeclas(".tecla");
	}),

	assignEventosTeclas: function (selector) {
		var teclas = document.querySelectorAll(selector);
		for (var i = 0; i < teclas.length; i++) {
			teclas[i].onmousedown = this.eventReduceTecla;
			teclas[i].onmouseup = this.eventAgrandaTecla;
		};
	},

	eventReduceTecla: function (event) {
		calculadora.reduceTecla(event.target);
	},

	eventAgrandaTecla: function (event) {
		calculadora.agrandaTecla(event.target);
	},

	reduceTecla: function (elemento) {
		var teclaId = elemento.id;
		if (teclaId == "mas") {
			elemento.style.width = "88%";
			elemento.style.height = "98%";
		} else {
			var currentWidth = elemento.clientWidth;
			var currentHeight = elemento.clientHeight;
			elemento.style.width = (currentWidth - 2).toString() + "px";
			elemento.style.height = (currentHeight - 2).toString() + "px";
		}
	},

	agrandaTecla: function (elemento) {
		var teclaId = elemento.id;
		if (teclaId == "1" || teclaId == "2" || teclaId == "3" || teclaId == "0" || teclaId == "igual" || teclaId == "punto") {
			elemento.style.width = "29%";
			elemento.style.height = "62.91px";
		} else if (teclaId == "mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
			elemento.style.width = "22%";
			elemento.style.height = "62.91px";
		}
	},

	assignEventos: function () {
		document.getElementById("on").addEventListener("click", function () { calculadora.cleanVariables(); });
		document.getElementById("sign").addEventListener("click", function () { calculadora.changeSigno(); });
		document.getElementById("0").addEventListener("click", function () { calculadora.addDigito("0"); });
		document.getElementById("1").addEventListener("click", function () { calculadora.addDigito("1"); });
		document.getElementById("2").addEventListener("click", function () { calculadora.addDigito("2"); });
		document.getElementById("3").addEventListener("click", function () { calculadora.addDigito("3"); });
		document.getElementById("4").addEventListener("click", function () { calculadora.addDigito("4"); });
		document.getElementById("5").addEventListener("click", function () { calculadora.addDigito("5"); });
		document.getElementById("6").addEventListener("click", function () { calculadora.addDigito("6"); });
		document.getElementById("7").addEventListener("click", function () { calculadora.addDigito("7"); });
		document.getElementById("8").addEventListener("click", function () { calculadora.addDigito("8"); });
		document.getElementById("9").addEventListener("click", function () { calculadora.addDigito("9"); });
		document.getElementById("punto").addEventListener("click", function () { calculadora.addPuntoDecimal(); });
		document.getElementById("igual").addEventListener("click", function () { calculadora.getResultado(); });
		document.getElementById("dividido").addEventListener("click", function () { calculadora.setOperacion("/"); });
		document.getElementById("por").addEventListener("click", function () { calculadora.setOperacion("*"); });
		document.getElementById("menos").addEventListener("click", function () { calculadora.setOperacion("-"); });
		document.getElementById("mas").addEventListener("click", function () { calculadora.setOperacion("+"); });
	},

	changeSigno: function () {
		if (this.valorPantalla != "0") {
			var aux;
			if (this.valorPantalla.charAt(0) == "-") {
				aux = this.valorPantalla.slice(1);
			} else {
				aux = "-" + this.valorPantalla;
			}
			this.valorPantalla = aux;
			this.updatePantalla();
		}
	},

	addPuntoDecimal: function () {
		if (this.valorPantalla.indexOf(".") == -1) {
			if (this.valorPantalla == "") {
				this.valorPantalla = this.valorPantalla + "0.";
			} else {
				this.valorPantalla = this.valorPantalla + ".";
			}
			this.updatePantalla();
		}
	},

	addDigito: function (valor) {
		if (this.valorPantalla.length < 8) {

			if (this.valorPantalla == "0") {
				this.valorPantalla = "";
				this.valorPantalla = this.valorPantalla + valor;
			} else {
				this.valorPantalla = this.valorPantalla + valor;
			}
			this.updatePantalla();
		}
	},

	setOperacion: function (oper) {
		this.primerValor = parseFloat(this.valorPantalla);
		this.valorPantalla = "";
		this.operacion = oper;
		this.booIgual = false;
		this.updatePantalla();
	},

	evalOperacion: function (primerValor, segundoValor, operacion) {
		switch (operacion) {
			case "+":
				this.resultado = eval(primerValor + segundoValor);
				break;
			case "-":
				this.resultado = eval(primerValor - segundoValor);
				break;
			case "*":
				this.resultado = eval(primerValor * segundoValor);
				break;
			case "/":
				this.resultado = eval(primerValor / segundoValor);
		}
	},

	getResultado: function () {

		if (!this.booIgual) {
			this.segundoValor = parseFloat(this.valorPantalla);
			this.ultimoValor = this.segundoValor;
			this.evalOperacion(this.primerValor, this.segundoValor, this.operacion);

		} else {
			this.evalOperacion(this.primerValor, this.ultimoValor, this.operacion);
		}

		this.primerValor = this.resultado;
		this.valorPantalla = "";

		if (this.resultado.toString().length < 9) {
			this.valorPantalla = this.resultado.toString();
		} else {
			this.valorPantalla = this.resultado.toString().slice(0, 8) + "...";
		}

		this.booIgual = true;
		this.updatePantalla();
	},

	cleanVariables: function () {
		this.valorPantalla = "0";
		this.operacion = "";
		this.primerValor = 0;
		this.segundoValor = 0;
		this.resultado = 0;
		this.booIgual = false;
		this.ultimoValor = 0;
		this.updatePantalla();
	},

	updatePantalla: function () {
		var pantalla = document.getElementById("display");
		pantalla.innerHTML = this.valorPantalla;
	}

};

calculadora.init();