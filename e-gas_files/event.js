
var contId = 1;

var campoBairro = null;
var campoCidade = null;
var campoEnd = null;
var campoUf = null;
var campoRua = null;


var campoBairro2 = null;
var campoCidade2 = null;
var campoEnd2 = null;
var campoUf2 = null;
var campoRua2 = null;

var campoBairro3 = null;
var campoCidade3 = null;
var campoEnd3 = null;
var campoUf3 = null;
var campoRua3 = null;


var campoBairro4 = null;
var campoCidade4 = null;
var campoEnd4 = null;
var campoUf4 = null;
var campoRua4 = null;

String.prototype.startsWith = function(suffix) {
    return this.substring(0,suffix.length)==suffix;
};


String.prototype.endsWith = function (suffix) {
	try{
		 return this.match(suffix+"$")==suffix;
	}catch(err){
		return false;
	}
}


function tiraBranco(obj){
	return obj.value.replaceAll(" ","");
}

function validaImagem(obj) {
	if(obj.value == "")
		return true;
	if(!/(\.bmp|\.gif|\.jpg|\.jpeg)$/i.test(obj.value)) {
		alert("S� arquivos nos formatos jpg jpeg gif e bmp podem ser utilizados");
		obj.value = "";
		 setTimeout("refocus('" + obj.id + "')", 200);
		return false;
	}
	return true;
}




function validaJPG(obj) {
	alert(obj.value);
	if(obj.value == "")
		return true;
	if(!/(\.jpg|\.jpeg)$/i.test(obj.value)) {
		alert("S� arquivos nos formatos jpg jpeg gif e bmp podem ser utilizados");
		obj.value = "";
		 setTimeout("refocus('" + obj.id + "')", 200);
		return false;
	}
	return true;
}

function validaData(obj){
	
	if(obj.value == "")
		return true;
	var arr = obj.value.split("/");
	if(arr.length != 3){
		alert("Este campo deve ser informado utilizando-se do formato dd/mm/aaaa");
		obj.value = "";
		 setTimeout("refocus('" + obj.id + "')", 200);
		return false;
	}
	var dia = arr[0] - 0;
	var mes = arr[1] - 1;
	var ano = arr[2] - 0;
	

	
	var data = new Date(ano,mes,dia);
	
	if((dia != data.getDate()) || (mes != data.getMonth()) || (ano != data.getFullYear()))
	{
		alert("Este campo deve ser informado utilizando-se do formato dd/mm/aaaa");
		obj.value = "";
		 setTimeout("refocus('" + obj.id + "')", 200);
		return false;
	}
}

function validaDataGrid(valor){
	
	if(valor == "")
		return true;
	var arr = valor.split("/");
	if(arr.length != 3){
		return false;
	}
	try{
	var dia = arr[0] - 0;
	var mes = arr[1] - 1;
	var ano = arr[2] - 0;
	

	
	var data = new Date(ano,mes,dia);
	
	if((dia != data.getDate()) || (mes != data.getMonth()) || (ano != data.getFullYear()))
	{
		alert("Este campo deve ser informado utilizandos-se do formato dd/mm/aaaa ");
		return false;
	}
	return true;
	}catch(err){
		return false;
	}
}

function refocus(objId){
	obj = document.getElementById(objId);
	obj.focus();
}


function validaCPF(obj) {
	var CPF = obj.value; // Recebe o valor digitado no campo
	
	if(CPF == "___.___.___-__")
		return true;

	CPF = CPF.replace(" ","");
	CPF = CPF.replace(".","");
	CPF = CPF.replace(".","");
	CPF = CPF.replace(".","");
	CPF = CPF.replace("-","");
// Verifica se o campo � nulo

	if (CPF == '') {
	  return true;
   }

	// Aqui come�a a checagem do CPF
	var POSICAO, I, SOMA, DV, DV_INFORMADO;
	var DIGITO = new Array(10);
	DV_INFORMADO = CPF.substr(9, 2); // Retira os dois �ltimos d�gitos do n�mero informado
	
	// Desemembra o n�mero do CPF na array DIGITO
	for (I=0; I<=8; I++) {
	  DIGITO[I] = CPF.substr( I, 1);
	}
	
	// Calcula o valor do 10 d�gito da verific�o
	POSICAO = 10;
	SOMA = 0;
	   for (I=0; I<=8; I++) {
		  SOMA = SOMA + DIGITO[I] * POSICAO;
		  POSICAO = POSICAO - 1;
	   }
	DIGITO[9] = SOMA % 11;
	   if (DIGITO[9] < 2) {
			DIGITO[9] = 0;
	}
	   else{
		   DIGITO[9] = 11 - DIGITO[9];
	}
	
	// Calcula o valor do 11? d�gito da verific�o
	POSICAO = 11;
	SOMA = 0;
	   for (I=0; I<=9; I++) {
		  SOMA = SOMA + DIGITO[I] * POSICAO;
		  POSICAO = POSICAO - 1;
	   }
	DIGITO[10] = SOMA % 11;
	   if (DIGITO[10] < 2) {
			DIGITO[10] = 0;
	   }
	   else {
			DIGITO[10] = 11 - DIGITO[10];
	   }
	
	// Verifica se os valores dos d�gitos verificadores conferem
	DV = DIGITO[9] * 10 + DIGITO[10];
	   if (DV != DV_INFORMADO) {
			alert("CPF inv�lido");
			obj.value = ""; 
			setTimeout("refocus('" + obj.id + "')", 200);
			return false;
	   } 
}

function validaCPFGrid(valor) {
	var CPF = valor; // Recebe o valor digitado no campo

	CPF = CPF.replace(" ","");
	CPF = CPF.replace(".","");
	CPF = CPF.replace(".","");
	CPF = CPF.replace(".","");
	CPF = CPF.replace("-","");
// Verifica se o campo � nulo

	if (CPF == '') {
	  return true;
   }

	// Aqui come�a a checagem do CPF
	var POSICAO, I, SOMA, DV, DV_INFORMADO;
	var DIGITO = new Array(10);
	DV_INFORMADO = CPF.substr(9, 2); // Retira os dois �ltimos d�gitos do n�mero informado
	
	// Desemembra o n�mero do CPF na array DIGITO
	for (I=0; I<=8; I++) {
	  DIGITO[I] = CPF.substr( I, 1);
	}
	
	// Calcula o valor do 10? d�gito da verific�o
	POSICAO = 10;
	SOMA = 0;
	   for (I=0; I<=8; I++) {
		  SOMA = SOMA + DIGITO[I] * POSICAO;
		  POSICAO = POSICAO - 1;
	   }
	DIGITO[9] = SOMA % 11;
	   if (DIGITO[9] < 2) {
			DIGITO[9] = 0;
	}
	   else{
		   DIGITO[9] = 11 - DIGITO[9];
	}
	
	// Calcula o valor do 11? d�gito da verific�o
	POSICAO = 11;
	SOMA = 0;
	   for (I=0; I<=9; I++) {
		  SOMA = SOMA + DIGITO[I] * POSICAO;
		  POSICAO = POSICAO - 1;
	   }
	DIGITO[10] = SOMA % 11;
	   if (DIGITO[10] < 2) {
			DIGITO[10] = 0;
	   }
	   else {
			DIGITO[10] = 11 - DIGITO[10];
	   }
	
	// Verifica se os valores dos d�gitos verificadores conferem
	DV = DIGITO[9] * 10 + DIGITO[10];
	   if (DV != DV_INFORMADO) {
			return false;
	   } 
	   return true;
}

function validaCGCGrid(valor){
	 s = valor;
	 s = s.replace(".","");
 	 s = s.replace(".","");
 	 s = s.replace(".","");
	 s = s.replace("/","");	 
	 s = s.replace("-","");	 

	 if (s == "") {
		  return true;
	 }
	 var i;
	 var c = s.substr(0,12);
	 var dv = s.substr(12,2);
	 var d1 = 0;
	 for (i = 0; i <12; i++){
	  d1 += c.charAt(11-i)*(2+(i % 8));
	 }
	 if (d1 == 0){
		alert("CNPJ inv�lido");
		obj.value = "";
		setTimeout("refocus('" + obj.id + "')", 200);
		return false;
	 }
	 d1 = 11 - (d1 % 11);
	 if (d1 > 9) d1 = 0;
	 if (dv.charAt(0) != d1){
		alert("CNPJ inv�lido");
		obj.value = "";
		setTimeout("refocus('" + obj.id + "')", 200);
		return false;
	 }
	 d1 *= 2;
	 for (i = 0; i < 12; i++){
	  	d1 += c.charAt(11-i)*(2+((i+1) % 8));
	 }
	 d1 = 11 - (d1 % 11);
	 if (d1 > 9)
	  	d1 = 0;
	 if (dv.charAt(1) != d1){
		alert("CNPJ inv�lido");
		obj.value = "";
		setTimeout("refocus('" + obj.id + "')", 200);
		return false;
	 }
	 return true;
}


function validaCGC(obj){
	 s = obj.value;
	 s = s.replace(".","");
 	 s = s.replace(".","");
 	 s = s.replace(".","");
	 s = s.replace("/","");	 
	 s = s.replace("-","");	 

	 if (s == "") {
		  return true;
	 }
	 var i;
	 var c = s.substr(0,12);
	 var dv = s.substr(12,2);
	 var d1 = 0;
	 for (i = 0; i <12; i++){
	  d1 += c.charAt(11-i)*(2+(i % 8));
	 }
	 if (d1 == 0){
		alert("CNPJ inv�lido");
		obj.value = "";
		setTimeout("refocus('" + obj.id + "')", 200);
		return false;
	 }
	 d1 = 11 - (d1 % 11);
	 if (d1 > 9) d1 = 0;
	 if (dv.charAt(0) != d1){
		alert("CNPJ inv�lido");
		obj.value = "";
		setTimeout("refocus('" + obj.id + "')", 200);
		return false;
	 }
	 d1 *= 2;
	 for (i = 0; i < 12; i++){
	  	d1 += c.charAt(11-i)*(2+((i+1) % 8));
	 }
	 d1 = 11 - (d1 % 11);
	 if (d1 > 9)
	  	d1 = 0;
	 if (dv.charAt(1) != d1){
		alert("CNPJ inv�lido");
		obj.value = "";
		setTimeout("refocus('" + obj.id + "')", 200);
		return false;
	 }
	 return true;
}


/*
formatacao
*/
addEvent = function(o, e, f, s){
	var r = o[r = "_" + (e = "on" + e)] = o[r] || (o[e] ? [[o[e], o]] : []), a, c, d;
	r[r.length] = [f, s || o], o[e] = function(e){
		try{
			(e = e || event).preventDefault || (e.preventDefault = function(){e.returnValue = false;});
			e.stopPropagation || (e.stopPropagation = function(){e.cancelBubble = true;});
			e.target || (e.target = e.srcElement || null);
			e.key = (e.which + 1 || e.keyCode + 1) - 1 || 0;
		}catch(f){}
		for(d = 1, f = r.length; f; r[--f] && (a = r[f][0], o = r[f][1], a.call ? c = a.call(o, e) : (o._ = a, c = o._(e), o._ = null), d &= c !== false));
		return e = null, !!d;
    }
};

removeEvent = function(o, e, f, s){
	for(var i = (e = o["_on" + e] || []).length; i;)
		if(e[--i] && e[i][0] == f && (s || o) == e[i][1])
			return delete e[i];
	return false;
};


MaskInput = function(o, m){ //v1.0
	function mask(e){
		var patterns = {"1": /[A-Z]/i, "2": /[0-9]/, "4": /[?-?]/i, "8": /./ },
			rules = { "a": 3, "A": 7, "9": 2, "C":5, "c": 1, "*": 8};
		function accept(c, rule){
			for(var i = 1, r = rules[rule] || 0; i <= r; i<<=1)
				if(r & i && patterns[i].test(c))
					break;
				return i <= r || c == rule;
		}
		var k, mC, r, c = String.fromCharCode(k = e.key), l = o.value.length;
		(!k || k == 8 ? 1 : (r = /^(.)\^(.*)$/.exec(m)) && (r[0] = r[2].indexOf(c) + 1) + 1 ?
			r[1] == "O" ? r[0] : r[1] == "E" ? !r[0] : accept(c, r[1]) || r[0]
			: (l = (o.value += m.substr(l, (r = /[A|9|C|\*]/i.exec(m.substr(l))) ?
			r.index : l)).length) < m.length && accept(c, m.charAt(l))) || e.preventDefault();
	}
	for(var i in !/^(.)\^(.*)$/.test(m) && (o.maxLength = m.length), {keypress: 0, keyup: 1})
		addEvent(o, i, mask);
};

TamanhoLimitado = function(o, m){ //v1.0
	
	function mask(e){
		
		if(o.length > m.length){
			if(e.key == 8 || e.key == 46)
				return true;
			else{
				return false;
			}
		}
		return true;
		}
		
	for(var i in !/^(.)\^(.*)$/.test(m) && (o.maxLength = m.length), {keypress: 0, keyup: 1})
		addEvent(o, i, mask);
};



TamanhoLimitadoMaiusculo = function(o, m){ //v1.0
	
	function mask(e){
		o.value = o.value.toUpperCase();
		
		if(o.length > m.length){
			if(e.key == 8 || e.key == 46)
				return true;
			else{
				return false;
			}
		}
		return true;
		}
		
	for(var i in !/^(.)\^(.*)$/.test(m) && (o.maxLength = m.length), {keypress: 0, keyup: 1})
		addEvent(o, i, mask);
};


function formatCurrency(o, n, dig, dec){

   	o.c = !isNaN(n) ? Math.abs(n) : 2;
	    o.dec = typeof dec != "string" ? "," : dec, o.dig = typeof dig != "string" ? "." : dig;
    	addEvent(o, "keypress", function(e){
        	if((e.keyCode > 47 && e.keyCode < 58 )|| e.keyCode == 45|| e.keyCode == 43){
        		var temMenos = false;
        		if(e.keyCode == 45 || this.value.indexOf("-") != -1){
        			temMenos = true;
        			this.value = this.value.replace("-","");
        			}
        		if(e.keyCode == 43)
        			temMenos = false;

            	var o, s, l = (s = ((o = this).value.replace(/^0+/g, "") + String.fromCharCode(e.keyCode)).replace(/\D/g, "")).length, n;
	            if(o.maxLength + 1 && l >= o.maxLength) return false;
    	        l <= (n = o.c) && (s = new Array(n - l + 2).join("0") + s);


				var i = (l = (s = s.split("")).length) - n; 
				while((i -= 3) > 0)
					{ s[i - 1] += o.dig;}

            	n && n < l && (s[l - ++n] += o.dec);
			
	            o.value = s.join("");
	            if(temMenos)
	            	o.value = "-" + o.value;
    	    }
        	e.keyCode > 30 && e.preventDefault();
		}
	);
}

function formata(o,grid, coluna){

	if(o.inicializado == true){
	return;
}else{

	o.inicializado = true;
		o.inicializado = true;
		
		var tipo = o.className;//getAttribute("class");

		 
		if(o.id == ""){
			if(tipo.indexOf("mascara:") == 0)
				ttipo = "masc";
			else
				ttipo = tipo
			o.id = ttipo + (contId++); // garante que o objeto vai ter id, isto vai ser utilizado para retornar o foco na validacao
			
		}
			
		if(tipo == "moeda"){
			//$("#"+o.id).mask('000.000.000.000.000,00', {reverse: true});
			formatCurrency(o,2, ".", ",");
			$("#"+o.id).priceFormat({
				prefix: '',
			    centsSeparator: ',',
			    thousandsSeparator: '.'
			});
		}
		if(tipo == "valorMonetario"){
			//$("#"+o.id).mask('000.000.000.000.000,00', {reverse: true});
			formatCurrency(o,2, ".", ".");
			$("#"+o.id).priceFormat({
				prefix: '',
			    centsSeparator: ',',
			    thousandsSeparator: '.'
			});
		}
		if(tipo == "inteiro"){
			formatCurrency(o,0, ".", "");
			$("#"+o.id).priceFormat({
				prefix: '',
			    centsSeparator: ',',
			    thousandsSeparator: '.',
			    centsLimit: 0
			});
		}
		if(tipo == "inteiroSemPonto"){
			$("#"+o.id).mask('9?9999999999999999');
			//formatCurrency(o,0, "", "");
		}
		if(tipo == "cartaoSus"){
			$("#"+o.id).mask('999999999999999');
			//formatCurrency(o,0, "", "");
		}
		if(tipo == "telefone"){
			//MaskInput(o,"(99) 9999-9999");
			$("#"+o.id).mask("(99) 99999999?9");
		}
		
		if(tipo == "celular9"){
			//MaskInput(o,"(99) 9999-9999");
			$("#"+o.id).mask("(99) 999999999");
		}
		
		if(tipo == "celular"){
			$("#"+o.id).mask("(99) 99999-9999");
			//MaskInput(o,"(99) 99999-9999");
		}
		if(tipo == "placa"){
			//MaskInput(o,"ccc 9999");
			$("#"+o.id).mask("aaa 9999");	
		}
		if(tipo == "ddd"){
			//MaskInput(o,"99");
			$("#"+o.id).mask("99");	
		}
	
		if(tipo == "telefoneSemDdd"){
			//MaskInput(o,"9999-9999");
			$("#"+o.id).mask("9999-9999");	
		}
		if(tipo == "codigoUG"){
			//MaskInput(o,"999.9999");
			$("#"+o.id).mask("999.9999");			
		}
		
		if(tipo == "cep"){
//			MaskInput(o,"99999-999");
			$("#"+o.id).mask("99999-999");
			o.onblur = new Function("return saiCep(this)");
			o.onfocus = new Function("return entraCep(this)");
		}
		if(tipo == "elemento"){
			//MaskInput(o,"9.9.99.99");
			$("#"+o.id).mask("9.9.99.99");
		}
		
		if(tipo == "cep2"){
			$("#"+o.id).mask("99999-999");
			o.onblur = new Function("return saiCep2(this)");
			o.onfocus = new Function("return entraCep(this)");
		}
		
		if(tipo == "cep3"){
			$("#"+o.id).mask("99999-999");
			o.onblur = new Function("return saiCep3(this)");
			o.onfocus = new Function("return entraCep(this)");
		}
		
		if(tipo == "cep4"){
			$("#"+o.id).mask("99999-999");
			o.onblur = new Function("return saiCep4(this)");
			o.onfocus = new Function("return entraCep(this)");
		}
		if(tipo == "codigoGrupo"){
			$("#"+o.id).mask("99999999999-99999");
		}
		if(tipo == "ano"){
			//MaskInput(o,"9999");
			$("#"+o.id).mask("9999");
		}
		if(tipo == "cpf"){
			$("#"+o.id).mask("999.999.999-99");
			o.onblur = new Function("return validaCPF(this)");
		}
		if(tipo == "cgc"){
			$("#"+o.id).mask("99.999.999/9999-99");
			o.onblur = new Function("return validaCGC(this)");
		}
		if(tipo == "dataHora"){
			$("#"+o.id).mask("99/99/9999 99:99");
			o.onblur = new Function("tiraBranco(this);");
			
			myCalendar = new dhtmlXCalendarObject([o.id]);
			myCalendar.setDateFormat("%d/%m/%Y %H:%i");
		}
		if(tipo == "data"){
			$("#"+o.id).mask("99/99/9999");
			o.onblur = new Function("tiraBranco(this); return validaData(this)");
			
			myCalendar = new dhtmlXCalendarObject([o.id]);
			myCalendar.setDateFormat("%d/%m/%Y");

		}
		if(tipo == "dataGrid"){
			
			$("#"+o.id).mask("99/99/9999");
//			myCalendar = new dhtmlXCalendarObject([o.id],null,grid,coluna);
//			myCalendar.setDateFormat("%d/%m/%Y");

		}
		if(tipo == "imagem"){
			o.onblur = new Function("return validaImagem(this)");
		}
		if(tipo == "jpg"){
			o.onblur = new Function("return validaJPG(this)");
		}
		if(tipo.indexOf("tamanhoLimitado:") == 0){
			var marray = tipo.split(":");
			var quantidade = marray[1]-0;
			var palavra = "";
			for(x = 0;x<quantidade;x++)
				palavra = palavra + "C";
			TamanhoLimitado(o,palavra);
		}
		if(tipo.indexOf("mascara:") == 0){
			var marray = tipo.split(":");
			var mascara = marray[1];

			$("#"+o.id).mask(mascara);
			
		}
		if(tipo.indexOf("mascara2:") == 0){
			var marray = tipo.split(":");
			var mascara = marray[1];
			

//			$("#"+o.id).mask(mascara);

		}
		
		if(tipo.indexOf("tamanhoLimitadoMaiusculo") == 0){
			var marray = tipo.split(":");
			var quantidade = marray[1]-0;
			var palavra = "";
			for(x = 0;x<quantidade;x++)
				palavra = palavra + "C";
			TamanhoLimitadoMaiusculo(o,palavra);
		}
		
		if(tipo == "bairro"){
			campoBairro = o;
		}
		
		if(tipo == "rua"){
			campoRua = o;
		}
		if(tipo == "cidade"){
			campoCidade = o;
		}
		if(tipo == "end"){
			campoEnd = o;
		}
		if(tipo == "uf"){
			campoUf = o;
		}
		
		if(tipo == "bairro2"){
			campoBairro2 = o;
		}
		
		if(tipo == "rua2"){
			campoRua2 = o;
		}
		if(tipo == "cidade2"){
			campoCidade2 = o;
		}
		if(tipo == "end2"){
			campoEnd2 = o;
		}
		if(tipo == "uf2"){
			campoUf2 = o;
		}
		
		if(tipo == "bairro3"){
			campoBairro3 = o;
		}
		
		if(tipo == "rua3"){
			campoRua3 = o;
		}
		if(tipo == "cidade3"){
			campoCidade3 = o;
		}
		if(tipo == "end3"){
			campoEnd3 = o;
		}
		if(tipo == "uf3"){
			campoUf3 = o;
		}
		
		if(tipo == "bairro4"){
			campoBairro4 = o;
		}
		
		if(tipo == "rua4"){
			campoRua4 = o;
		}
		if(tipo == "cidade4"){
			campoCidade4 = o;
		}
		if(tipo == "end4"){
			campoEnd4 = o;
		}
		if(tipo == "uf4"){
			campoUf4cep = o;
		}
		
	if(tipo == "cor"){
			
			
			myCP1 = new dhtmlXColorPickerInput(o.id, grid, coluna);
		    myCP1.setImagePath(UrlNetdoc+"novogrid/imgs/");
		    myCP1.setColor(o.value);
		    myCP1.init();

		}
	
	if(tipo == "carteiraIdoso"){
		//MaskInput(o,"9999999.9999.9999999");
		$("#"+o.id).mask("9999999.9999.9999999");
	}
	
	if(tipo == "carteiraIdosoAutenticacao"){
		//MaskInput(o,"9999999.9999999.999999999999.99999");
		$("#"+o.id).mask("9999999.9999999.999999999999.99999");
	}
	
	if(tipo == "diaMes"){
		//MaskInput(o,"99/99");
		$("#"+o.id).mask("99/99");
	}
	
	if(tipo == "hora"){
		//MaskInput(o,"99:99");
		$("#"+o.id).mask("99:99");
	}
	if(tipo == "email"){
		o.onblur = new Function("return validacaoEmail(this)");
	}
		
	}
}

function inicializaGridFromSpan(obj){
	if(obj.className == "formDetail") 
		if(obj.getAttribute("criaGrid") != null){
			
			if(obj.id == ""){
				obj.id = obj.tipo + (contId++); // garante que o objeto vai ter id, isto vai ser utilizado para retornar o foco na validacao
				
			}
			
			criaGridInicio(obj);
	}
}


function inicializaForm(obj){
	
			
			var tipo = obj.className;//getAttribute("class");

			 
			if(obj.id == ""){
				obj.id = tipo + (contId++); // garante que o objeto vai ter id, isto vai ser utilizado para retornar o foco na validacao
				
			}
				
			if(tipo == "formConsulta"){
				var varGrid = obj.getAttribute("grid");
				var varValida = obj.getAttribute("valida");
				if(varGrid == null){
					alert("Faltou setar o atributo grid do formConsulta " + obj.id);
					return;
				}else{
					if(varValida != null)
						varValida = eval(varValida);
						
						var lObj =  new formConsulta(obj.id, varGrid,varValida);
					 
					 if(obj.getAttribute("cargaInicio") != null){
						 
						 
						 
						 lObj.submit2();
					 }
				}
			}
			
			if(tipo == "formDetail"){
				
				if(obj.id == null)
					obj.id = "formDetail" + (contId++);
				
				
				var varGrid = obj.getAttribute("grid");
				if(varGrid == null){
					alert("Faltou setar o atributo grid do formDetail " + obj.id);
					return;
				}else{
					
					
				
					
					var aGrids = varGrid.split("#");
					var aba = obj.getAttribute("aba");
					if(aba != null)
					{	
						aba = aba.split("#");
						if(aba != null)
							for(var ab = 0;ab<aba.length;ab++)
								aba[ab] = document.getElementById(aba[ab]);
					}
					for(var x =aGrids.length - 1;x>=0;x--){
						var mobj = eval(aGrids[x]);
						
						obj.formDetail = new formVV(obj.id,mobj);
						
						if(obj.getAttribute("endForm") != null){
							obj.formDetail.endForm(eval(obj.getAttribute("endForm")));
						}
						
					}
					
					if(obj.getAttribute("transacao") != null){
						obj.formDetail.formTransacao = new formGridVV(obj.id);
						
						
						var vretTransacao = null;
						if(obj.getAttribute("retornoTransacaoRaiz") != null){
							vretTransacao = [new RetornoTransacao(obj.getAttribute("retornoTransacaoRaiz"),obj.getAttribute("retornoTransacaoAtributo"))];					
						}
							
						obj.formDetail.formTransacao.configuraTransacao(obj.getAttribute("modulo"),obj.getAttribute("transacao"),false,vretTransacao);
					}
					
					for(var x =0;x<aGrids.length;x++){
						var mobj = eval(aGrids[x]);
						
						if(aba != null){
							obj.formDetail.abas(aba);
							for(var ab = 0;ab<aba.length;ab++)
								aba[ab].style.display = "none";
						}
						if(obj.getAttribute("exibe") == null)
						obj.style.display = "none";
					}
					
				}
			}
			
				
			

	
}

function inicializaSpanQt(obj){
	
			
			var tipo = obj.className;//getAttribute("class");

			 
			if(obj.id == ""){
				obj.id = tipo + (contId++); // garante que o objeto vai ter id, isto vai ser utilizado para retornar o foco na validacao
				
			}
				
			if(tipo == "quantidadeGrid"){
				var varGrid = obj.getAttribute("grid");
				if(varGrid == null){
					alert("Faltou setar o atributo grid do span quantidade " + obj.id);
					return;
				}else{
					var mygridEscopoDentro = eval(varGrid);
					mygridEscopoDentro.informaLabelQt(obj.id); 
				}
			}
			
			
	
}


function inicializaPopUp(obj){
	
	
	var tipo = obj.className;//getAttribute("class");
	
	if(obj.id == ""){
		obj.id = tipo + (contId++); // garante que o objeto vai ter id, isto vai ser utilizado para retornar o foco na validacao
		
	}
	
	if(tipo == "popup" && obj.getAttribute("popupInicializado") == null){
		var variavel = obj.getAttribute("variavel");
		var largura = obj.getAttribute("largura");
		var altura = obj.getAttribute("altura");
		var titulo = obj.getAttribute("titulo");
		
		var popSegmentoPesq = new Popup(obj.id,largura,altura); 
		popSegmentoPesq.setTitle(titulo); 
		popSegmentoPesq.init();
		window[variavel] = popSegmentoPesq;
		
		obj.setAttribute("popupInicializado",true);
		
	}
	

}

function startInputs(){
	
	(function(e){e.fn.priceFormat=function(t){var n={prefix:"US$ ",suffix:"",centsSeparator:".",thousandsSeparator:",",limit:false,centsLimit:2,clearPrefix:false,clearSufix:false,allowNegative:false,insertPlusSign:false,clearOnEmpty:false};var t=e.extend(n,t);return this.each(function(){function m(e){if(n.is("input"))n.val(e);else n.html(e)}function g(){if(n.is("input"))r=n.val();else r=n.html();return r}function y(e){var t="";for(var n=0;n<e.length;n++){char_=e.charAt(n);if(t.length==0&&char_==0)char_=false;if(char_&&char_.match(i)){if(f){if(t.length<f)t=t+char_}else{t=t+char_}}}return t}function b(e){while(e.length<l+1)e="0"+e;return e}function w(t,n){if(!n&&(t===""||t==w("0",true))&&v)return"";var r=b(y(t));var i="";var f=0;if(l==0){u="";c=""}var c=r.substr(r.length-l,l);var h=r.substr(0,r.length-l);r=l==0?h:h+u+c;if(a||e.trim(a)!=""){for(var m=h.length;m>0;m--){char_=h.substr(m-1,1);f++;if(f%3==0)char_=a+char_;i=char_+i}if(i.substr(0,1)==a)i=i.substring(1,i.length);r=l==0?i:i+u+c}if(p&&(h!=0||c!=0)){if(t.indexOf("-")!=-1&&t.indexOf("+")<t.indexOf("-")){r="-"+r}else{if(!d)r=""+r;else r="+"+r}}if(s)r=s+r;if(o)r=r+o;return r}function E(e){var t=e.keyCode?e.keyCode:e.which;var n=String.fromCharCode(t);var i=false;var s=r;var o=w(s+n);if(t>=48&&t<=57||t>=96&&t<=105)i=true;if(t==8)i=true;if(t==9)i=true;if(t==13)i=true;if(t==46)i=true;if(t==37)i=true;if(t==39)i=true;if(p&&(t==189||t==109||t==173))i=true;if(d&&(t==187||t==107||t==61))i=true;if(!i){e.preventDefault();e.stopPropagation();if(s!=o)m(o)}}function S(){var e=g();var t=w(e);if(e!=t)m(t);if(parseFloat(e)==0&&v)m("")}function x(){n.val(s+g())}function T(){n.val(g()+o)}function N(){if(e.trim(s)!=""&&c){var t=g().split(s);m(t[1])}}function C(){if(e.trim(o)!=""&&h){var t=g().split(o);m(t[0])}}var n=e(this);var r="";var i=/[0-9]/;if(n.is("input"))r=n.val();else r=n.html();var s=t.prefix;var o=t.suffix;var u=t.centsSeparator;var a=t.thousandsSeparator;var f=t.limit;var l=t.centsLimit;var c=t.clearPrefix;var h=t.clearSuffix;var p=t.allowNegative;var d=t.insertPlusSign;var v=t.clearOnEmpty;if(d)p=true;n.bind("keydown.price_format",E);n.bind("keyup.price_format",S);n.bind("focusout.price_format",S);if(c){n.bind("focusout.price_format",function(){N()});n.bind("focusin.price_format",function(){x()})}if(h){n.bind("focusout.price_format",function(){C()});n.bind("focusin.price_format",function(){T()})}if(g().length>0){S();N();C()}})};e.fn.unpriceFormat=function(){return e(this).unbind(".price_format")};e.fn.unmask=function(){var t;var n="";if(e(this).is("input"))t=e(this).val();else t=e(this).html();for(var r in t){if(!isNaN(t[r])||t[r]=="-")n+=t[r]}return n}})(jQuery)
	 
	 var arr = document.getElementsByTagName("input");
		var obj;
		
		
		
		for(z = 0;z<arr.length;z++){
			obj = arr[z];

			if((obj.type == "text" || obj.type == "file") && obj.className != "")
				formata(obj);
		}
		
		arr = document.getElementsByTagName("textarea");
		var obj;
		
		for(z = 0;z<arr.length;z++){
			obj = arr[z];
			formata(obj);
		}
		
		
		var arr = document.getElementsByTagName("span");
		var obj;
		for(z = 0;z<arr.length;z++){
			obj = arr[z];
			inicializaGridFromSpan(obj);
		}
		
		 var arr = document.getElementsByTagName("fieldset");
			var obj;
			for(z = 0;z<arr.length;z++){
				obj = arr[z];
				inicializaSpanQt(obj);
				inicializaForm(obj);
				organizaCampos(obj);
			}
			
			
		 var arr = document.getElementsByTagName("form");
			var obj;
			for(z = 0;z<arr.length;z++){
				obj = arr[z];
				inicializaForm(obj);
			}
			
			
			 
			
			 var arr = document.getElementsByTagName("span");
				var obj;
				for(z = 0;z<arr.length;z++){
					obj = arr[z];
					inicializaSpanQt(obj);
					inicializaForm(obj);
				}
				
				
}


function startInputsForm(forms){
	 
	 var arr = forms.elements;
		var obj;
		
		
		for(z = 0;z<arr.length;z++){
			obj = arr[z];

			if((obj.type == "text" || obj.type == "file") && obj.className != "")
				formata(obj);
		}
		
		arr = document.getElementsByTagName("textarea");
		var obj;
		
		for(z = 0;z<arr.length;z++){
			obj = arr[z];
			formata(obj);
		}
		
		

}
		
var startMentor = 0;

function start(){
	
	if(document.getElementById("caminhoPaoMentor") != null){
		var cpaoTitulo = document.title.replaceAll(" ","%20");
		
		if(cpaoTitulo == "" || cpaoTitulo == null)
			cpaoTitulo = "P�gina Atual";
		cpaoNivel = "10"
		var firstChar = cpaoTitulo.charAt(0);
		if( firstChar <='9' && firstChar >='0') {
		     cpaoNivel = firstChar;
		}

//		var cPao = bind("identificador=" +varIdCaminhoPao+ "&nivel="+cpaoNivel+"&titulo="+cpaoTitulo+"&url=" + (window.location.href.replaceAll('&',';meuE')),"/VVjs/navega.jsp","GET");//.replaceAll('&',';meuE')
//		document.getElementById("caminhoPaoMentor").innerHTML = cPao;
	

		$.post("/VVjs/navega.jsp", "identificador=" +varIdCaminhoPao+ "&nivel="+cpaoNivel+"&titulo="+cpaoTitulo+"&url=" + (window.location.href.replaceAll('&',';meuE')),function(data, status){
			document.getElementById("caminhoPaoMentor").innerHTML = data;
	    });

	
	}
	
	startInputs();
	
	if(typeof initialize != 'undefined')
		initialize();

local = "/"+location.pathname.split("/")[1] + "/";
spans = document.getElementsByTagName("td");

for(x = 0;x<spans.length;x++){
	obj = spans[x];
	if(obj.className == "botao"){
			palavra = "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style='cursor:pointer;'><tr>";
		palavra = palavra + "<td style=\"background:url("+local+"imgs/botao/lado_esq_laranja_apagado.jpg)\" width=\"11\" height=\"35\"></td>";
		palavra = palavra + "<td style=\"background:url("+local+"imgs/botao/apagado_laranja.jpg)\" ";
		palavra = palavra + " onmouseover=\"this.style.background = 'url("+local+"imgs/botao/aceso_laranja.jpg)'; "
		palavra = palavra + " this.parentNode.cells[0].style.background = 'url("+local+"imgs/botao/lado_esq_laranja_aceso.jpg)';"
		palavra = palavra + " this.parentNode.cells[2].style.background = 'url("+local+"imgs/botao/lado_dir_laranja_aceso.jpg)';\" ";
		palavra = palavra + "onmouseout=\"this.style.background = 'url("+local+"imgs/botao/apagado_laranja.jpg)'; "
		palavra = palavra + " this.parentNode.cells[0].style.background = 'url("+local+"imgs/botao/lado_esq_laranja_apagado.jpg)';"
		palavra = palavra + " this.parentNode.cells[2].style.background = 'url("+local+"imgs/botao/lado_dir_laranja_apagado.jpg)';\" > "+obj.innerHTML+" </td>";
		palavra = palavra + "<td style=\"background:url("+local+"imgs/botao/lado_dir_laranja_apagado.jpg)\" width=\"11\" height=\"35\"></td></tr></table>";
		obj.innerHTML = palavra;

	}
}

if(document.getElementById("altermenu") != null){
	window.status = "carregando menu";
	aMenuBar=new dhtmlXMenuBarObject(document.getElementById('altermenu'),'100%',0,"");
	aMenuBar.setGfxPath(local+"imgs/");

	aMenuBar.loadXML(local+"_menu.jsp?item="+(Math.random() * 1000000));
	aMenuBar.setBarAlign("right");
	
	aMenuBar.showBar();
	
	window.status = "menu carregado";
}
		
		
}

function startMobile(){
	
	startInputs();
	
	if(typeof initialize != 'undefined')
		initialize();

	local = "/"+location.pathname.split("/")[1] + "/";
	spans = document.getElementsByTagName("td");
		
}

function entraCep(obj){
	obj.setAttribute("valor",obj.value);
}

function saiCep(obj){
	   

	if(obj.value != "" && obj.value != " " && obj.value != "   "){
		if(obj.getAttribute("valor")!=(obj.value)){
		
		cep = obj.value.replace("-","");
		url = UrlNetdoc + "cep.do";
		parametro = "metodo=inicia&cep="+cep;
		
		retorno = bind(parametro,url,"GET");
		mobj =eval('(' + retorno + ')');
		if(campoBairro != null)
			campoBairro.value = mobj.bairro;
		if(campoCidade != null)
			campoCidade.value = mobj.cidade;
		if(campoRua != null)
			campoRua.value = mobj.tipo_logradouro +"  " + mobj.logradouro;
		if(campoUf != null)
			campoUf.value = mobj.uf;
		if(campoEnd != null){
			campoEnd.value = mobj.endereco;
			campoEnd.text = mobj.endereco;
		}
		}
	}
}

function saiCep2(obj){
	   

	if(obj.value != "" && obj.value != " " && obj.value != "   "){
		if(obj.getAttribute("valor")!=(obj.value)){
		
		cep = obj.value.replace("-","");
		url = UrlNetdoc + "cep.do";
		parametro = "metodo=inicia&cep="+cep;
		
		retorno = bind(parametro,url,"GET");
		mobj =eval('(' + retorno + ')');
		if(campoBairro2 != null)
			campoBairro2.value = mobj.bairro;
		if(campoCidade2 != null)
			campoCidade2.value = mobj.cidade;
		if(campoRua2 != null)
			campoRua2.value = mobj.tipo_logradouro +"  " + mobj.logradouro;
		if(campoUf2 != null)
			campoUf2.value = mobj.uf;
		if(campoEnd2 != null){
			campoEnd2.value = mobj.endereco;
			campoEnd2.text = mobj.endereco;
		}
		}
	}
}

function saiCep3(obj){
	   

	if(obj.value != "" && obj.value != " " && obj.value != "   "){
		if(obj.getAttribute("valor")!=(obj.value)){
		
		cep = obj.value.replace("-","");
		url = UrlNetdoc + "cep.do";
		parametro = "metodo=inicia&cep="+cep;
		
		retorno = bind(parametro,url,"GET");
		mobj =eval('(' + retorno + ')');
		if(campoBairro3 != null)
			campoBairro3.value = mobj.bairro;
		if(campoCidade3 != null)
			campoCidade3.value = mobj.cidade;
		if(campoRua3 != null)
			campoRua3.value = mobj.tipo_logradouro +"  " + mobj.logradouro;
		if(campoUf3 != null)
			campoUf3.value = mobj.uf;
		if(campoEnd3 != null){
			campoEnd3.value = mobj.endereco;
			campoEnd3.text = mobj.endereco;
		}
		}
	}
}

function saiCep4(obj){
	   

	if(obj.value != "" && obj.value != " " && obj.value != "   "){
		if(obj.getAttribute("valor")!=(obj.value)){
		
		cep = obj.value.replace("-","");
		url = UrlNetdoc + "cep.do";
		parametro = "metodo=inicia&cep="+cep;
		
		retorno = bind(parametro,url,"GET");
		mobj =eval('(' + retorno + ')');
		if(campoBairro4 != null)
			campoBairro4.value = mobj.bairro;
		if(campoCidade4 != null)
			campoCidade4.value = mobj.cidade;
		if(campoRua4 != null)
			campoRua4.value = mobj.tipo_logradouro +"  " + mobj.logradouro;
		if(campoUf4 != null)
			campoUf4.value = mobj.uf;
		if(campoEnd4 != null){
			campoEnd4.value = mobj.endereco;
			campoEnd4.text = mobj.endereco;
		}
		}
	}
}

function validacaoEmail(field) {
	usuario = field.value.substring(0, field.value.indexOf("@")); 
	dominio = field.value.substring(field.value.indexOf("@")+ 1, field.value.length); 
	if ((usuario.length >=1) && (dominio.length >=3) && (usuario.search("@")==-1) 
			&& (dominio.search("@")==-1) && (usuario.search(" ")==-1) && (dominio.search(" ")==-1) 
			&& (dominio.search(".")!=-1) && (dominio.indexOf(".") >=1)&& (dominio.lastIndexOf(".") < dominio.length - 1)) { 
		return false; 
	} else{ 
		alert("E-mail inv�lido"); 
	} 
}


