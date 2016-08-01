var colunasReportPdf;
var tabelaReportPdf;

var validaReenvioGrid = true;

var subreportsPdf;

var retornoTransacaoObj = null;

var debugaTudo = false;

var camposIdsSubGrids = new Array();
var camposAcaoSubGrids = new Array();
var gridesArepopular = new Array();


function avaliaSentencaRetornoTransacao(sentenca){
	for (var key in retornoTransacaoObj) {

 	    if (retornoTransacaoObj.hasOwnProperty(key)) {

 	        eval ("var "+key + " = retornoTransacaoObj."+key);

 	    }

 	}
	
	return eval(sentenca);
}

Array.prototype.get = function(par){
	return this[par];
}

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};


function setacolunareportpdf2(obj,nome,id){
	if(obj.checked)
		subreportsPdf[nome].linhasRelatorio[id] = 1;
	else
		subreportsPdf[nome].linhasRelatorio[id] = 0; 
}

function setacolunareportpdf(obj,id){
	if(obj.checked)
		colunasReportPdf[id] = 1;
	else
		colunasReportPdf[id] = 0;
}

gridVV.prototype = new dhtmlXGridObject();
gridVV.prototype.constructor = gridVV; 

var gridCarregandoNoMomento = null;


function htmlDecode(input){
	if(input == "")return input;
	  var e = document.createElement('div');
	  e.innerHTML = input;
	  return e.childNodes[0].nodeValue;
	}



function myErrorHandler(type, desc, erData){
	
	if(erData[0].responseText == "Necessita autenticar usuario")
		window.location.href = UrlNetdoc + "/login.jsp?urlDestino="+document.URL;
	else
		{
		alert("erro na carga do xml de " +  erData[0].responseURL);//erData[0].responseText);
		}
	
	return true;

	}

	dhtmlxError.catchError("LoadXML", myErrorHandler);



	
var tratandoErro = -1

var enviandoDados =false;





function isIE(){
	if (navigator.appName.indexOf("Microsoft") != -1)
		if (navigator.userAgent.indexOf('Opera') == -1)
			return true;
	return false;
}

function isChrome(){
	if (navigator.userAgent.indexOf("Chrome") != -1)
		return true;
	return false;
}

function isFirefox(){
	if (navigator.userAgent.indexOf("Firefox") != -1)
		return true;
	return false;
}

function replaceAll(str, de, para){
    var pos = str.indexOf(de);
    while (pos > -1){
		str = str.replace(de, para);
		pos = str.indexOf(de);
	}
    return (str);
}

// *********************************************
// SOLU??O ELEGANTE
// *********************************************
String.prototype.replaceAll = function(de, para){
    var str = this;
    var pos = str.indexOf(de);
    while (pos > -1){
		str = str.replace(de, para);
		pos = str.indexOf(de);
	}
    return (str);
} 



function doOnCellEdit(state, rowId, cellInd) {
		//just clear timeout and allow editting, when editor is going to be opened
		if(state == 0)
			this.editando = true;
		if (state == 2 || (this.cells(rowId, cellInd).isCheckbox() && state==1)) {
				var val = this.cells(rowId,cellInd).getValue();
				this.setUserData(rowId,"changed","1");
				this.editando = false;
		}
		return true;
}

gridVV.prototype.checkAll = function (coluna) {
	
			for(var x=0;x<this.getRowsNum();x++){
				var linha = this.getRowId(x);
				this.cells(linha,coluna).setValue(1);
				this.setUserData(linha,"changed","1");
			}
}

gridVV.prototype.setCampos = function (a) {
	this.campos = a;
}
gridVV.prototype.getCampos = function () {
	return this.campos;
}
gridVV.prototype.setCampoAcao = function (a) {
	this.campoAcao = a;
}
gridVV.prototype.getCampoAcao = function () {
	return this.campoAcao;
}



gridVV.prototype.setCabecalho = function(a){
	this.cabecalho = a.split(",");
	this.setHeader(a);
}
gridVV.prototype.setTamanho = function(a){
	this.setInitWidths(a);
}
gridVV.prototype.setAlinhamento = function(a){
	this.setColAlign(a);
}
gridVV.prototype.setTiposColuna = function(a){
	this.setColTypes(a);
}
gridVV.prototype.setOrdenamentoColuna = function(a){
	this.setColSorting(a);
}

gridVV.prototype.reCarrega = function(p){
	
	var retorno = false;
	
	if(typeof p !== 'undefined'){
		this.grade.idAtual = (p);
		this.exibindoDetail = true;
	}
	
	if(this.formDetail!= null && this.popup == null){
		this.formDetail.escondeForm();
		
	}
	if(this.vProcessaVisao != null && this.parametros != null){
		this.carregaVisao(this.parametros);
		retorno = true;
	}else
	if(this.URLCarga != ""){
		retorno = true;
		this.carregaXML(this.URLCarga);
	}
	
	
	
	if(typeof p !== 'undefined'){
		if(this.formDetail != null && this.formDetail.getSubgrids()!= null){
			for(var x = 0;x<this.formDetail.getSubgrids().length;x++){
				if(this.formDetail.getSubgrids()[x].formDetail != null && this.formDetail.getSubgrids()[x].formDetail.getCampoId != null){
					this.formDetail.getSubgrids()[x].reCarrega(this.formDetail.getSubgrids()[x].formDetail.getCampoId.value);
				}
			}
		}
	
	}
	
	return retorno;
}

gridVV.prototype.apagaLinha = function(){
	var rId = this.grade.getSelectedId();
	this.grade.setRowTextBold(rId);
	this.grade.setRowTextStyle(rId, "text-decoration: line-through;color: #ff0000;");
	this.grade.setUserData(rId,"deleted","1");
}

gridVV.prototype.insereLinha = function(evt){

	if(this.formDetail == null){
		var e=(evt)?evt:window.event;
	    if (window.event) {
	        e.cancelBubble=true;
	    } else {
	        //e.preventDefault();
	        e.stopPropagation();
	    }


		this.grade.setEditable(true);
		var newId = Math.random();//Date.parse(new Date());

		this.grade.addRow(newId,this.valoresPadrao.join(","));//add empty row
		this.grade.setUserData(newId,"new","1");//mark row as NEW
		this.grade.showRow(newId);
		this.grade.selectCell(this.grade.getRowIndex(newId),this.primeiroCampoEditavel,true);//put cursor into 2nd cell in new row
		this.grade.setRowTextStyle(newId, "color: green;");
		this.grade.editCell();
	}
	else{
		this.formDetail.novaLinha();
	}
	
}

gridVV.prototype.insereLinha2 = function(){

	this.setEditable(true);
	var newId = Math.random();//Date.parse(new Date());

	this.grade.addRow(newId,this.valoresPadrao.join(","));//add empty row
	this.grade.setUserData(newId,"new","1");//mark row as NEW
	this.grade.showRow(newId);
	this.grade.selectCell(this.grade.getRowIndex(newId),this.primeiroCampoEditavel,true);//put cursor into 2nd cell in new row
	this.grade.setRowTextStyle(newId, "color: green;");
	this.grade.editCell();
}


gridVV.prototype.insereLinhaValor = function(valores){

	
	this.grade.setEditable(true);
	var newId = Date.parse(new Date());

	this.grade.addRow(newId,valores.join(","));//add empty row
	this.grade.setUserData(newId,"new","1");//mark row as NEW
	this.grade.selectCell(this.grade.getRowIndex(newId),this.primeiroCampoEditavel,true);//put cursor into 2nd cell in new row
	this.grade.editCell();
}



gridVV.prototype.novaLinha = function(){

	alert("depreciado")
	
	this.setEditable(true);
	var newId = Date.parse(new Date());

	//this.addRow(newId,this.valoresPadrao.join(","));//add empty row
	
	this.addRow(newId);//add empty row

 	 for(x = 0;x<this.valoresPadrao.length;x++){
    	this.celula(newId,x).setValue(this.valoresPadrao[x]);
	 }
 
	this.setUserData(newId,"new","1");//mark row as NEW
}


gridVV.prototype.setPrimeiroCampoEditavel = function(a){
   this.primeiroCampoEditavel = a;
}



gridVV.prototype.setAltCelulas = function(a,b){
	// rever
   this.altCelulas[a] = b;
   this.grid.altCelulas[a] = b;
}

gridVV.prototype.marcaComoNova = function(){
	var newId = this.grade.getSelectedId();
	this.grade.setUserData(newId,"new","1");//mark row as NEW
	this.grade.showRow(newId);
	this.grade.selectCell(this.grade.getRowIndex(newId),this.primeiroCampoEditavel,true);//put cursor into 2nd cell in new row
	this.grade.setRowTextStyle(newId, "color: green;");
	this.grade.editCell();
}
// tipos de celulas editaveis 

function gridFormata(celula,formato, grid, coluna){

	celula.val = celula.getValue();
	celula.obj = document.createElement("input");
	celula.obj.id = "celulaEditada";
	celula.obj.style.width = "100%";
	celula.obj.style.height = (celula.cell.offsetHeight-4)+"px";
	celula.obj.style.border = "0px";
	celula.obj.style.margin = "0px";
	celula.obj.style.padding = "0px";
	celula.obj.style.overflow = "hidden";
	celula.obj.style.fontSize = "12px";
	celula.obj.style.fontFamily = "Arial";
	celula.obj.style.textAlign = celula.cell.align;
	celula.obj.className = formato;
	celula.obj.value = celula.val
	celula.cell.innerHTML = "";
	celula.cell.appendChild(celula.obj);
	formata(celula.obj, grid, coluna);
	
	celula.obj.setAttribute("timer",setTimeout(function(){funcSetaFoco(celula.obj);},100));
}

function funcSetaFoco(obj){
	// rever
	obj.focus();
}


function eXcell_cor(cell){
	this.base = eXcell_ed;
	this.base(cell);
	
	this.valor = "";

	this.edit = function(){
		pal = this.cell.innerHTML.split(">");
		if(pal.length > 1){
			pal = pal[1].split("<");
			this.setValue(pal[0]);
			this.valor = pal[0];
		}
		
		
		
		gridFormata(this,"cor", this.grid, cell._cellIndex);
	}
	
	this.getValue = function(){

		
		pal = this.cell.innerHTML.split(">");
		if(pal.length > 1){
			
			pal = pal[1].split("<");
			return (pal[0]);
		}
		else
			return "#ffffff";
	}
	
	this.setValue = function(val){

		
		this.cell.innerHTML = "<span style = 'background-color:"+val+";color:"+val+"' >" + val  + "</span>";
	}
	
	this.getContent = function(){

		
		pal = this.cell.innerHTML.split(">");
		if(pal.length > 1){
			pal = pal[1].split("<");
			return (pal[0]);
		}
		else
			return "#ffffff";
	}
}
eXcell_cor.prototype = new eXcell_ed;


  
function eXcell_cep(cell){
		this.base = eXcell_ed;
		this.base(cell)
		this.edit = function(){
			gridFormata(this,"cep");
		}
	}
eXcell_cep.prototype = new eXcell_ed;

function eXcell_cpf(cell){
		this.base = eXcell_ed;
		this.base(cell)
		this.edit = function(){
			gridFormata(this,"cpf");
		}
	}
eXcell_cpf.prototype = new eXcell_ed;

function eXcell_cgc(cell){
	this.base = eXcell_ed;
	this.base(cell)
	this.edit = function(){
		gridFormata(this,"cgc");
	}
}
eXcell_cgc.prototype = new eXcell_ed;

function eXcell_fone(cell){
		this.base = eXcell_ed;
		this.base(cell)
		this.edit = function(){
			gridFormata(this,"telefone");
		}
	}
eXcell_fone.prototype = new eXcell_ed;
  
function eXcell_placa(cell){
	this.base = eXcell_ed;
	this.base(cell)
	this.edit = function(){
		gridFormata(this,"placa");
	}
}
eXcell_placa.prototype = new eXcell_ed;
  
function eXcell_moeda(cell){
		this.base = eXcell_ed;
		this.base(cell)
		this.edit = function(){
			gridFormata(this,"moeda");
		}
		
		this.getContent = function(){
			var palavra =this.getValue();
			var sPalavra = replaceAll(palavra,".","");
			sPalavra = replaceAll(sPalavra,",",".");

			return (sPalavra-0);
		}
	}
	eXcell_moeda.prototype = new eXcell_ed;


function eXcell_data(cell){
		this.base = eXcell_ed;
		this.base(cell)
		this.edit = function(){
			gridFormata(this,"dataGrid",this.grid, cell._cellIndex);
		}
		
		this.getContent = function(){
			var palavra= this.getValue();
			var sPalavra = palavra.split("/");
			
			return (sPalavra[0] -0) + ((sPalavra[1]-0) * 30) + ((sPalavra[2]-0) * 365);
		}
	}
eXcell_data.prototype = new eXcell_ed;


function eXcell_dataEstatica(cell){
		this.base = eXcell_ro;
		this.base(cell)
		this.edit = function(){};
		
		
		this.getContent = function(){
			var palavra= this.getValue();
			if(palavra == null || palavra == "")
				return 0;
			var sPalavra = palavra.split("/");
			sPalavra[2] = sPalavra[2] + " 0:0:0"
			var sPalavra2 = sPalavra[2].split(" ");
			var sPalavra3 = sPalavra2[1].split(":");
			return ((sPalavra3[1]-0) + ((sPalavra3[0]-0)*60) + ((sPalavra[0] -0) * 60 * 24) + ((sPalavra[1] -0) * 60 * 24 * 30) + ((sPalavra2[0]-0)* 60 * 24 * 365));
		}
	}	
eXcell_dataEstatica.prototype = new eXcell_ed;

function eXcell_textoEstatico(cell){
		this.base = eXcell_txt;
		this.base(cell);
		
 this.edit = function(){
	
	 
	 
 	this.val = this.getValue()
	 this.obj = document.createElement("TEXTAREA");
	 this.obj.readOnly = true;
	 this.obj.className="dhx_textarea";
	 this.obj.onclick = function(e){
	 	(e||event).cancelBubble = true
	 	};
	 var arPos = this.grid.getPosition(this.cell);

	 if (!this.cell._clearCell)this.obj.value = this.val;
	 this.obj.style.display = "";
	 this.obj.style.textAlign = this.cell.align;
	 if (_isFF){var z_ff=document.createElement("DIV");
		 z_ff.appendChild(this.obj);
		 z_ff.style.overflow="auto";
		 z_ff.className="dhx_textarea";
		 this.obj.style.margin="0px 0px 0px 0px";
		 this.obj.style.border="0px";
		 this.obj=z_ff;
		 };
	 document.body.appendChild(this.obj);
	 this.obj.onkeydown=function(e){
	 	var ev=(e||event);
	 	if (ev.keyCode==9){
	 		globalActiveDHTMLGridObject.entBox.focus();
	 		globalActiveDHTMLGridObject.doKey({keyCode:ev.keyCode,shiftKey:ev.shiftKey,srcElement:"0"});
	 		return false;};};
	 this.obj.style.left = arPos[0]+"px";
	 this.obj.style.top = arPos[1]+this.cell.offsetHeight+"px";
	 if(this.cell.scrollWidth<200)var pw=200;
	 else var pw=this.cell.scrollWidth - arPos[0];
	 
	 
	 this.obj.style.width = this.cell.offsetWidth + "px";
	
	 this.obj.value = this.obj.style.width + "  " + this.obj.value;

	 if (_isFF){this.obj.firstChild.style.width = parseInt(this.obj.style.width)+"px";
	 this.obj.firstChild.style.height = this.obj.offsetHeight-3+"px";};
	 this.obj.focus();if (_isFF)this.obj.firstChild.focus();else this.obj.focus()};
	 
	 
	 
	 
	 }
	eXcell_textoEstatico.prototype = new eXcell_txt;	


	function eXcell_textoCodigo(cell){
		this.base = eXcell_txt;
		this.base(cell);
		
 this.edit = function(){

 	this.val = this.getValue()
	 this.obj = document.createElement("TEXTAREA");
	 this.obj.readOnly = false;
	 this.obj.className="dhx_textarea";
	 this.obj.onclick = function(e){
	 	(e||event).cancelBubble = true
	 	};
	 var arPos = this.grid.getPosition(this.cell);
	 if (!this.cell._clearCell)this.obj.value = this.val;
	 this.obj.style.display = "";
	 this.obj.style.textAlign = this.cell.align;
	 if (_isFF){var z_ff=document.createElement("DIV");
		 z_ff.appendChild(this.obj);
		 z_ff.style.overflow="auto";
		 z_ff.className="dhx_textarea";
		 this.obj.style.margin="0px 0px 0px 0px";
		 this.obj.style.border="0px";
		 this.obj=z_ff;
		 };
	 document.body.appendChild(this.obj);
	 this.obj.onkeydown=function(e){
	 	var ev=(e||event);
	 	if (ev.keyCode==9){
	 		globalActiveDHTMLGridObject.entBox.focus();
	 		globalActiveDHTMLGridObject.doKey({keyCode:ev.keyCode,shiftKey:ev.shiftKey,srcElement:"0"});
	 		return false;};};
	 this.obj.style.left = (arPos[0]-300)+"px";
	 this.obj.style.top = arPos[1]+this.cell.offsetHeight+"px";
	 if(this.cell.scrollWidth<200)var pw=200;
	 else var pw=this.cell.scrollWidth + 500;
	 this.obj.style.width = pw+(_isFF?18:16)+"px";
	 if (_isFF){this.obj.firstChild.style.width = parseInt(this.obj.style.width)+"px";
	 this.obj.firstChild.style.height = this.obj.offsetHeight-3+"px";};
	 this.obj.focus();if (_isFF)this.obj.firstChild.focus();else this.obj.focus()};
	 
	 }
	eXcell_textoCodigo.prototype = new eXcell_txt;
	
	
	
	
	function eXcell_textoHtml(cell){
		this.base = eXcell_txt;
		this.base(cell);
		
 this.edit = function(){

 	this.val = this.getValue()
	 this.obj = document.createElement("span");
	 this.obj.readOnly = false;
	 this.obj.className="dhx_textarea";
	 this.obj.onclick = function(e){
	 	(e||event).cancelBubble = true
	 	};
	 var arPos = this.grid.getPosition(this.cell);
	 if (!this.cell._clearCell)this.obj.innerHTML = this.val;
	 this.obj.style.display = "";
	 this.obj.style.textAlign = this.cell.align;
	 if (_isFF){var z_ff=document.createElement("DIV");
		 z_ff.appendChild(this.obj);
		 z_ff.style.overflow="auto";
		 z_ff.className="dhx_textarea";
		 this.obj.style.margin="0px 0px 0px 0px";
		 this.obj.style.border="0px";
		 this.obj=z_ff;
		 };
	 document.body.appendChild(this.obj);
	 this.obj.onkeydown=function(e){
	 	var ev=(e||event);
	 	if (ev.keyCode==9){
	 		globalActiveDHTMLGridObject.entBox.focus();
	 		globalActiveDHTMLGridObject.doKey({keyCode:ev.keyCode,shiftKey:ev.shiftKey,srcElement:"0"});
	 		return false;};};
	 this.obj.style.left = (arPos[0]-300)+"px";
	 this.obj.style.top = arPos[1]+this.cell.offsetHeight+"px";
	 if(this.cell.scrollWidth<200)var pw=200;
	 else var pw=this.cell.scrollWidth + 500;
	 this.obj.style.width = pw+(_isFF?18:16)+"px";
	 if (_isFF){this.obj.firstChild.style.width = parseInt(this.obj.style.width)+"px";
	 this.obj.firstChild.style.height = this.obj.offsetHeight-3+"px";};
	 this.obj.focus();if (_isFF)this.obj.firstChild.focus();else this.obj.focus()};
	 
	 }
	eXcell_textoHtml.prototype = new eXcell_txt;

	
function eXcell_inteiro(cell){
		this.base = eXcell_ed;
		this.base(cell)
		this.edit = function(){
			gridFormata(this,"inteiro");
		}
	}
	eXcell_inteiro.prototype = new eXcell_ed;	
	
function eXcell_ano(cell){
		this.base = eXcell_ed;
		this.base(cell)
		this.edit = function(){
			gridFormata(this,"mascara:9999");
		}
	}
eXcell_ano.prototype = new eXcell_ed;		

function eXcell_tamanhoLimitado(cell){
	// rever voltar para ca
	this.base = eXcell_ed;
	this.base(cell);
	this.cell = cell;
	this.grid = this.cell.parentNode.grid;
	grid = this.grid;
	cell = this.cell;
	
	this.edit = function(){
		if(tratandoErro == -1 || tratandoErro == cell._cellIndex){
			tratandoErro = -1;
			gridFormata(this,"tamanhoLimitado:" +grid.tamanhoCampo[cell._cellIndex]);
			this.coluna = cell._cellIndex;
		}

	}
}
eXcell_tamanhoLimitado.prototype = new eXcell_ed;

	

function eXcell_combo(cell){
		this.base = eXcell_coro;
		this.base(cell)
	}
	eXcell_combo.prototype = new eXcell_coro;		
	
function eXcell_check(cell){
		this.base = eXcell_ch;
		this.base(cell)
	}
	eXcell_check.prototype = new eXcell_ch;		

	
function eXcell_campo(cell){
		this.base = eXcell_ed;
		this.base(cell)
	}
	eXcell_campo.prototype = new eXcell_ed;	
	
function eXcell_texto(cell){
		this.base = eXcell_txt;
		this.base(cell)

	}
	eXcell_texto.prototype = new eXcell_txt;	
		

	
function eXcell_link(cell){
		this.valor = "";
		
		try{
			this.cell = cell;
			this.grid = this.cell.parentNode.grid;
		}catch(er){}
		this.edit = function(){;}

		this.getValue = function(){
			return this.cell.getAttribute("valor");
			}
		this.getContent = function(){	
			return this.cell.getAttribute("valor");
		}
		this.detach = function(){
				this.setValue(this.obj.value);
				return this.val!=this.getValue();
			}
		

		this.setValue = function(val){

				this.valor = val;
				var url = this.grid.urlCelulas[this.cell._cellIndex-0];
				if(url == null){
					url = "";
				}
				url = url.replace("::parametro",this.cell.getAttribute("parametro"));
				url = url.replace("::id",this.cell.parentNode.idd);
	
				
				if(val.toString()=="")
					this.cell.innerHTML = "&nbsp;";
				else{
					cor = "";
					if(this.cell.getAttribute("cor") != null){
						cor = "background-color:#"+this.cell.getAttribute("cor")+";";
					}
						this.cell.innerHTML = "<span style = '"+cor+"' ><a href='"+url+"' > " + val + "</a></span>";
					}
				this.cell.setAttribute("valor",val);
			}
}
eXcell_link.prototype = new eXcell;		


function eXcell_imagem(cell){
		this.valor = "";
		
		try{
			this.cell = cell;
			this.grid = this.cell.parentNode.grid;
		}catch(er){}
		this.edit = function(){;}

		this.getValue = function(){
				return this.valor;
			}
		this.getContent = function(){	
			varMarray = this.cell.getAttribute("valor").split("/");
			return varMarray[varMarray.length-1];
		}
		this.detach = function(){
				this.setValue(this.obj.value);
				return this.val!=this.getValue();
			}
		
		this.setValue = function(val){
				this.valor = val;
		
				var alt = this.grid.altCelulas[this.cell._cellIndex-0];
				
				var size = this.grid.sizeCelulas[this.cell._cellIndex-0];
				
				if(this.cell.getAttribute("parametro"))
					alt = this.cell.getAttribute("parametro");
				
				var toolTip = "onmouseover=\"doTooltip(event,'"+alt+"')\"  onmouseout=\"hideTip();\" ";
				
				if(val.toString()=="")
					this.cell.innerHTML = "&nbsp;";
				else
					this.cell.innerHTML = "  <img "+size+" src = '" + val  + "?codiroAleatorio=" + (Math.random() * 1000000) +"' border = '0' title = '"+alt+"' /> ";
				this.cell.setAttribute("valor",val);
		}
	
}
eXcell_imagem.prototype = new eXcell;		



function eXcell_imagemEstatica(cell){
		this.valor = "";
		
		try{
			this.cell = cell;
			this.grid = this.cell.parentNode.grid;
		}catch(er){}
		this.edit = function(){;}

		this.getValue = function(){
				return this.valor;
			}
		this.getContent = function(){	
			varMarray = this.cell.getAttribute("valor").split("/");
			return varMarray[varMarray.length-1];
		}
		this.detach = function(){
				this.setValue(this.obj.value);
				return this.val!=this.getValue();
			}
		
		this.setValue = function(val){
			this.valor = val;
			
			var alt = this.grid.altCelulas[this.cell._cellIndex-0];
			
			var size = this.grid.sizeCelulas[this.cell._cellIndex-0];
			
			if(this.cell.getAttribute("parametro"))
				alt = this.cell.getAttribute("parametro");
			
			var toolTip = "onmouseover=\"doTooltip(event,'"+alt+"')\"  onmouseout=\"hideTip();\" ";
			
			if(val.toString()=="")
				this.cell.innerHTML = "&nbsp;";
			else
				this.cell.innerHTML = " <img "+size+" src = '" + val  + "' border = '0' title = '"+alt+"' />";
			this.cell.setAttribute("valor",val);
				this.cell.setAttribute("valor",val);
		}
	
}
eXcell_imagemEstatica.prototype = new eXcell;	
	
function eXcell_linkImg(cell){
		this.valor = "";
		
		try{
			this.cell = cell;
			this.grid = this.cell.parentNode.grid;
		}catch(er){}
		this.edit = function(){;}

		this.getValue = function(){
				return this.valor;
			}
		this.getContent = function(){
			return this.cell.getAttribute("valor");
		}

		this.setValue = function(val){

				this.valor = val;
				var url = this.grid.urlCelulas[this.cell._cellIndex-0];
				var alt = this.grid.altCelulas[this.cell._cellIndex-0];
				
				url = url.replace("::parametro",this.cell.getAttribute("parametro"));
				url = url.replace("::id",this.cell.parentNode.idd);
				
				if(val.toString()=="")
					this.cell.innerHTML = "&nbsp;";
				else
					this.cell.innerHTML = "<a href='"+url+"' ><img src = '" + val  + "?codiroAleatorio=" + (Math.random() * 1000000) +"' border = '0' title = '"+alt+"' /></a>";
				this.cell.setAttribute("valor",val);
			}
		this.detach = function(){
				this.setValue(this.obj.value);
				return this.val!=this.getValue();
			}
}
eXcell_linkImg.prototype = new eXcell;	


function rodaTransacaoUpload(arquivo, id, parametro, tag){
	
	window["transacaoCodigoUpload"] = tag.getAttribute("transacaoCodigoUpload");
	window["parametrosUpload"] = tag.getAttribute("parametrosUpload");
	
	extensao = "."+arquivo.name.split(".")[1];

	var dataUp = new FormData();
	dataUp.append("transacaoMentor",window["transacaoCodigoUpload"]);
	dataUp.append("arquivo",arquivo);
	
	window["parametrosUpload"] = window["parametrosUpload"].replace("::extensao",extensao);
	var marray = window["parametrosUpload"].split("&");
	
	for(var x = 0;x < marray.length;x++){
		var marrd = marray[x].split("=");
		dataUp.append(marrd[0],marrd[1]);
	}
	

	$.ajax({
	url: UrlNetdoc + 'uploadArquivoProcessaTransacao.do?metodo=processa',
	type: 'POST',
	data: dataUp,
	async: false,
	cache: false,
	dataType: 'html',
	processData: false, // Don't process the files
	contentType: false, // Set content type to false as jQuery will tell the server its a query string request
	success: function(data, textStatus, jqXHR)
	{
	if(typeof data.error != 'undefined')
	{
	console.log('ERRORS: ' + data.error);
	}
	},
	error: function(jqXHR, textStatus, errorThrown)
	{

	alert("erro");
	}
	});
	if(window["trataSucessoUpload"] != null)
		window["trataSucessoUpload"]();
}

function eXcell_upload(cell){
	this.valor = "";
	
	try{
		this.cell = cell;
		this.grid = this.cell.parentNode.grid;
	}catch(er){}
	this.edit = function(){;}

	this.getValue = function(){
			return this.valor;
		}
	this.getContent = function(){
		return this.cell.getAttribute("valor");
	}

	this.setValue = function(val){

			this.valor = val;
			var url = this.grid.urlCelulas[this.cell._cellIndex-0];
			url = url.replace("javascript:","");
			var alt = this.grid.altCelulas[this.cell._cellIndex-0];
			var size = this.grid.sizeCelulas[this.cell._cellIndex-0];
			parametro = this.cell.getAttribute("parametro");
			idd =this.cell.parentNode.idd;
			
			if(parametro == null || parametro == "")
				parametro =  "0"+this.cell.getAttribute("parametro");
			if(idd == null || idd == "")
				idd =  "0"+ this.cell.parentNode.idd;
			
		
			url = url.replaceAll("::parametro",this.cell.getAttribute("parametro"));
			url = url.replaceAll("::id",this.cell.parentNode.idd);
			
			var extensoes = "";
			
			if(url.startsWith("transacao=")){
				
				if (typeof this.grid.trataSucessoCelulas != "undefined")
					VVgridUrlSimSucesso = (this.grid.trataSucessoCelulas[this.cell._cellIndex-0])
				
				
				url = url.split("&codigoAleatorio")[0];
				
				var marray = url.split("#extensoes=");
				if(marray.length > 1)
					extensoes = "accept = '"+marray[1]+"' ";
				
				url = marray[0];
				
				var marray = url.split("#parametros=");
				
				
				window["transacaoCodigoUpload"] = marray[0].split("=")[1];
				window["parametrosUpload"] = marray[1];
				window["trataSucessoUpload"] = VVgridUrlSimSucesso;
				
				url = "rodaTransacaoUpload";
				
			}
			
			
			if(val.toString()=="")
				this.cell.innerHTML = "&nbsp;";
			else
				this.cell.innerHTML = "<input type='file' class='file_hidden' "+extensoes+" id = \"arquivoEscondido_"+this.cell._cellIndex+"_"+parametro+"_"+idd+"\" onchange='"+url+"(this.files[0],"+idd+",\""+parametro+"\", this)' transacaoCodigoUpload= '"+window["transacaoCodigoUpload"]+"'  parametrosUpload = '"+window["parametrosUpload"]+"' ><img onClick = 'document.getElementById(\"arquivoEscondido_"+this.cell._cellIndex+"_"+parametro+"_"+idd+"\").click();' src = '" + val  + "?codiroAleatorio=" + (Math.random() * 1000000) +"' "+size+" />";
			this.cell.setAttribute("valor",val);
		}
	this.detach = function(){
			this.setValue(this.obj.value);
			return this.val!=this.getValue();
		}
}
eXcell_upload.prototype = new eXcell;


var VVgridUrlSimNao =  null;
var VVgridUrlSimSucesso =  null;

function processaVVgridUrlSimNao(){
	VVgridUrlSimNao = document.getElementById("idVVgridUrlSimNao").value;
	VVgridUrlSimSucesso = eval(document.getElementById("idVVgridUrlSimSucesso").value);
	
	
	
	if(VVgridUrlSimNao.indexOf("javascript:") != -1){
		VVgridUrlSimNao2 = VVgridUrlSimNao.replace("javascript:","");
		eval(VVgridUrlSimNao2);
	}else{
		sVVgridUrlSimNao = VVgridUrlSimNao.split("?");
		var retorno = bind(sVVgridUrlSimNao[1],sVVgridUrlSimNao[0],"GET");
		if((retorno.indexOf("sucesso") != -1) && VVgridUrlSimSucesso != null)
			VVgridUrlSimSucesso(retorno);// vem aqui
		else
			alert(retorno);
	}
	
}

function rodaTransacaoSimNao(){
	var transacao = window["transacaoCodigoSimNao"];
	var parametros = window["parametrosSimNao"];
	var trataSucesso = window["trataSucessoSimNao"];
	try{
		var retorno =  executaTransacao(transacao,parametros);
		if(trataSucesso != null){
			trataSucesso = eval(trataSucesso);
			trataSucesso(retorno);	
		}
	}catch(err){
		alert(err);
	}	
}
function setaSimNao(tag){
		window["transacaoCodigoSimNao"] = tag.getAttribute("transacaoCodigoSimNao");
	window["parametrosSimNao"] = tag.getAttribute("parametrosSimNao");
	window["trataSucessoSimNao"] = tag.getAttribute("trataSucessoSimNao");
}
function eXcell_sim_nao(cell){
	this.valor = "";
	
	try{
		this.cell = cell;
		this.grid = this.cell.parentNode.grid;
	}catch(er){}
	this.edit = function(){;}

	this.getValue = function(){
			return this.valor;
		}
	this.getContent = function(){
		return this.cell.getAttribute("valor");
	}

	this.setValue = function(val){
		

		this.valor = val;
		var url = this.grid.urlCelulas[this.cell._cellIndex-0];
		var alt = this.grid.altCelulas[this.cell._cellIndex-0];
		
		if (typeof this.grid.trataSucessoCelulas != "undefined")
			VVgridUrlSimSucesso = (this.grid.trataSucessoCelulas[this.cell._cellIndex-0])
		else 
			VVgridUrlSimSucesso = alert;
		

		url = url.replace("::parametro",this.cell.getAttribute("parametro"));
		url = url.replace("::id",this.cell.parentNode.idd);

		if(url.startsWith("transacao=")){
			var marray = url.split("#parametros=");
			
			
			window["transacaoCodigoSimNao"] = marray[0].split("=")[1];
			window["parametrosSimNao"] = marray[1];
			window["trataSucessoSimNao"] = VVgridUrlSimSucesso;
			
			url = "javascript:rodaTransacaoSimNao()";
			
		}
		
		VVgridUrlSimNao = url;
		
		
		
		if(val.toString()=="")
			this.cell.innerHTML = "&nbsp;";
		else
			this.cell.innerHTML = "<img src = '" + val  + "' border = '0'  onClick = \"setaSimNao(this);VVPopupSimNao('"+alt+"',processaVVgridUrlSimNao,null,'"+url+"', '"+VVgridUrlSimSucesso.name+"', this);\" transacaoCodigoSimNao = '"+window["transacaoCodigoSimNao"]+"' parametrosSimNao = '"+window["parametrosSimNao"]+"'  trataSucessoSimNao = '"+VVgridUrlSimSucesso.name+"'   />";
		
		this.cell.setAttribute("valor",val);
	}
	
	
	
	this.detach = function(){
			this.setValue(this.obj.value);
			return this.val!=this.getValue();
		}
}
eXcell_sim_nao.prototype = new eXcell;

var paraNoClique = true;

function navegaGridVV(mevent,url){
	if(paraNoClique){
		if (mevent.stopPropagation) {
			mevent.stopPropagation();   // W3C model
		  } else {
			  mevent.cancelBubble = true; // IE model
		  }	
	}
	
	
	if(url.indexOf("javascript:") > -1){
		url = url.replaceAll("javascript:","");
		eval(url);
	}else
	window.location.href = url;
}

function eXcell_funcImg(cell){
		this.valor = "";
		
		try{
			this.cell = cell;
			this.grid = this.cell.parentNode.grid;
		}catch(er){}
		this.edit = function(){;}

		this.getValue = function(){
				return this.valor;
			}
		this.getContent = function(){	
			varMarray = this.cell.getAttribute("valor").split("/");
			return varMarray[varMarray.length-1];
		}

		this.setValue = function(val){

				this.valor = val;
				//var url = this.grid.urlCelulas[this.cell._cellIndex-0].split("&")[0];
				var url = this.grid.urlCelulas[this.cell._cellIndex-0];
				
				
				url = url.replaceAll("\"", "#aspasduplas#");
				url = url.replaceAll("#aspasduplas#", "\\\"");
				
				var size = this.grid.sizeCelulas[this.cell._cellIndex-0];
				
				var alt = this.grid.altCelulas[this.cell._cellIndex-0];
				
				
				var toolTip = "onmouseover=\"doTooltip(event,'"+alt+"')\"  onmouseout=\"hideTip();\" ";
				
				url = url.replace("::parametro",this.cell.getAttribute("parametro"))
				url = url.replace("::id",this.cell.parentNode.idd);
				
				url = "navegaGridVV(event, \"" + url +"\");";
				
				if(val.toString()=="")
					this.cell.innerHTML = "&nbsp;";
				else
					this.cell.innerHTML = "<a onClick='"+url+"' ><img src = '" + val  + "?codiroAleatorio=" + (Math.random() * 1000000) +"' "+size+" border = '0' title = '"+alt+"' /></a>";
				
				this.cell.setAttribute("valor",val);
			}
		this.detach = function(){
				// this.setValue(this.obj.value);
				return this.val!=this.getValue();
			}
}
eXcell_funcImg.prototype = new eXcell_ed;	

function eXcell_popupImg(cell){
		this.valor = "";
		
		try{
			this.cell = cell;
			this.grid = this.cell.parentNode.grid;
		}catch(er){}
		this.edit = function(){;}

		this.getValue = function(){
				return this.valor;
			}
		this.getContent = function(){
			return this.cell.getAttribute("valor");
		}

		this.setValue = function(val){


				this.valor = val;
				var url = this.grid.urlCelulas[this.cell._cellIndex-0];
				var size = this.grid.sizeCelulas[this.cell._cellIndex-0];
				
				var alt = this.grid.altCelulas[this.cell._cellIndex-0];
				
				if(url != null){
					url = url.replace("::parametro",this.cell.getAttribute("parametro"));
					url = url.replace("::id",this.cell.parentNode.idd);
					
					href = "javascript:void(window.open('"+url+"','popUp','status=0,location=0,toolbar=0,menubar=0,directories=0,resizable=0,scrollbars=0,height=280,width=580'));";
					if(val.toString()=="")
					this.cell.innerHTML = "&nbsp;";
				else
					this.cell.innerHTML = "<a href=\""+href+"\" ><img src = '" + val + "?codiroAleatorio=" + (Math.random() * 1000000) + "' "+size+" border = '0' title = '"+alt+"' alt = '"+alt+"'/></a>";
					}
					else{
					if(val.toString()=="")
						this.cell.innerHTML = "&nbsp;";
					else
						this.cell.innerHTML = "<img src = '" + val + "?codiroAleatorio=" + (Math.random() * 1000000) + "'  "+size+" border = '0' title = '"+alt+"' alt = '"+alt+"'/>";
					}
				this.cell.setAttribute("valor",val);
			}
		this.detach = function(){
				this.setValue(this.obj.value);
				return this.val!=this.getValue();
			}
}
eXcell_popupImg.prototype = new eXcell;		

// to aqui de baixo para cima 

function eXcell_metodo(cell){
		this.valor = "";
		
		try{
			this.cell = cell;
			this.grid = this.cell.parentNode.grid;
		}catch(er){}
		this.edit = function(){;}

		this.getValue = function(){
				return this.valor;
			}
		this.getContent = function(){
			return this.cell.getAttribute("valor");
		}

		this.setValue = function(val){
				var par =	this.cell.getAttribute("parametro")
				if(val != "")
					this.cell.innerHTML = "<input type = 'button' value = '...' onclick = '"+val+"("+par+");'  />";
				this.cell.setAttribute("valor",val);
			}
		this.detach = function(){
			val = this.cell.getAttribute("valor");
			if(val != "" && this.obj != null)
				this.setValue(this.obj.value);
				return this.val!=this.getValue();
			}
}
eXcell_metodo.prototype = new eXcell;	

	

function eXcell_linkCondicional(cell){
		this.valor = "";
		
		try{
			this.cell = cell;
			this.grid = this.cell.parentNode.grid;
		}catch(er){}
		this.edit = function(){;}

		this.getValue = function(){
				return this.valor;
			}
		this.getContent = function(){
			return this.cell.getAttribute("valor");
		}

		this.setValue = function(val){

			this.valor = val;
			var url = this.grid.urlCelulas[this.cell._cellIndex-0];
			if(url == null){
				url = "";
			}
			url = url.replace("::parametro",this.cell.getAttribute("parametro"));
			url = url.replace("::id",this.cell.parentNode.idd);

			
			if(val.toString()=="")
				this.cell.innerHTML = "&nbsp;";
			else{
				cor = "";
				if(this.cell.getAttribute("cor") != null){
					cor = "background-color:#"+this.cell.getAttribute("cor")+";";
				}
					this.cell.innerHTML = "<span style = '"+cor+"' ><a href='"+url+"' > " + val + "</a></span>";
				}
			this.cell.setAttribute("valor",val);
		}
		this.detach = function(){
				this.setValue(this.obj.value);
				return this.val!=this.getValue();
			}
}
eXcell_linkCondicional.prototype = new eXcell;	

function eXcell_senha(cell){

		try{
			this.base = eXcell_ed;
			this.base(cell)
		
			this.cell = cell;
			this.grid = this.cell.parentNode.grid;
			
		}catch(er){}

		this.edit = function(){
			this.obj = document.createElement("input");
			this.obj.type = "password";
			this.obj.style.width = "100%";
			this.obj.style.height = (this.cell.offsetHeight-4)+"px";
			this.obj.style.border = "0px";
			this.obj.style.margin = "0px";
			this.obj.style.padding = "0px";
			this.obj.style.overflow = "hidden";
			this.obj.style.fontSize = "12px";
			this.obj.style.textAlign = this.cell.align;
			this.obj.value = this.getValue();
			this.cell.innerHTML = "";
			this.cell.appendChild(this.obj);
			
			var celula = this.obj;

			setTimeout(function(){funcSetaFoco(celula);},100);


//			this.obj.focus()
		}
	 this.detach = function()
	 {
 		this.setValue(this.obj.value);
	 	return this.val!=this.getValue();
 	}
 	
 	this.getValue = function(){
				return this.cell.getAttribute("valor");
			}

		this.setValue = function(val){
				this.cell.setAttribute("valor",val);
				this.cell.innerHTML = "****";
			}
}
eXcell_senha.prototype = new eXcell_ed;	


gridVV.prototype.populaCombo =  function(coluna,valores){
			var combo = this.grade.getCombo(coluna);
			combo.clear();
			for(var i=0;i<valores.length;i++){
					if(valores[i][1])
						combo.put(valores[i][0],valores[i][1]);
					else
						combo.put(valores[i],valores[i]);
			}			
}
	
gridVV.prototype.populaComboDeXML =  function(coluna,url){

			var mArray = new Array();
			var lArray;

			var loader = new dtmlXMLLoaderObject(null,null,false);//sync mode
			if(url.indexOf(".xml") != -1)
				loader.loadXML(url);
			else{
				if(url.indexOf("visao=") != -1 && url.indexOf("valor=") != -1 && url.indexOf("texto=") != -1){
					loader.loadXML("processaVisaoCambo?comboColuna=true&" + url + "&codigoAleatorio=" + (Math.random()*100000));
				}else{
					if(url.indexOf("classe=") != -1 && url.indexOf("atributo=") != -1){
						var atributo = url.split("&")[1].replaceAll("atributo=","")
						var metodo = "get" + atributo.capitalize() + "FormatadoLista";
						loader.loadXML("jsp/gridVV/comboColunaCampoListaFormatado.jsp?metodo="+metodo+ "&" + url + "&codigoAleatorio=" + (Math.random()*100000));
					}else{
						if(url.indexOf("?") != -1)
							loader.loadXML(url + "&codigoAleatorio=" + (Math.random()*100000));
						else
							loader.loadXML(url + "?codigoAleatorio=" + (Math.random()*100000));	
					}
				}
				
				
			
			}
			
			var root = loader.getXMLTopNode("rows");

			 
			var contLinha = 0;

			for(var i=0;i<root.childNodes.length;i++){
				if(root.childNodes[i].tagName == "row"){
					lArray = new Array();
					lArray[0] = root.childNodes[i].getAttribute("id");
					var x = 0;
					var naoAchou = true;
					while(x < root.childNodes[i].childNodes.length && naoAchou){
						if(root.childNodes[i].childNodes[x].tagName=="cell"){
							naoAchou = false;
							lArray[1] = root.childNodes[i].childNodes[x].childNodes[0].nodeValue;
						}
						x++;
					}
					
					mArray[contLinha++] = lArray;
					}
			}
			this.populaCombo(coluna,mArray);
		}


gridVV.prototype.E_LinhaNova = function(linha){
	return (this.grade.getUserData(linha,"new")==1);
}

gridVV.prototype.E_LinhaAlterada = function(linha){
	return (this.grade.getUserData(linha,"edited")==1);
}

gridVV.prototype.E_LinhaApagada = function(linha){
	return (this.grade.getUserData(linha,"deleted")==1);
}


function enviaDadosFuncao(obj,url){

		var parametros = "";
		var parametrosInsere = "";
		var parametrosDelete = "";
		
		
		if(obj.editando){
			obj.url = url;
			obj.timeoutHandler = setTimeout(function(){obj.enviaDados(url);},1000);
			}
		else
			if(obj.salvandoDados == false){
			obj.salvandoDados = true;


			clearTimeout(obj.timeoutHandler);
			obj.timeoutHandler = -1;
			
			parametros = criaCgiObjeto(obj);
	
			// envia os parametros para o servidor
			

			//parametros = parametros.replaceAll("+","%2B");

			
//			if(obj.debug)
//				alert(parametros);

			
		  result = bind(parametros,url, "POST");

	      obj.salvandoDados = false;
	            
	      if(result.substring(0,7) == "sucesso"){

	      	if(obj.trataSucesso != null){
		      	obj.trataSucesso(result);
		      	}
	      	else
	      		obj.reCarrega();
     		}
	      else{
	    	  

	    	  
	    		if(result == "Necessita autenticar usuario")
	    			window.location.href = UrlNetdoc + "/login.jsp?urlDestino="+document.URL;
	    	  
	    	  
	    	  
			if(obj.trataErro != null)
		      	obj.trataErro(result);
	      	else{
	      		if(obj.campoConfirmaErro == ""){
	      				result = replaceAll(result,"<br>","\r\n");
	      				result = replaceAll(result,"<<NITE>>","");
				      	alert(result);
			      	}
			    else{
			    	if(result.indexOf("<<NITE>>") == 0){
	      				result = replaceAll(result,"<br>","\r\n");
	      				result = replaceAll(result,"<<NITE>>","");
				      	alert(result);
			    	}
				    else{
	      				result = replaceAll(result,"<br>","\r\n");
				    	var resposta = window.confirm("Estes dados possuem os seguintes erros: \r\n" + result + "\r\nConfirma o envio deles?");
				    	if(resposta){
				    	      obj.parametrosExtras = obj.parametrosExtras + "&"+obj.campoConfirmaErro+"=1";
							  enviaDadosFuncao(obj,url);
						  }
					  }
			    	}
		      	}
	      	}
	
	   }
	}
	
	function bind(parametros, url, metodo){
		http_request = false;
	      	if (window.XMLHttpRequest) { // Mozilla, Safari,...
	         	http_request = new XMLHttpRequest();
	         	if (http_request.overrideMimeType) {
	            	http_request.overrideMimeType('text/html; charset=ISO-8859-1');
	         	}
	      	} else if (window.ActiveXObject) { // IE
	         	try {
	            	http_request = new ActiveXObject("Msxml2.XMLHTTP");
	         	} catch (e) {
	            try {
	               http_request = new ActiveXObject("Microsoft.XMLHTTP");
	            } catch (e) {}
	         }
	      }
	      if (!http_request) {
	         alert('N�o foi poss�vel inicializar o objeto XMLHTTP neste browser');
	         return false;
	      }
	      
	      parametros = parametros + "&codigoAleatorio=" + (Math.random() * 10000);
	      
	      if(metodo == "GET")
		      http_request.open(metodo, url + "?" + parametros, false);
		  else
			  http_request.open(metodo, url , false);
		      
	      http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=ISO-8859-1");
	    //  http_request.setRequestHeader("Content-length", parametros.length);
	    //  http_request.setRequestHeader("Connection", "close");
	      
		  if(metodo == "GET")
			  http_request.send("");
	      else
	      	http_request.send(parametros);
	      	
	      return http_request.responseText;
	}
	
	function setaFocoFuncao(a,b,obj){
		if(obj.timeout == -1){
			obj.timeout = setTimeout(function(){setaFocoFuncao(a,b,obj);},100);
		}else{
		clearTimeout(obj.timeoutHandler);
		clearTimeout(obj.timeout);
		obj.timeout = -1;
		obj.timeoutHandler = -1;
		obj.selectCell(obj.getRowIndex(a),b,true);//put cursor into 2nd cell in new row
		obj.editCell();
		}
	}
	
	
	
	
	
	function criaCgiObjeto(obj){

		
		var parametros = "";
		var parametrosInsere = "";
		var parametrosDelete = "";
	
			for(var x=0;x<obj.grade.getRowsNum();x++){
				var linha = obj.grade.getRowId(x);

				
				if(obj.enviaTudo && obj.grade.getUserData(linha,"deleted") != 1 && obj.grade.getUserData(linha,"new") != 1)
					obj.grade.setUserData(linha,"changed","1");
					
				
				if(obj.grade.getUserData(linha,"deleted") == 1 || obj.grade.getUserData(linha,"changed") == 1 || obj.grade.getUserData(linha,"new") == 1){
					var palavra = ""
					for(var i = 0;i<obj.campos.length;i++)
						if(obj.campos[i] != null && obj.campos[i] != "")// ? para enviar dados pois o campo tem valor
						{
							if(obj.grade.getUserData(linha,"deleted") != 1 && obj.permiteNull[i]== false 
							&& (obj.grade.cells(linha,i).getValue() == "" || obj.grade.cells(linha,i).getValue() == null || obj.grade.cells(linha,i).getValue() == "&nbsp;")){
								
								obj.setaFoco(linha,i);
								obj.salvandoDados = false;
								
								if(obj.trataErro != null)
							      	obj.trataErro("N�o � permitido valor nulo em " + obj.cabecalho[i]);
							     else
								     alert("N�o � permitido valor nulo em " + obj.cabecalho[i]);
								 
								 throw "N�o � permitido valor nulo em " + obj.cabecalho[i];
								 return;
							}
							
							if(obj.validaDados[i] == true && obj.grade.getUserData(linha,"deleted") != 1){
								if(obj.tipoColuna[i] == "data"){
									if(! validaDataGrid(obj.cells(linha,i).getValue())){
										if(obj.trataErro != null)
									      	obj.trataErro("as datas devem ser informadas no formato dd/mm/aaaa ");
									     else
										     alert("as datas devem ser informadas no formato dd/mm/aaaa ");
										     
										obj.setaFoco(linha,i);
										obj.salvandoDados = false;
										throw "as datas devem ser informadas no formato dd/mm/aaaa ";
										 return;
									}
								}
								if(obj.tipoColuna[i] == "cpf"){
									if(! validaCPFGrid(obj.cells(linha,i).getValue())){
										if(obj.trataErro != null)
									      	obj.trataErro("cpf inv�lido");
									     else
										     alert("cpf inv�lido");
										     
										obj.setaFoco(linha,i);
										obj.salvandoDados = false;
										
										throw "cpf inv�lido";
										 return;
									}
								}
								
							}

						
							if(obj.grade.cells(linha,i).getValue() == "&nbsp;")
								palavra = palavra + "&" + obj.campos[i] + "=" ;
							else{
									palavra = palavra + "&" + obj.campos[i] + "=" + replaceAll(obj.grade.cells(linha,i).getValue(),"&amp;",("%26")).replaceAll("&","%26");
								}
								
							palavra = replaceAll(palavra,"+","%2B");
							
							}
						
					if(obj.camposIndice != null){
							palavra = palavra + "&" +obj.camposIndice + "=" + (x+1)
						}
					if(obj.grade.getUserData(linha,"deleted")==1){
						parametrosDelete = parametrosDelete + palavra + "&"+ obj.campoAcao + "=" +obj.valorExclusao;//"=E" 
						}
					else{
						if(obj.grade.getUserData(linha,"new")==1)
							parametrosInsere = parametrosInsere + palavra + "&"+ obj.campoAcao + "=" +obj.valorInclusao;//"=I"
						else if(obj.grade.getUserData(linha,"changed")==1)
							parametros = parametros + palavra + "&"+ obj.campoAcao + "=" + obj.valorAltera;//"=A"
						}
				}
			}

			parametros = obj.parametrosExtras + "&"+parametrosDelete + "&" + parametros + "&" + parametrosInsere;
			return parametros;
	}
	
	function trocaValor(val){
		var ret = replaceAll(val,"%","###=###");
		ret = replaceAll(ret,"###=###", escape("%"));
		
		


		
		ret = replaceAll(ret,"=",escape("="));

		ret = ret.replaceAll("+",("%2B"));
		
		ret = replaceAll(ret," ",escape(" "));
		return ret;
	}
	
	
	function enviaDadosFormGrid(obj,grids){
		obj.enviandoDados = true;
		setTimeout(function(){obj.enviaDadosTime(grids);},500);
		
	}
	
	function enviaDadosFormGridGet(obj,grids){
		obj.enviandoDados = true;
		setTimeout(function(){obj.enviaDadosTimeGet(grids);},500);
		
	}
	
	function achaCampoCampos(nome,arr){
		for(var x = 0;x<arr.length;x++)
			if(nome == arr[x])
				return true;
		return false;
	}
	
	
	
	function criaCgiFromSpan(_280){
		
		var campos = null;
		
		if(_280["mygridDetail"] != null){
			campos = new Array();
			for(var x = 0;x<_280["mygridDetail"].length;x++){
				campos = campos.concat(_280["mygridDetail"][x].campos);
				campos.push(_280["mygridDetail"][x].campoAcao);
			}
			
		}
		
		if((_280 == null) ||(_280.tagName.toLowerCase()!="span" && _280.tagName.toLowerCase()!="fieldset")){
			throw "tentando avaliar um objeto q nao eh nem um form nem um span com id " + myform.id;
		}
		var camposForm = new Array();
		var lcamposform = _280.getElementsByTagName("INPUT");
		
		for(y = 0;y<lcamposform.length;y++){
			camposForm.push(lcamposform[y]);
		}
		
		var lcamposform = _280.getElementsByTagName("TEXTAREA");
		
		for(y = 0;y<lcamposform.length;y++){
			camposForm.push(lcamposform[y]);
		}
		
		var lcamposform = _280.getElementsByTagName("SELECT");
		
		for(y = 0;y<lcamposform.length;y++){
			camposForm.push(lcamposform[y]);
		}
		
		_280.elements = camposForm;
		
		var enc=escape;
		var _284=[];
		for(var i=0;i<_280.elements.length;i++){
			
			
			
			 var elm=_280.elements[i];
			 var name=escape(elm.name);
			
			 if (name != null && (campos == null || achaCampoCampos(name,campos))){
				 var type=elm.type.toLowerCase();
				 if(type=="select-multiple"){
					 var qtSelMultipleSelected = 0;
					 for(var j=0;j<elm.options.length;j++){
						 if(elm.options[j].selected){
							 if(qtSelMultipleSelected == 0){
								 _284.push(name+"="+(elm.options[j].value));
							 }
							 else
							 _284[_284.length-1] = _284[_284.length-1] + (", "+(elm.options[j].value));

							 qtSelMultipleSelected++;
							 
						 }
					 }
				 }else{
					 if(type == "radio" || type == "checkbox"){
						 if(elm.checked){
							 if(elm.value == "on")
								 elm.value = "1"
							 _284.push(name+"="+(elm.value));
						 }else{
							 if(type == "checkbox"){
								 _284.push(name+"=");
				 
							 }
						 }
					 }else{
						 _284.push(name+"="+(elm.value));
					 }
				 }
			 }
			 }
			 
			 
		 palavra = _284.join("&")+"&"
		 
		 
		 
		 if(_280.getAttribute("superior") != null){
			 palavra = palavra + criaCgiFromSpan(document.getElementById(_280.getAttribute("superior")));
		 }

		 return palavra;
		
	}

	
	function criaCgiFromForm(_280){
		
		if((_280 == null) ||(_280.tagName.toLowerCase()!="form")){
			return criaCgiFromSpan(_280);
		}
		var enc=escape;
		var _284=[];
		for(var i=0;i<_280.elements.length;i++){
			 var elm=_280.elements[i];
			 var name=escape(elm.name);
			 var type=elm.type.toLowerCase();
			 if(type=="select-multiple"){
				 for(var j=0;j<elm.options.length;j++){
					 if(elm.options[j].selected){
						 _284.push(name+"="+(elm.options[j].value));
					 }
				 }
			 }else{
				 if(type == "radio" || type == "checkbox"){
					 if(elm.checked){
						 if(elm.value == "on")
							 elm.value = "1"
						 _284.push(name+"="+(elm.value));
					 }else{
						 if(type == "checkbox"){
							 _284.push(name+"=");
			 
						 }
					 }
				 }else{
					 _284.push(name+"="+(elm.value));
				 }
			 }
		 }
		palavra = _284.join("&")+"&"

		return palavra;
	}			
	
	
	function criaCgiFromFormp(_280){
		
		if((!_280)||(!_280.tagName)||(!_280.tagName.toLowerCase()=="form")){
			throw("Attempted to encode a non-form element." + _280);
		}
		var enc=escape;
		var _284=[];
		for(var i=0;i<_280.elements.length;i++){
			var elm=_280.elements[i];
			var name=escape(elm.name);
			var type=elm.type.toLowerCase();
			if(type=="select-multiple"){
				for(var j=0;j<elm.options.length;j++){
					if(elm.options[j].selected){
						_284.push(name+"="+(elm.options[j].value));
					}
				}
			}else{
				if(type == "radio" || type == "checkbox"){
					if(elm.checked){
						_284.push(name+"="+(elm.value));
					}
				}else{
						_284.push(name+"="+(elm.value));
					}
				}
			}
		palavra = _284.join("&")

		return palavra;
	}			

	function meuEscape(par){
		ret = "asdf=asdf";
		marray = par.split("&");
		for(x = 0;x<marray.length;x++){
			if(marray[x] != ""){
			marray2 = marray[x].split("=");
			ret = ret + "&" + marray2[0] + "=" + escape(marray2[1]);
			}
		}
		return ret;
	}
function meuTrocaValor(par){
	var ret = "asdf=asdf";
	par = par.replaceAll("&gt;",(">"));
	par = par.replaceAll("&lt;",("<"));
	marray = par.split("&");
	for(x = 0;x<marray.length;x++){
		if(marray[x] != ""){
		marray2 = marray[x].split("=");
		pal = marray2[0];
		marray2.shift();
		ret = ret + "&" + pal + "=" + trocaValor(marray2.join("="));
		}
	}
	return ret;
}


	var dataUltimoEnvioFormGridVV = -1;
	
	function formGridVV(idForm){
		
		dataUltimoEnvioFormGridVV = -1;

	
		if(document.getElementById(idForm) == null){
			console.log("Falta definir o form " + idForm);
		}
		else{
			document.getElementById(idForm).formTransacao = this;
		}
			
		
		

		
		this.trataSucesso = null;
		this.trataErro = null;
		
		this.enviandoDados = false;
		this.id = idForm;
		this.salvando = null;
		this.debug = false;
		
		
		this.vProcessaTransacao = null;
		
		
		this.configuraTransacao = function(modulo,codigo,print,retornos){
			this.vProcessaTransacao = new ProcessaTransacao(modulo,codigo,print,retornos);
		}
		
		var obj = document.getElementById(idForm);
		if(obj == null)
			return;
		
		if(obj.getAttribute("transacao") != null)
			this.configuraTransacao(obj.getAttribute("modulo"),obj.getAttribute("transacao"),false,null);// (modulo, codigoTransacao,exibeStackNoConsole,[RetornoTransacao('Funcionarios','codigo')]

		
		
		
		
		
		if(document.getElementById("salvando"+idForm) != null)
			this.salvando = "salvando"+idForm;
		
		this.processaDados = function(grids){
			if(validaReenvioGrid){
				if(dataUltimoEnvioFormGridVV == -1){
					dataUltimoEnvioFormGridVV =  new Date().getTime();
				}else{
					//TIRANDO O TIME DE RESUBMISS�O DE DADOS
					if(((new Date().getTime()) - dataUltimoEnvioFormGridVV) < 5000){
						alert("Aguarde um instante para ressubimiss�o dos dados");
						return;
					}else
						dataUltimoEnvioFormGridVV =  new Date().getTime();
				}
				
			}
			
			if(grids != null){
				var retornoSubGrid=0;
				
				for(var x = 0;x<grids.length;x++){
					if(grids[x].formDetail != null){
						retornoSubGrid = grids[x].formDetail.sincronizaGrid(true);
					}
					
					if(retornoSubGrid == -1)
						return -1;
					
					if(retornoSubGrid == -2){
						if(this.trataSucesso == null){
							for(x = 0;x<grids.length;x++){
								mgrid = grids[x];
								mgrid.reCarrega();
							}
						 }else{
							 if(this.vProcessaTransacao == null)
								 this.trataSucesso(data);
							 else
								 this.trataSucesso(data.replaceAll("sucesso",""));
		 				  }
						return -2;
					}
					
					

				}
			}
			if(this.salvando != null)
				document.getElementById(this.salvando).style.display = "";
			
			if(! this.enviandoDados){
	    		this.enviandoDados = true;

				 enviaDadosFormGrid(this,grids);
			}
		}
		
		
		this.processaDadosNow = function(grids){
			
			retornoTransacaoObj = null;
			
			if(grids != null){
				
				var retornoSubGrid=0;
				var retorno = null;
				
				var precisaContinuar = false;
				
				for(var h = 0;h<grids.length;h++){
					if(grids[h].formDetail != null){
						retornoSubGrid = grids[h].formDetail.sincronizaGrid(true);
						
						if(grids[h].formDetail.formTransacao == null || grids[h].formDetail.formTransacao.vProcessaTransacao==null)
							precisaContinuar = true;
					}
					
					
					
					if(retornoSubGrid == -1)
						return -1;
					
					
					
					if(retornoSubGrid == -2){
						if(this.trataSucesso == null){
							for(var x = 0;x<grids.length;x++){
								mgrid = grids[x];
								mgrid.reCarrega();
							}
						 }else{
							 if(this.vProcessaTransacao == null)
								 this.trataSucesso(data);
							 else
								 this.trataSucesso(data.replaceAll("sucesso",""));
		 				  }
						retorno = -2;
						}
					
					
					
					var linhaAtual = grids[h].getSelectedId();
					grids[h].grade.clearSelection();
					grids[h].grade.setUserData(linhaAtual,"changed", "1");

				}
				
				if(retorno != null && ! precisaContinuar)
					return retorno;
					
						
			}
			if(this.salvando != null)
				document.getElementById(this.salvando).style.display = "";
			
			
	    		this.enviandoDados = true;
	    		this.debug = false;

			retorno = this.enviaDadosTime(grids,false);
			
			if(this.vProcessaTransacao){
				if(retorno.substring(0,7) == "sucesso"){
					{
						retornoTransacaoObj = (eval("("+retorno.replace("sucesso","")+")"));
					
						 return retornoTransacaoObj;
						  
					}
				 }
			}else
				return retorno;
			
		}
		this.enviaDadosTime = function(grids,showSucesso){	

			if(showSucesso == null)
				showSucesso = true;
			
			lobj = this;
			globalGrids = grids;
			
			var parametro = "";
			
			// vem aqui
			try{
			
			if(grids != null)
				for(x = 0;x<grids.length;x++){	
					mgrid = grids[x];
					parametro = parametro + criaCgiObjeto(mgrid) ;;
				}
				}catch(Error){
					this.enviandoDados = false;
					if(this.trataErro != null)
						  this.trataErro(null);
					return;
				}
				


			if(this.salvando != null)
				document.getElementById(this.salvando).style.display = "";
			
			
			
		
			parametro = parametro + "&"	 + criaCgiFromForm(document.getElementById(idForm));
			
			
			
			
			parametro = parametro.replaceAll("%2B", "mentorMais");
			parametro = parametro.replaceAll("%26", "mentorEcomercial");
			
			
			if(document.getElementById(idForm).getAttribute("trocaValor") == "nao"){
				parametro = parametro;
					}
			else{
				parametro = meuTrocaValor(parametro);
				
			}

			parametro = parametro.replaceAll("mentorMais", "%2B");
			parametro = parametro.replaceAll("mentorEcomercial", "%26");
			parametro = parametro.replaceAll("%u037E",";");
			parametro = parametro.replaceAll("&gt;", "%3c");
			

	
			if(this.debug || debugaTudo)
				alert(parametro);
			if(this.vProcessaTransacao == null)
				data = bind(parametro,document.getElementById(idForm).action,"POST");
			else{
				codigoJson = JSON.stringify(this.vProcessaTransacao);
				parametro = parametro+ "&mentorProcessaTransacao=" +codigoJson;
				data = bind(parametro,"processaTransacao","POST");
			}

			this.enviandoDados = false;
			if(this.salvando != null)
				document.getElementById(this.salvando).style.display = "none";           	           	
			
			
			if(data.substring(0,7) == "sucesso"){
				if(showSucesso){
				if(this.trataSucesso == null){
					for(x = 0;x<grids.length;x++){
						mgrid = grids[x];
						mgrid.reCarrega();
					}
				 }else{
					 if(this.vProcessaTransacao == null)
						 this.trataSucesso(data);
					 else
						 this.trataSucesso(data.replaceAll("sucesso",""));
 				  }
				}
			  } else{
					if(data == "Necessita autenticar usuario")
						window.location.href = UrlNetdoc +  "/login.jsp?urlDestino="+document.URL;
					
				  if(this.trataErro != null)
					  this.trataErro(data);
				  else
					  alert(data);
				  
				  return -1;
          		}
			
			return data;
		}
		
		
		this.processaDadosGet = function(grids){
			if(! this.enviandoDados)
				 enviaDadosFormGridGet(this,grids);

		}
		
		this.enviaDadosTimeGet = function(grids){
			
			
		//alert(9)
			
			var parametro = "";

			
			if(grids != null)
				for(x = 0;x<grids.length;x++){	
					mgrid = grids[x];
					parametro = parametro + criaCgiObjeto(mgrid) ;;
				}
			if(this.salvando != null)
				document.getElementById(this.salvando).style.display = "";
			
			parametro = parametro + "&"	 + criaCgiFromForm(document.getElementById(idForm));
			
			if(this.debug)
				alert(parametro);
			
			
			data = bind(parametro,document.getElementById(idForm).action,"GET");
			this.enviandoDados = false;
			if(this.salvando != null)
					document.getElementById(lobj.salvando).style.display = "none";            	           	
			
			if(data.substring(0,7) == "sucesso"){
				if(this.trataSucesso == null){
					for(x = 0;x<grids.length;x++){
						mgrid = grids[x];
						mgrid.reCarrega();
					}
				 }else{
        			this.trataSucesso(data);
 				  }
			  } else{
					if(data == "Necessita autenticar usuario")
						window.location.href = UrlNetdoc + "/login.jsp?urlDestino="+document.URL;
		          alert(data);
          		}
		}
}


		
	
	
	function gridVV(name, mArray)
   {
		
		if(document.getElementById("salvando"+name) == null){
			sp = document.createElement("span");
			sp.style.display = "none";
			sp.id = "salvando"+name;
			sp.innerHTML = "<center>Carregando...<img src = '"+UrlNetdoc+"/imgs/pb_demoUload.gif'></center>"
			document.getElementById(name).parentNode.insertBefore(sp,document.getElementById(name))	;
		}
  // 	document.getElementById(name).innerHTML = '<span id = "salvando'+name+'" style="display:none" ><center>Carregando...<img src = "'+UrlNetdoc+'/imgs/pb_demoUload.gif"></center></span>'

   
		
		var arr = document.getElementsByTagName("span");
		var obj;
		for(z = 0;z<arr.length;z++){
			obj = arr[z];
			inicializaPopUp(obj);
		}
		
		
		this.onEnd = "final";
   	
  
   	
		
		this.detailPai = null;
   	
   	this.name = name;
   	
   	this.popup = null
   	
   	if(document.getElementById(name).getAttribute("popup") != null)
   		this.popup = document.getElementById(name).getAttribute("popup");
   	
   	
   
   	
   	this.show = function(){
   		var lobj = document.getElementById(this.name);
   		while(lobj.className != "grade2" && lobj.parentNode != null)
   			lobj = lobj.parentNode;
   		if(lobj.tagName == "TABLE")
   		lobj.style.display ="";
   		if(this.formDetail != null)
   			this.formDetail.exibeForm();
   	}
   	
   	this.hide = function(){
   		var lobj = document.getElementById(this.name);
   		while(lobj.className != "grade2" && lobj.parentNode != null)
   			lobj = lobj.parentNode;
   		if(lobj.className == "grade2")
   		lobj.style.display ="none";
   		if(this.formDetail != null && this.popyp == null)
   			this.formDetail.escondeForm();
   	}
   	
   	this.URLCarga = "";
   	
   	this.grade =  new dhtmlXGridObject( name); 
   	
   	this.grade.name = name;
   	
   	   	this.grade.grid = this;
   	
    this.primeiroCampoEditavel = 0;
    this.campoAcao = "operacao";
    this.campos= new Array();
    this.grade.attachEvent("onEditCell",doOnCellEdit);
    this.editando = false;
    this.parametrosExtras = "";
    
    this.campoConfirmaErro = "";
    
    this.valorExclusao = "E";
    this.valorInclusao = "I";
    this.valorAltera = "A";
    this.camposIndice = null;
    
    this.enviaTudo = false;
    
    this.trataErro = null;
    this.trataSucesso = null;
    
    this.valoresPadrao = new Array();
    this.urlCelulas = new Array();
    this.sizeCelulas = new Array();
    this.trataSucessoCelulas = new Array();
    this.altCelulas = new Array();    
    this.debug = false;
    
    this.aoEntrar = new Array();
    this.aoSair = new Array();
    
    this.timeout = -1;
 	this.timeoutHandler = -1;    
 	
 	tratandoErro = -1;
 	this.salvandoDados = false;
 	
 	this.linhaAtual = 0;
 	
 	this.formDetail = null;
 	
 	 	this.grade.idAtual = -1;
 	
 	 function apagaLinha(){
 		 if(this.formDetail != null)
 			 if(this.formDetail.myform.formTransacao != null){
 				this.formDetail.apagaLinha(this);
 				 return;
 			 }
 		var rId = this.grade.getSelectedId();
 		this.grade.setRowTextBold(rId);
 		this.grade.setRowTextStyle(rId, "text-decoration: line-through;color: #ff0000;");
 		this.grade.setUserData(rId,"deleted","1")
 		
 		
 		
 	}
 	 this.apagaLinha = apagaLinha;
 	
 	
 	function insereLinha2(){

 		this.grade.setEditable(true);
 		var newId = Math.random();//Date.parse(new Date());

 		this.grade.addRow(newId,this.valoresPadrao.join(","));//add empty row
 		this.grade.setUserData(newId,"new","1");//mark row as NEW
 		this.grade.showRow(newId);
 		this.grade.selectCell(this.grade.getRowIndex(newId),this.primeiroCampoEditavel,true);//put cursor into 2nd cell in new row
 		this.grade.setRowTextStyle(newId, "color: green;");
 		this.grade.editCell();
 	}
 	this.insereLinha2 = insereLinha2;
 	
function marcaSelecionadoEditado(){
		var marray = this.grade.getSelectedId().split(",");
		for(var x=0;x<this.grade.getRowsNum();x++){
			var linha = this.grade.getRowId(x);
			this.grade.setUserData(linha,"deleted", "0");
			this.grade.setUserData(linha,"changed", "0");
			this.grade.setUserData(linha,"new", "0");
		}
		for(var x=0;x<marray.length;x++){
			this.grade.setUserData(marray[x],"changed", "1");
		}
	}

this.marcaSelecionadoEditado = marcaSelecionadoEditado;


 	function readOnly(par){
 		this.grade.readOnly = par;
 	  	} 
 	
 	this.readOnly = readOnly;
    
    
    if(mArray != null){
    	
    	var limpaToolTip = new Array();
    	
    	
    	for(var i = 0;i<mArray.length;i++){
    		limpaToolTip[i] = "false";
	    }
    	
    	this.grade.enableTooltips(limpaToolTip.join(","));
    	

	    for(var i = 0;i<mArray.length;i++){
	    	this.valoresPadrao[i] = mArray[i].valorDefault;
	    }
    
    
	    this.qtCamposEnviar = 0;
	    
	    var campos = new Array();
	    for(var i = 0;i<mArray.length;i++){
	    	campos[i] = mArray[i].nomeCampo;
	    	if(campos[i] != "")
	    		this.qtCamposEnviar++;
	    }
	    this.setCampos(campos);
	    
	   
	    
	    this.grade.campos = campos;
	    
	    var cabecalho = new Array();
	    var cabecalho2 = new Array();
	    
	    for(var i = 0;i<mArray.length;i++){
	    	cabecalho[i] = mArray[i].cabecalho;
	    	cabecalho2[i] = "";
	    }
	    this.setCabecalho(cabecalho.join(","));
	    this.grade.setHeader(cabecalho.join(","));
	   
	
	    var tamanho = new Array();
	    for(var i = 0;i<mArray.length;i++){
	    	tamanho[i] = mArray[i].tamanho;
	    	if(mArray[i].tamanho==0){
	    		this.grade.colunasVisiveis[i] = false;
	    	}else{
	    		this.grade.colunasVisiveis[i] = true;
		    	
	    	}
	    }
	    
	    
	    if(this.grade.colunasVisiveis != null)
    		for(x = 0;x<this.grade.colunasVisiveis.length;x++)
    			this.grade.setColumnHidden(x, (! this.grade.colunasVisiveis[x] ));
	    
	    
	    this.setTamanho(tamanho.join(",")); 
	    this.grade.setInitWidths(tamanho.join(",")); 
	    
	    var tamanhoCampo = new Array();
	    for(var i = 0;i<mArray.length;i++){
	    	tamanhoCampo[i] = mArray[i].tamanhoCampo;
	    }
	    this.tamanhoCampo = tamanhoCampo;  
	    this.grade.tamanhoCampo = tamanhoCampo;
	    
   	    var permiteNull = new Array();
	    for(var i = 0;i<mArray.length;i++){
	    	permiteNull[i] = mArray[i].permiteNull;
	    }
	    this.permiteNull = permiteNull;   
	    this.grade.permiteNull = permiteNull;

   	    var validaDados = new Array();
	    for(var i = 0;i<mArray.length;i++){
	    	validaDados[i] = mArray[i].validaDados;
	    }
	    this.validaDados = validaDados;   
	    this.grade.validaDados = validaDados;

	    
	    var alinhamento = new Array();
	    for(var i = 0;i<mArray.length;i++){
	    	alinhamento[i] = mArray[i].alinhamento;
	    }
	    this.setAlinhamento(alinhamento.join(","));  
	    this.grade.setColAlign(alinhamento.join(","));  
	    
	    var tipoColuna = new Array();
	    var ordenamento = new Array();
	    
	    for(var i = 0;i<mArray.length;i++){
	    	tipoColuna[i] = mArray[i].tipoColuna;
	    	if(tipoColuna[i] == "moeda" || tipoColuna[i] == "inteiro" ){
	    		ordenamento[i] = "int";
	    	}else{
		    	ordenamento[i] = "str";
	    	}
	    	if(tipoColuna[i] == "dataEstatica" ){
	    		ordenamento[i] = "str_custom";
	    	}
	    }
	    
	    this.tipoColuna = tipoColuna;
	    this.grade.setColTypes(tipoColuna.join(","));
	    
	    
	    this.setTiposColuna(tipoColuna.join(","));

	    this.setColSorting(ordenamento.join(","));
	    this.grade.setColSorting(ordenamento.join(","));
	    
	    	    this.idAtual = -1;
	    
	    this.fimCargaGrid = function () {
	    	
	    
	    	  if(this.formDetail != null && this.grid.popup == null){
	    		this.formDetail.resetLine();
	    		this.formDetail.escondeForm();
	    	}
	    		
	    	
	    	if(this.idAtual!= -1){
	    		var r = this.getRowById(this.idAtual);
	    		if(r != null){
	    			this.selectRowById(this.idAtual);	
	    			if(this.grid.formDetail != null){
	    				this.grid.formDetail.populaForm();
	    			}
	    		}	    		
	    		
	    			this.idAtual = -1;
	    	}
	    	
	    	document.getElementById("salvando"+this.name).style.display = "none";
	    	
	    	if(this.colunasVisiveis != null)
	    		for(x = 0;x<this.colunasVisiveis.length;x++)
	    			this.setColumnHidden(x, (! this.colunasVisiveis[x] ));
	    	
	    	
	    	
	    	if(this.labelQt!= null){
	    		
	    		var palavra = this.getAllItemIds(",");
	    		var qt = 0;
	    		if(palavra != ""){
	    			var mArray = palavra.split(",");
	    			qt = mArray.length;
	    		}
	    		
	    		document.getElementById(this.labelQt).innerHTML = qt;
	    	}
	    }

	    this.grade.attachEvent("onEditCell",editaCelula);
	    this.grade.attachEvent("onXLE",this.fimCargaGrid);	
	    
    }
        function setCampoAcao(a){
 	   this.campoAcao = a;
 	}
 
 this.setCampoAcao = setCampoAcao;
 
 function setPrimeiroCampoEditavel(a){
	   this.primeiroCampoEditavel = a;
	}

this.setPrimeiroCampoEditavel = setPrimeiroCampoEditavel;
    
    
    function init(){
    	this.grade.init();
    	this.grade.enableDragAndDrop(true);
    }
    this.init = init;
    
    
    
    
    function carregaXML(a){
    	this.grade.clearAll();
    	this.URLCarga = a;
    	document.getElementById("salvando"+this.name).style.display = "";
    	try{
    		this.grade.loadXML(a);
    		//alert(a);
    	}catch(er){
    		alert("problemsa ao popular o grid com a url " + a);
    	}
    }
    this.carregaXML = carregaXML;
    
    
    this.parametros = null;
    
    function replacer(key,value)
    {
        if (key=="parametros") return undefined;
        if (key == "titulo" && (value == null || value == "")) return undefined;
        else return value;
    }
    
    this.exibindoDetail = false;
    
    function carregaVisao(parametros){
    	this.grade.clearAll();
    	a = "processaVisao?"+parametros
    	
    	document.getElementById("salvando"+this.name).style.display = "";
    	try{
    		if(this.vProcessaVisao != null){
    			this.parametros = parametros;
    			if(this.vProcessaVisao.parametros != null && this.vProcessaVisao.parametros != "")
    				this.parametros = this.parametros + "&" + this.vProcessaVisao.parametros
    			
    			codigoJson = JSON.stringify(this.vProcessaVisao,replacer);
    			a = a + "&mentorProcessaVisao=" + codigoJson;
    			this.carregaXMLpalavra(this.parametros + "&mentorProcessaVisao=" + codigoJson, "processaVisao");
    		}
    		else{
    			this.grade.loadXML(a);	
    		}
    		
    		//window.location.href = (a);
    		
    		
    		
    		this.URLCarga = a;
    		
    		
    		
    	}catch(er){
    		alert("problemsa ao popular o grid com a url " + a);
    		throw er;
    	}
    }
    this.carregaVisao = carregaVisao;
    
    
 function carregaVisaoPdfInicio(parametros){
	 
	 if(this.grade.getRowsNum()==0)
		 {
		 alert("Sem Dados para gerar o Relat�rio.");
		 return;
		 }
    	
    	colunasReportPdf = new Array()
    	
    	palavra = "";
    		
    	for(x = 0;x<( mArray.length);x++)
    		if(mArray[x].cabecalho != "" && mArray[x].vLinhaVisao != null && mArray[x].vLinhaVisao.tipo != null){
    			colunasReportPdf[x] = 0;
    			palavra = palavra + "<div class=\"colunaRelatorio\"><input type = checkbox  onClick = 'setacolunareportpdf(this,"+x+")' >" + mArray[x].cabecalho + "</div>";
    		}
       		else
    			colunasReportPdf[x] = 0;
    	
    	var destino = document.getElementById("destinopopEnvioGridPdf");
    	destino.setAttribute("parametros", parametros);
    	destino.setAttribute("tabela", this);
    	
    	tabelaReportPdf = this;
    	
    	subreportsPdf = null;
    	
    	palavra = palavra;
    	
    	if(this.formDetail.getSubgrids() != null){
    		
    		subreportsPdf  = new Array();
    		
    		
    		for(i = 0;i<(this.formDetail.getSubgrids().length);i++){
    			
    			subreportsPdf[i]
    			
    			this.vProcessaVisao.subGrids = new Array();
        		
        		var linhasSub = this.formDetail.getSubgrids()[i].vProcessaVisao.linhas;
        		var colunasReportPdfSub = new Array();
        		
        		var sub = new SubGrid(this.formDetail.getSubgrids()[i].vProcessaVisao.nomeGridReport,this.formDetail.getSubgrids()[i].vProcessaVisao.localLista,linhasSub,colunasReportPdfSub);
        		
        		subreportsPdf[i] = sub;
        		//palavra = palavra + "<div style='clear:both; border:1px solid green'>";
        		var mArraySub = this.formDetail.getSubgrids()[i].getmArray();
        		palavra = palavra + "<div style='clear:both; font-weight: bold; padding:5px'>" + this.formDetail.getSubgrids()[i].vProcessaVisao.nomeGridReport + "</div>";
        		for(x = 0;x<( mArraySub.length);x++)
            		if(mArraySub[x].cabecalho != "" && mArraySub[x].vLinhaVisao != null && mArraySub[x].vLinhaVisao.tipo != null){
            			colunasReportPdfSub[x] = 0;
            			palavra = palavra + "<div class=\"colunaRelatorio\"><input type = checkbox  onClick = 'setacolunareportpdf2(this,"+i+","+x+")' >" + mArraySub[x].cabecalho + "</div>";
            		}
               		else
            			colunasReportPdfSub[x] = 0;
        		
        		palavra = palavra +"</div>";
    			
    		}
    		
    			
    	}
    	//SubGrid(titulo,localLista,linhas,linhasRelatorio)
    	
    	destino.innerHTML = palavra;
    	popEnvioGridPdf.show();
    	
    	
    }
    this.carregaVisaoPdfInicio = carregaVisaoPdfInicio;
    
    
 function carregaVisaoPdf(parametros){
    	

		
    	
    	try{
    		if(this.vProcessaVisao != null){
    			
    			this.vProcessaVisao.subGrids = subreportsPdf;
    			
    			this.vProcessaVisao.linhasRelatorio = colunasReportPdf;
    			codigoJson = JSON.stringify(this.vProcessaVisao,replacer);
    			
/*    			a = "jsp/tst.jsp?"
    			codigoJson = (JSON.stringify(this.vProcessaVisao));
    			a = a + "&mentorProcessaVisao=" + codigoJson + "&" + this.parametros;
    			window.location.href = (a);
    			
  */  			
    			
    			if(this.parametros != null){
    				var spar = this.parametros.split("&")
    				
    				var palavra = ";"
    				
    				for(var x = 0;x<spar.length;x++){
    					var spal = spar[x].split("=");
    					palavra = palavra + "<input type = hidden name = '"+spal[0]+"' value = '"+spal[1]+"' >";
    				}
    				

    				document.getElementById("parametroProcessaVisaoPdfReport").innerHTML = palavra;
    				
    			}else{
    				document.getElementById("parametroProcessaVisaoPdfReport").innerHTML = "";
    			}
    			
    			
    			document.getElementById("conteudoProcessaVisaoPdfReport").value = codigoJson;
    			document.getElementById("formularioProcessaVisaoPdfReport").submit();
    			
    		}
    		
    	}catch(er){
    		alert("problemsa ao popular o grid com a url " + a);
    	}
    }
    this.carregaVisaoPdf = carregaVisaoPdf;
    
    function debugaVisao(parametros){
    	this.grade.clearAll();
    	a = "processaVisao?"+parametros
    	
    	document.getElementById("salvando"+this.name).style.display = "";
    	try{
    		if(this.vProcessaVisao != null){
    			codigoJson = JSON.stringify(this.vProcessaVisao,replacer);
    			a = a + "&mentorProcessaVisao=" + codigoJson;
    		}
    		
    		//window.location.href = (a);
    		
    		window.location.href = (a);
    		
    		
    	}catch(er){
    		alert("problemsa ao popular o grid com a url " + a);
    	}
    }
    this.debugaVisao = debugaVisao;
    
    function carregaXMLp(mform){
    	this.grade.clearAll();
    	myformpgridcarga = new formGridVV(mform);
    	gridCarregandoNoMomento = this;
    	myformpgridcarga.trataErro = trataCargaPostGrid;
    	myformpgridcarga.processaDados(null);
    }
    this.carregaXMLp = carregaXMLp;
    
    function carragaXMLpalavra(parametro, url){
    	this.grade.clearAll();
    	gridCarregandoNoMomento = this;
    	data = bind(parametro,url,"POST");
    	trataCargaPostGrid(data);
    }
    this.carregaXMLpalavra = carragaXMLpalavra;    
    
    function trataCargaPostGrid(palavra){
    	gridCarregandoNoMomento.grade.loadXMLString(palavra.replace("sucesso",""));
    }
    this.trataCargaPostGrid = trataCargaPostGrid
    
    
    
    
    
    function enableDragAndDrop(p){
    	this.grade.enableDragAndDrop(p);
    }
    this.enableDragAndDrop = enableDragAndDrop;
    
    function setImagePath(caminho){
    	this.grade.setImagePath(caminho);
    }
    this.setImagePath= setImagePath;
    
    function enableMultiselect(par){
    	this.grade.enableMultiselect(par);
    }
    this.enableMultiselect = enableMultiselect;
    
    function attachEvent(label, func){
    	this.grade.attachEvent(label,func);
    }
    this.attachEvent = attachEvent;    
    
    function getAllItemIds(){
    	return this.grade.getAllItemIds();
    }
    
    this.getAllItemIds = getAllItemIds;

   function getSelectedId(){
    	return this.grade.getSelectedId();
    }
    this.getSelectedId = getSelectedId;
    
    function getUserData(linha,modo){
    	return this.grade.getUserData(linha,modo);
    }
    this.getUserData = getUserData;
    
    function getRowsNum(){
    	return this.grade.getRowsNum();
    }
    this.getRowsNum = getRowsNum;
    
    function getRowId(p){
    	return this.grade.getRowId(p);
    }
    this.getRowId = getRowId;
    
    function cells(linha,coluna){
    	return this.grade.cells(linha,coluna);
    }
    
    this.cells = cells;
    
    function setUrlCelulas(a,b){
    	   if(b.indexOf("javascript") == -1 && b.indexOf("file:") == -1)
    		   this.urlCelulas[a] = b + "&codigoAleatorio=" + (Math.random()*100000);
    	    else
    		    this.urlCelulas[a] = b ;
    	   this.grade.urlCelulas[a] = this.urlCelulas[a];
    	}
    
    this.setUrlCelulas = setUrlCelulas;
    
    
    function setSizeCelulas(a,b){
 	   if(b.indexOf("javascript") == -1)
 		   this.sizeCelulas[a] = b ;
 	    else
 		    this.sizeCelulas[a] = b ;
 	  if(typeof this.grade.sizeCelulas === 'undefined')
 		  this.grade.sizeCelulas = new Array();
 	  this.grade.sizeCelulas[a] = this.sizeCelulas[a];
 	}
 
 this.setSizeCelulas = setSizeCelulas;
 
 function setTrataSucessoCelulas(a,b){

	 this.trataSucessoCelulas[a] = b ;
	  if(typeof this.grade.trataSucessoCelulas === 'undefined')
		  this.grade.trataSucessoCelulas = new Array();
	  this.grade.trataSucessoCelulas[a] = this.trataSucessoCelulas[a];
	}

this.setTrataSucessoCelulas = setTrataSucessoCelulas;
    
    
    
    function altCelulas(a,b){
 	   
 	   this.grade.altCelulas[a] = b;
 	}
 
 this.setAltCelulas = altCelulas;    
 
if(mArray != null){
	 for(var i = 0;i<mArray.length;i++){
		 mArray[i].grids(this,i);
		 
		 if(mArray[i].vurl != null)
			 this.setUrlCelulas(i,mArray[i].vurl);
		 if(mArray[i].vsize != null)
			 this.setSizeCelulas(i,mArray[i].vsize);
		 if(mArray[i].valt != null)
			 this.setAltCelulas(i,mArray[i].valt);
		 if(mArray[i].vtratas != null)
			 this.setTrataSucessoCelulas(i,mArray[i].vtratas);
		 if(mArray[i].tipoColuna=="combo"){
			 try{
			 this.populaComboDeXML(i,mArray[i].vurlcombo);
			 }catch(error){
				 alert("problemas ao popular o combo " + mArray[i].cabecalho);
			 }
		 }
	 }
 } 
    
   function editaCelula(status,linha,coluna){

	 	if(this.readOnly)
		   return false;
	   
	   
	   
    	if(status == 0){
    		this.linhaAtual = linha;
    		if(this.aoEntrar[coluna] != null){
    			return this.aoEntrar[coluna](linha);
    			}
    	}
    	if(status == 2){
    		if(this.aoSair[coluna] != null && tratandoErro == -1){
    				if(this.timeoutHandler == -1){
    					retorno = this.aoSair[coluna](linha, this.grade.cells(linha,coluna))
	    				return retorno;
    				}else{
    					clearTimeout(this.timeoutHandler);
    					this.timeoutHandler = -1;
	    				retorno =  this.aoSair[coluna](linha, this.grade.cells(linha,coluna));
	    				if (retorno)
	    					this.enviaDados(this.url);
	    				else
	    					return retorno;
    				
    				}
    			}
    	}
    	return true;
    }
    this.editaCelula = editaCelula;
    
    function setaFoco(linha,coluna) {
		setaFocoFuncao(linha,coluna,this.grade);
	}
	this.setaFoco = setaFoco;
    
    
    
    function enviaDados(url) {
    	if(tratandoErro == -1)
				enviaDadosFuncao(this,url);
	}
	this.enviaDados = enviaDados;
	
	function CelulaAoEntrar(coluna,funcao){
		this.grade.aoEntrar[coluna] = funcao;
	}
	this.CelulaAoEntrar = CelulaAoEntrar;
	
	function CelulaAoSair(coluna,funcao){
		this.grade.aoSair[coluna] = funcao;
	}
	this.CelulaAoSair = CelulaAoSair;

	function criaCgi(){
		return criaCgiObjeto(this.grade);
	}
	this.criaCgi = criaCgi;
	
	
	this.vProcessaVisao = null;
	
	
	function consiguraConsulta(modulo,visao,idLinha, localLista, nomeGridReport, visaoReport,parametros,titulo){
	
		
		this.vProcessaVisao = new ProcessaConsulta(modulo,visao,idLinha, localLista, nomeGridReport, visaoReport,parametros,titulo);
		this.vProcessaVisao.linhas = new Array();
		for(x=0;x<mArray.length;x++){
			if(mArray[x].vLinhaVisao != null){
				mArray[x].vLinhaVisao.cabecalho =  mArray[x].cabecalho;
				this.vProcessaVisao.linhas[x] = mArray[x].vLinhaVisao;	
			}
			else
				this.vProcessaVisao.linhas[x] = new LinhaConsulta("obj."+mArray[x].nomeCampo,null, mArray[x].cabecalho);
		}
	}
	this.configuraConsulta = consiguraConsulta;
	
	
	function getmArray(){
		return mArray;
	}
	this.getmArray = getmArray;
	
	
	
	var mDiv = document.getElementById(name);
   	if(mDiv.getAttribute("idLinha") != null && mDiv.getAttribute("visao") != null){
   	   	this.configuraConsulta(mDiv.getAttribute("modulo"),mDiv.getAttribute("visao"),mDiv.getAttribute("idLinha"),mDiv.getAttribute("localLista"), mDiv.getAttribute("nomeGridReport"), mDiv.getAttribute("visaoReport"),mDiv.getAttribute("parametros"), mDiv.getAttribute("titulo"));   		
   	}
	
	this.informaLabelQt = function(label){
		this.grade.labelQt = label;
		
		
    		
    		var palavra = this.getAllItemIds(",");
    		var qt = 0;
    		if(palavra != ""){
    			var mArray = palavra.split(",");
    			qt = mArray.length;
    		}
    		
    		document.getElementById(label).innerHTML = qt;
    	}
		
	
	


}


	function colunaVV(cab,tam,ali,tip,nc, valorDefault, tamanhoCampo, permiteNull, validaDados){
		this.nomeCampo = nc;
				
		this.cabecalho = cab;
		this.tamanho = tam;
		this.alinhamento = ali;
		
		this.tipoColuna = tip;
		this.valorDefault = valorDefault;
		this.tamanhoCampo = tamanhoCampo;
		this.permiteNull = permiteNull;
		this.validaDados = validaDados;
		this.valt = "falta setar o tooltip de "+cab;
		this.vurl = "falta setar a url de "+ cab;
		this.vtratas = null;
		this.vsize = "";
		this.vurlcombo = UrlNetdoc + "jsp/gridVV/combo.jsp?campo="+cab;
		
		this.vgrids = null;
		this.vindex = null;
		
		
		function fcombo(urlCombo){
			this.vurlcombo = urlCombo;
			
			if(this.vgrids != null)
				for(x = 0;x<vgrids.lengt;x++)
					vgrids[x].populaComboDeXML(vindex[x],urlCombo);
			
		}
		
		this.urlCombo = fcombo;
		
		function falt(malt){
			this.valt = malt;
			
			if(this.vgrids != null)
				for(x = 0;x<vgrids.lengt;x++)
					vgrids[x].setAltCelulas(vindex[x],malt);
			
		}
		
		this.tollTip = falt;
		
		function furl(murl){
			this.vurl = murl;
			if(this.vgrids != null)
				for(x = 0;x<vgrids.lengt;x++)
					vgrids[x].setUrlCelulas(vindex[x],murl);
		}
		
		this.url = furl;
		
		function ftratasucesso(murl){
			this.vtratas = murl;
			if(this.vgrids != null)
				for(x = 0;x<vgrids.lengt;x++)
					vgrids[x].setTrataSucessoCelulas(vindex[x],murl);
		}
		
		this.trataSucesso = ftratasucesso;
		
		function fsize(msize){
			this.vsize = msize;
			if(this.vgrids != null)
				for(x = 0;x<vgrids.lengt;x++)
					vgrids[x].setSizeCelulas(vindex[x],murl);
		}
		
		this.size = fsize;
		
		
		
		function fgrid(g,i){
			if(this.vgrids == null){
				this.vgrids = new Array();
				this.vindex = new Array();
			}
		this.vgrids[this.vgrids.length] = g;
		this.vindex[this.vindex.length] = i;
		}
		
		this.grids = fgrid;
		
		this.vLinhaVisao = null;
		function linhaConsulta(sentenca,parametro,tipo){
			if (parametro != null) parametro = parametro.replaceAll("+","%2B");
			this.vLinhaVisao = new LinhaConsulta(sentenca.replaceAll("+","%2B"),parametro, null, tipo);
		}
		this.linhaConsulta = linhaConsulta;
		
	}
	
	
	
	function formVV(formulario,grid, combos){
		
		var myform;
		
		
		
		if(document.getElementById(formulario) == null){
			console.log("Falta definir o form " + formulario);
			return;
		}
		else{
			var myform = document.getElementById(formulario);
			myform.formDetail = this;
		}
			
		if(myform["mygridDetail"]==null){
			var arr = new Array();
			myform["mygridDetail"] = arr;
		}
		myform["mygridDetail"].push(grid)
			
			
		var readOnly = null;
		if(myform.getAttribute("readOnly") != null)
			readOnly = true;

		
		this.myform = myform;
		
		var mygridPai = grid;
		
		
		var mygrid = grid.grade;
		var g = grid;
		
		var mcombos = combos;
		
		g.formDetail = this;
		
		
		var linhaAtual = -1;
		
		var newLine = false;
		
		var maiuscula = false;
		
		mygrid.formDetail = this;

		function resetLine(){
			
			linhaAtual = -1
		}
		this.resetLine = resetLine;

		
		var vabas = null;
		
		this.abas = function(pabas){
			vabas = pabas;
			this.tabas = pabas;
		}
		
		
		var erro = null;
		
		function clique(indiceLinha, indiceColuna){

			if(linhaAtual != -1 && ! newLine){
				if(sincronizaGrid() == -1 && mygridPai.popup == null){
					erro = -1;
					return erro;
				}
					
			}
			populaForm();	
			erro = null;
			newLine = false;
		}
		this.clique = clique;
		
		function upperCase(p){
			maiuscula = p	;
		}
		this.upperCase = upperCase;
		
		function getUpperCase(){
			return maiuscula;
		}
		this.getUpperCase = getUpperCase;
		
		
		
		mygrid.attachEvent("onRowSelect",this.clique);
		
		
		function reset(){
			//myform.reset();
		}
		
		this.reset = reset;
		
		function novaLinha(){
			try{
				if(sincronizaGrid(true) == -1)
					return;
			}catch (e) {
				// TODO: handle exception
				
			}
			
		//	myform.reset();

			newLine = true;
			g.insereLinha2();
			
			

			linhaAtual = mygrid.getRowId(mygrid.getRowsNum()-1);
			
		}
		this.novaLinha = novaLinha;
		
		var exibindo = false;
		
		this.tabas = null;
				
		this.escondeForm = function escondeForm(){
			myform.style.display = "none";
			exibindo = false;
			vabas = this.tabas;
			
			if(vabas != null)
				for(var ab = 0;ab<vabas.length;ab++)
					vabas[ab].style.display = "none";
			
			// botar aqui o codigo para esconder todos os subgrids
		}
		
		this.exibeForm = function exibeForm(){
			if(exibindo){

				myform.style.display = "";
				
				if(vabas != null)
					for(var ab = 0;ab<vabas.length;ab++)
						vabas[ab].style.display = "";
			}
			
			
			// botar aqui o codigo para esconder todos os subgrids
		}
		
		
		
		var camposForm = new Array();
		var campoSubGrid = null;
		
		
		var lcamposform = myform.getElementsByTagName("INPUT");
		
		for(y = 0;y<lcamposform.length;y++){
			camposForm.push(lcamposform[y]);
		}
		
		var lcamposform = myform.getElementsByTagName("TEXTAREA");
		
		for(y = 0;y<lcamposform.length;y++){
			camposForm.push(lcamposform[y]);
		}
		
		var lcamposform = myform.getElementsByTagName("SELECT");
		
		for(y = 0;y<lcamposform.length;y++){
			camposForm.push(lcamposform[y]);
		}
		
		if(camposForm[mygridPai.campoAcao]==null && mygridPai.popup == null){
			var cacao = document.createElement("input");
			cacao.type = "hidden";
			cacao.name = mygridPai.campoAcao;
			myform.appendChild(cacao);
			
			camposForm[cacao.name] = cacao;
			
		}
		
	
		
		
		var subgrids = new Array();
		
		
		function getSubgrids(){
			return subgrids;
		}
		
		this.getSubgrids = getSubgrids;
		
		for(var y = 0;y<camposForm.length;y++){
			if(camposForm[y].className == "subGrid"){
				campoSubGrid = camposForm[y];
				
				var cDestinos = camposForm[y].getAttribute("camposDestinos");
				if(cDestinos != null){
					var aDestinos = cDestinos.split("#");	
					for(var idSubGrid = 0;idSubGrid<aDestinos.length;idSubGrid++){
						var retorno = retornaSubGrid(aDestinos[idSubGrid], camposForm[y].name);
						

						if(retorno != null)
							for(var x = 0;x<retorno.length;x++){
								subgrids.push(retorno[x]);
								retorno[x].detailPai = myform.id;
							}
						
					}
				}
			}
				
			camposForm[camposForm[y].name] = camposForm[y];
			
			
			
		}
		
		
		
		
		// daqui
		
		var campos = mygrid.campos;
		for(var k = 0;k<campos.length;k++){
				y = campos[k];
				
				

				if(camposForm[y] != null){
					if(readOnly != null)
					camposForm[y].disabled = true;
					
					if(mygrid.grid.vProcessaVisao != null && k < mygrid.grid.vProcessaVisao.linhas.length){
						var novaSentenca = mygrid.grid.vProcessaVisao.linhas[k].sentenca;
						
						if(novaSentenca != null)
							camposForm[y].setAttribute("sentenca",novaSentenca.replace("obj.",""));
						
					}
					
					
					
					if(camposForm[y].getAttribute("meuLabel") != null) {
						if(camposForm[y].getAttribute("label") == null){
							
							
							
							
							
							var renderizador = document.getElementById("renderizadorLayout");
							var marcadorVolta = document.getElementById("marcadorVoltaLayout");
							var objeto = camposForm[y].parentNode.parentNode; 
							
							objeto.parentNode.insertBefore(marcadorVolta,objeto);
							renderizador.appendChild(objeto);
							
							
							var novoLabel = mygrid.grid.cabecalho[k];
							
							if(novoLabel != ""){
								camposForm[y].setAttribute("label",novoLabel);
								
							}
								
							
							if(novoLabel != null && novoLabel != ""){
								if(mygrid.grid.permiteNull[k] != null &&  ! mygrid.permiteNull[k])
									novoLabel = novoLabel + "<font color=red>*</font>";
								
								
								camposForm[y].parentNode.childNodes[0].innerHTML = (novoLabel + " : ").capitalize();
								
								var restante = camposForm[y].parentNode.childNodes[0].offsetWidth + 10;
								
								if(camposForm[y].getAttribute("popup") != null)
									restante = restante + 100;
								
								camposForm[y].style.width = "calc(100% - "+restante+"px)";
								
								marcadorVolta.parentNode.insertBefore(objeto, marcadorVolta);
								renderizador.parentNode.insertBefore(marcadorVolta, renderizador);
								
								
							}
							
						}
						
						
					}
				}
		}
		
		var primeiroCampoEditavelOriginal = null;
		var primeiroCampoEditavel = null;
		
		if(camposForm[campos[mygridPai.primeiroCampoEditavel]] != null && mygridPai.popup == null){
			primeiroCampoEditavelOriginal = camposForm[campos[mygridPai.primeiroCampoEditavel]];
			primeiroCampoEditavel = camposForm[campos[mygridPai.primeiroCampoEditavel]];
			
		}
		
		
		// ate aqui
			
			function setaLinhaAtual(linha){
			linhaAtual = linha;
		}
		this.setaLinhaAtual = setaLinhaAtual;
		
		
		var endForm = null;
		
		function setEndForm(metodo){
			endForm = metodo;
		}
		
		this.endForm = setEndForm;
		
		
		function populaForm(){

		
			if(mygrid.detailPai != null)
				myform.setAttribute(superior,mygrid.detailPai);
				
			var campos = mygrid.campos;
			
			linhaAtual = mygrid.getSelectedId();
			
			
			myform.style.display = "";
			exibindo = true;
			if(myform.getAttribute("aba")!= null){

				var vabas = myform.getAttribute("aba").split("#");
				if(vabas != null)
					for(var ab = 0;ab<vabas.length;ab++)
						vabas[ab] = document.getElementById(vabas[ab]);
				
			}
				
			
			if(vabas != null)
				for(var ab = 0;ab<vabas.length;ab++)
					vabas[ab].style.display = "";
			
			if(mygridPai.popup == null && myform.formDetail.formTransacao != null)
			if(mygrid.getUserData(linhaAtual,"new")==1 ){
				camposForm[mygridPai.campoAcao].value = "I";
			}else{
				camposForm[mygridPai.campoAcao].value = "A";
			}
			
			for(k = 0;k<campos.length;k++){
				if((campos[k] != null && campos[k] != "") || (mygrid.grid.vProcessaVisao != null && mygrid.grid.vProcessaVisao.linhas[k].sentenca != "") ){	
					y = -1;

					if(mcombos)
					for(y = 0;y<mcombos.length;y++){
						if(mcombos[y].conf.form_name == campos[k])
							mcombos[y].setComboValue(mygrid.cells(linhaAtual,k).getValue())
					}
					if(campos[k] != "")
						y = campos[k];
					else{
						for(var x = 0;x<camposForm.length;x++){
							if(camposForm[x].name != "" && camposForm[x].getAttribute("sentenca") != null && mygrid.grid.vProcessaVisao.linhas[k].sentenca != "" )
								try{
								if(camposForm[x].getAttribute("sentenca").endsWith(mygrid.grid.vProcessaVisao.linhas[k].sentenca.replace("obj.","")))
									y = x;
								}catch(err){
									;
								}
						}
					}
					if(camposForm[y] != null)
					{		
							
							if(camposForm[y].tagName == "INPUT" && camposForm[y].type == "text")
								camposForm[y].value = mygrid.cells(linhaAtual,k).getValue();
							
							if(camposForm[y].tagName == "INPUT" && camposForm[y].type == "password")
								camposForm[y].value = mygrid.cells(linhaAtual,k).getValue();								
							
							if(camposForm[y].tagName == "INPUT" && camposForm[y].type == "hidden"){
								camposForm[y].value = mygrid.cells(linhaAtual,k).getValue();	
								
								if(camposForm[y].className == "img"){
									
									if(mygrid.cells(linhaAtual,k).getValue() != ""){
										if(mygrid.cells(linhaAtual,k).getValue().indexOf("?")==-1)
											document.getElementById(camposForm[y].getAttribute("idImagem")).src = mygrid.cells(linhaAtual,k).getValue()+"?bibibibobobo="+Math.random(1000);
										else
											document.getElementById(camposForm[y].getAttribute("idImagem")).src = mygrid.cells(linhaAtual,k).getValue()+"&bibibibobobo="+Math.random(1000);
										document.getElementById(camposForm[y].getAttribute("idImagem")).style.display = "";
									}
									
								}
								
								if(camposForm[y].className == "tabela"){
									if(camposForm[y].onchange!= null)
									var myf = camposForm[y].onchange;
									if(myf == null)
										myf = camposForm[y].getAttribute("onChange");
									myf(mygrid.cells(linhaAtual,k).getValue());
								}
							}
								
							if(camposForm[y].tagName == "TEXTAREA"){
								if(mygrid.cells(linhaAtual,k).getValue() == null)
									camposForm[y].value = "";
								else
									camposForm[y].value = unescape(mygrid.cells(linhaAtual,k).getValue()).replaceAll("&lt;","<").replaceAll("&gt;",">");	

							}

							if(camposForm[y].tagName == "INPUT" && camposForm[y].type == "checkbox" ){
								if(mygrid.cells(linhaAtual,k).getValue()== 1)																
									camposForm[y].checked = true;
								else
									camposForm[y].checked = false;
							}
							
							if(camposForm[y].tagName == "SELECT"){
								for(var w = 0;w<camposForm[y].options.length;w++){
									if(camposForm[y].options[w].value ==  mygrid.cells(linhaAtual,k).getValue())
										camposForm[y].options[w].selected = true;
									else
										camposForm[y].options[w].selected = false;
									
									if(camposForm[y].onchange!= null)
									camposForm[y].onchange();
								}
							}
							
							
							if(camposForm[y].className == "subGrid"){
								{
									var cDestinos = camposForm[y].getAttribute("camposDestinos");
									if(cDestinos != null){
										var aDestinos = cDestinos.split("#");	
										for(var idSubGrid = 0;idSubGrid<aDestinos.length;idSubGrid++){
											setaSubGrid(aDestinos[idSubGrid],mygrid.cells(linhaAtual,k).getValue(), camposForm[y].name);
										}
									}
								}
							}
						
					}
				}

			}
			
			if(primeiroCampoEditavel != null){
				primeiroCampoEditavel.focus();
				primeiroCampoEditavel = this.primeiroCampoEditavelOriginal;
			} 

			if(mygridPai.popup != null){
				var mpop = eval(mygridPai.popup);
				mpop.hide();
			}
			
			if(endForm != null)
				endForm();
		}
		this.populaForm = populaForm;
		
		function setaSubGrid(id, valor,name){
			if (erro != null)
				return;
			
			var obj = document.getElementById(id);
			if(obj == null){
				alert("Nao encontrei o campo de subGrid " + id + " associado ao campo " + name );
				return;
			}
			obj.value = valor;
			
			var mform = obj;
			while(mform.formTransacao == null && mform.parentNode != null)
				mform = mform.parentNode;
			

			{
				if(mform != null)
					if(mform.style != null)
				mform.style.display = "";
				
				var cGrids = obj.getAttribute("grids");
				if(cGrids != null){
					var aGrids = cGrids.split("#");	
					for(var x = 0;x<aGrids.length;x++){
						var aGrid = aGrids[x].split(":");
						var grid = eval(aGrid[0]);
						if(aGrid[1] != null)
							grid.carregaVisao(aGrid[1]+"="+valor);
						else
							grid.carregaVisao();
						grid.show();
					}
				}
			}
				
			
			
			
			
		}
		
		
		function retornaSubGrid(id, name){
			
			var retorno = new Array();
			var obj = document.getElementById(id);
			if(obj == null){
				alert("Nao encontrei o campo de subGrid " + id + " associado ao campo " + name );
				return;
			}
			
			
			var mform = obj;
			while(mform.formTransacao == null && mform.parentNode != null)
				mform = mform.parentNode;
			
			

				
				var cGrids = obj.getAttribute("grids");
				if(cGrids != null){
					var aGrids = cGrids.split("#");	
					for(var x = 0;x<aGrids.length;x++){
						var aGrid = aGrids[x].split(":");
						var grid = eval(aGrid[0]);
						
						retorno.push(grid);
					}
				}
						
		return retorno;
		}
		
		this.getCamposForm = new function(){
			return camposForm;
		}
		
		this.getCampoId = new function(){
			return campoSubGrid;
		}
		
	function sincronizaGrid(fim){
			
// ver aqui possibelmente ignorar fim
		
		
			if(linhaAtual == -1){
				if(fim == null || fim == false)
					return -1
				else
						return
			}
			if( mygridPai.popup != null)
				return -1;
	
			
			if(readOnly != null)
				return ;
	
		
			var campos = mygrid.campos;
			
			mygrid.setUserData(linhaAtual,"changed","1");
			try{
			for(k = 0;k<campos.length;k++){
				if(campos[k] != null && campos[k] != ""){	
					

					y = campos[k];
					if(camposForm[y] != null && mygrid.getUserData(linhaAtual,"deleted") != 1) {
							
							if(		(linhaAtual != mygrid.getSelectedId() || fim != null) && 
									(!mygrid.permiteNull[k]) && 
									(
										(camposForm[y].tagName == "INPUT" && campoComBranco(camposForm[y])  ) ||
										(camposForm[y].tagName == "TEXTAREA" && camposForm[y].value.replaceAll(" ","") == "" )
									)){
								if(mygrid.validaDados[k] != null){
									alert(mygrid.validaDados[k]);
								}else{
									alert("O campo " + mygridPai.cabecalho[k] + " � de preenchimento obrigat�rio.");
								}
									mygrid.selectRowById(linhaAtual,false,false,true);
									
									
									if(camposForm[y]["mytabId"] != null){
										for(var tab = 0;tab<camposForm[y]["mytabId"].length;tab++){
											showTab(camposForm[y]["mytabId"][tab],camposForm[y]["mytabIndex"][tab]);
										}
										
									}
									
									camposForm[y].focus();
									
									
									primeiroCampoEditavel = camposForm[y];
									
									throw mygrid.validaDados[k];
								
							}
								if((linhaAtual != mygrid.getSelectedId() || fim != null) && camposForm[y].tagName == "SELECT")
								if(		(linhaAtual != mygrid.getSelectedId() || fim != null) && 
										(!mygrid.permiteNull[k]) && 
										(
											(camposForm[y].selectedIndex == -1 ||
													camposForm[y].options[camposForm[y].selectedIndex].value.replaceAll(" ","") == "")
										)){
									if(mygrid.validaDados[k] != null){
										alert(mygrid.validaDados[k]);
										mygrid.selectRowById(linhaAtual,false,false,true);
										
										camposForm[y].focus();
										throw mygrid.validaDados[k];
										
									}
							}
					}
					}
			} // fim validacao da linha
			}catch(err){
				return -1;
			}
			
			
			var temSubGrid = false;
			
			if((linhaAtual != mygrid.getSelectedId() || fim != null))
				if(myform.formDetail.formTransacao != null ){
					
					if(campoSubGrid != null && myform.formDetail.formTransacao.vProcessaTransacao != null && myform.formDetail.formTransacao.vProcessaTransacao.retornos != null){
						
						campoSubGrid.setAttribute("sentencaRetorno",myform.formDetail.formTransacao.vProcessaTransacao.retornos[0].valor);
						camposIdsSubGrids.push(campoSubGrid);
						
						camposAcaoSubGrids.push(camposForm[mygridPai.campoAcao]);
						
						gridesArepopular.push(mygrid);
						
					}
						
						
					
					if(subgrids != null && subgrids.length > 0 ){
						var retorno = (myform.formDetail.formTransacao.processaDadosNow(subgrids));	
						if(retorno == -1){
							mygrid.selectRowById(linhaAtual,false,false,true);
							return	-1;
						}else{
							if(retorno == -2){
								retorno = avaliaSentencaRetornoTransacao(myform.formDetail.formTransacao.vProcessaTransacao.retornos[0].valor);
								
								if(campoSubGrid != null)
									campoSubGrid.value = retorno;

								mygrid.setUserData(linhaAtual,"new","0");
								mygrid.setRowTextStyle(linhaAtual, "color: black;");

								temSubGrid = true;
								
								camposForm[mygridPai.campoAcao].value = "A";
								
							}else{
								
								for(var iii = 0;iii<camposIdsSubGrids.length;iii++){
									camposIdsSubGrids[iii].value = avaliaSentencaRetornoTransacao(camposIdsSubGrids[iii].getAttribute("sentencaRetorno"));
									
									camposAcaoSubGrids[iii].value = "A";
									
									gridesArepopular[iii].setUserData(linhaAtual,"new","0");
									gridesArepopular[iii].setRowTextStyle(linhaAtual, "color: black;");
								}
								
								camposIdsSubGrids = new Array();
								camposAcaoSubGrids = new Array();
								
								gridesArepopular = new Array();


								temSubGrid = true;
								
								
							}

						}
					}
					else{
						var retorno = (myform.formDetail.formTransacao.processaDadosNow(null));	
						if(retorno == -1){
							mygrid.selectRowById(linhaAtual,false,false,true);
							return	-1;
						}
						if(retorno == -2){
							
							retorno = avaliaSentencaRetornoTransacao(myform.formDetail.formTransacao.vProcessaTransacao.retornos[0].valor);
							
							if(campoSubGrid != null)
								campoSubGrid.value = retorno;

							mygrid.setUserData(linhaAtual,"new","0");
							mygrid.setRowTextStyle(linhaAtual, "color: black;");

							temSubGrid = true;
							
							camposForm[mygridPai.campoAcao].value = "A";
							
						}else{
							retorno = avaliaSentencaRetornoTransacao(myform.formDetail.formTransacao.vProcessaTransacao.retornos[0].valor);
							
							if(campoSubGrid != null)
								campoSubGrid.value = retorno;

							mygrid.setUserData(linhaAtual,"new","0");
							mygrid.setRowTextStyle(linhaAtual, "color: black;");

							temSubGrid = true;
							
							camposForm[mygridPai.campoAcao].value = "A";
						}
						
						
					}
				}
				
						
				
				for(k = 0;k<campos.length;k++){
					if(campos[k] != null && campos[k] != ""){	
						

						y = campos[k];
						if(camposForm[y] != null){
								
								
							
							if(camposForm[y].tagName == "INPUT" && camposForm[y].type == "text"){
								//alert(this.maiuscula);
								if(maiuscula)
									mygrid.cells(linhaAtual,k).setValue( camposForm[y].value.toUpperCase() );
								else
									mygrid.cells(linhaAtual,k).setValue( camposForm[y].value );
							}
							
							if(camposForm[y].tagName == "INPUT" && camposForm[y].type == "password")
								mygrid.cells(linhaAtual,k).setValue( camposForm[y].value );
							
							if(camposForm[y].tagName == "INPUT" && camposForm[y].type == "hidden")
								mygrid.cells(linhaAtual,k).setValue( camposForm[y].value );
								
							if(camposForm[y].tagName == "TEXTAREA" ){
								if(maiuscula)
									mygrid.cells(linhaAtual,k).setValue( camposForm[y].value.toUpperCase() );
								else
								mygrid.cells(linhaAtual,k).setValue( camposForm[y].value );
							}
							if(camposForm[y].tagName == "INPUT" && camposForm[y].type == "checkbox"){
								if(camposForm[y].checked)
									mygrid.cells(linhaAtual,k).setValue("1");
								else
									mygrid.cells(linhaAtual,k).setValue("0");
							}
							
							if(camposForm[y].tagName == "SELECT" && camposForm[y].selectedIndex > -1){
								mygrid.cells(linhaAtual,k).setValue(camposForm[y].options[camposForm[y].selectedIndex].value);
							}
						}
					}
				} 
				
				if(temSubGrid)
					return -2;
			
		}
		this.sincronizaGrid = sincronizaGrid;	

		
		
	function apagaLinha(grade){
			
		
		camposForm[mygridPai.campoAcao].value = "E";
		
		var enviaTudoAntes = new Array();
		
		if(subgrids != null)
			for(var x = 0;x<subgrids.length;x++){
				enviaTudoAntes[x] = subgrids[x].enviaTudo;
				subgrids[x].enviaTudo = true;
			}
				
		
		
		myform.formDetail.formTransacao.processaDadosNow(subgrids)

			
		if(subgrids != null)
			for(var x = 0;x<subgrids.length;x++){
				subgrids[x].enviaTudo = enviaTudoAntes[x];
			}
		
		grade.grade.deleteRow(linhaAtual);
		
		linhaAtual = grade.getRowsNum();
		
		if(linhaAtual  > 0){
			linhaAtual = grade.getRowId(linhaAtual-1);
			
			grade.grade.selectRowById(linhaAtual,false,false,true);	
			this.populaForm();
		}else{
			grade.reCarrega();
		}	
		}
		this.apagaLinha = apagaLinha;	
		

		
}
	
	
	function str_custom(a,b,order){    // the name of the function must be > than 5 chars
	        if (order=="asc")
	            return (convert(a) >convert(b)?1:-1);
	        else
	            return (convert(a)>convert(b)?-1:1);
	    }

	
	function convert(a){
        var palavra= a;
        if(palavra == null || palavra == "")
                return 0;
        var sPalavra = palavra.split("/");
        sPalavra[2] = sPalavra[2] + " 0:0:0"
        var sPalavra2 = sPalavra[2].split(" ");
        var sPalavra3 = sPalavra2[1].split(":");
        return ((sPalavra3[1]-0) + ((sPalavra3[0]-0)*60) + ((sPalavra[0] -0) * 60 * 24) + ((sPalavra[1] -0) * 60 * 24 * 30) + ((sPalavra2[0]-0) * 60 * 24 * 365));
}
	
	function marcaComoNova(){
 		var newId = this.grade.getSelectedId();
 		this.grade.setUserData(newId,"new","1");//mark row as NEW
 		this.grade.showRow(newId);
 		this.grade.selectCell(this.grade.getRowIndex(newId),this.primeiroCampoEditavel,true);//put cursor into 2nd cell in new row
 		this.grade.setRowTextStyle(newId, "color: green;");
 		this.grade.editCell();
 	}
	
	function RetornoTransacao(nome,valor){
		this.nome = nome;
		this.valor = valor;
	}
	
	function ProcessaTransacao(modulo,codigo,print,retornos){
		this.codigo = codigo;
		this.modulo = modulo;
		this.printStack = print;
		this.retornos = retornos;
	}
	
	
	function LinhaConsulta(nome,valor,cabecalho, tipo){
		this.sentenca = nome;
		this.parametro = valor;
		this.cabecalho = cabecalho;
		this.tipo = tipo;
	}
	
	
	function ProcessaConsulta(modulo,visao,idLinha, localLista, nomeGridReport, visaoReport,parametros,titulo){
		this.modulo = modulo;
		this.visao = visao;
		this.idLinha = idLinha;
		this.linhas = null;
		this.localLista = localLista;
		this.linhasRelatorio = null;
		this.nomeGridReport = nomeGridReport;
		if(visaoReport == null)
			this.visaoReport = 0;
		else
			this.visaoReport = visaoReport;
		
		
		this.parametros = parametros;
		this.titulo = titulo;
		
		this.subGrids = new Array();
	}
	
	
	function SubGrid(titulo,localLista,linhas,linhasRelatorio){
		
		this.titulo = titulo;
		this.localLista = localLista;
		
		this.linhas = linhas;
		this.linhasRelatorio = linhasRelatorio;
		
	}
	
	function formConsulta(idForm , idGrid,funcao){
		this.form = document.getElementById(idForm);
		

		
		
		this.idGrid = idGrid;
		this.funcao = funcao;
		
		function submit(){
			var roda = true;
			if(this.formConsulta.funcao != null ||  this.formConsulta.funcao){
				roda = this.formConsulta.funcao.call();
			}
				
			if(roda){
			var obj = eval(this.formConsulta.idGrid);
			if(this.tagName == "FORM")
				obj.carregaVisao(criaCgiFromForm(this));
			if(this.tagName == "INPUT")
				obj.carregaVisao(criaCgiFromForm(this.mform));
			return false;
			}
		}
		this.submit = submit;
		
		function submit2(){
			var roda = true;
			if(this.funcao != null ||  this.funcao){
				roda = this.funcao.call();
			}
				
			if(roda){
			var obj = eval(this.idGrid);
			if(this.form.tagName == "FORM" || this.form.tagName == "SPAN")
				obj.carregaVisao(criaCgiFromForm(this.form));
			if(this.form.tagName == "INPUT")
				obj.carregaVisao(criaCgiFromForm(this.form.mform));
			return false;
			}
		}
		this.submit2 = submit2;
		
		this.form.formConsulta = this;
		
		this.form.onsubmit = this.submit;
		
		if(this.form.tagName == "SPAN" || this.form.tagName == "FIELDSET"){
			var lcamposform = this.form.getElementsByTagName("INPUT");
			for(var x = 0;x<lcamposform.length;x++){

				if(lcamposform[x].type == "submit"){
					lcamposform[x].onclick = submit;
					lcamposform[x].formConsulta = this;
					lcamposform[x].mform = document.getElementById(idForm);

				}
			}
				
		}
	}
 	
 	this.marcaComoNova = marcaComoNova;
	
	

// layout autom�tico
 	
 	function criaColunaVV(obj){
 		var retorno = new Object();
 		var atributos = ["label","GtamanhoColuna","Galinhamento","Gtipo","name" ,"Gdefault","GpermiteNull","GmsgNull","Gurl","Gtooltip","GtamanhoImg", "GtrataSucesso", "GtrataErro"
 		       ,"Gsentenca", "GsentencaPar", "GtipoPDF", "GPrimeiroCampo"]
 		retorno.label = obj.getAttribute("label");
 		for( var x = 0;x<atributos.length;x++)
 			retorno[atributos[x]] = obj.getAttribute(atributos[x]);
 		
 		
 		
 		
 		
 		return retorno;
 	}
 	
 	
 	
function organizaCampos(objeto){
 		
  		
  		var autoLay = objeto.getAttribute("autoLayout")
  		if(autoLay != "true")
  			return;
  		
  		var renderizador = document.getElementById("renderizadorLayout");
		var marcadorVolta = document.getElementById("marcadorVoltaLayout");
		
		objeto.parentNode.insertBefore(marcadorVolta,objeto)
		
		renderizador.appendChild(objeto);
	
		var tamanhos = new Array();
		
		tamanhos["p"] = 230;
		tamanhos["m"] = 470;
		tamanhos["g"] = 710;
 		

 		var inputs = objeto.getElementsByTagName("INPUT");	
 		if(inputs != null)
 			for(x = 0;x<inputs.length;x++){
 				
 				
 				var myInput = inputs[x];
 				
 				
 				
 				if(myInput.type == "text" || myInput.type == "checkbox" || myInput.type == "password" ){
 					
 					
 					
 	 				var tamanhoLayout = myInput.getAttribute("tamanho");
 	 				if(tamanhoLayout == null)
 	 					tamanhoLayout = "p";
 	 				tamanhoLayout = tamanhoLayout.toLowerCase();
 	 				
 	 				var mdiv = document.createElement("DIV");
 	 				mdiv.className = "colunaLayout " + tamanhoLayout;
 	 				
 	 				myInput.parentNode.insertBefore(mdiv,myInput);
 	 				
 	 				var myDivLabel = document.createElement("DIV");
 	 				myDivLabel.className = "labelLayout";
 	 				myDivLabel.align = "left";
 	 				
 	 				asterisco = ""
  					if(myInput.getAttribute("*") != null)
  						asterisco = "<font color=red>*</font>";

 	 				
 	 				myDivLabel.innerHTML = ((myInput.getAttribute("label") +asterisco+ " : ").capitalize());
 	 				mdiv.appendChild(myDivLabel);
 	 				
 	 				var restante = myDivLabel.offsetWidth + 10;
 	 				
 	 				
 	 				mdiv.appendChild(myInput);
 	 				
 	 				if(myInput.getAttribute("popup") != null){
 	 					
 	 					// vem aqui
 	 					
 	 					
 	 					var myBotao = document.createElement("INPUT");
 	 					myBotao.id = "varId"+myInput.name;
 	 					myBotao.type = "button";
 	 					myBotao.className = "botaoPP";
 	 					//myBotao.value = " ... ";
 	 					myBotao.tittle = "clique para abrir";
 	 					myBotao.setAttribute("popup", myInput.getAttribute("popup"));
 	 					myBotao.onclick = abrePopUpFormLayout;
 	 					myBotao.setAttribute("criadoAutomatico","");
 	 					mdiv.appendChild(myBotao);
 	 					
 	 					restante = restante + 100;
 	 					
 	 				}
 	 				
 	 				myInput.style.width = "calc(100% - "+restante+"px)";
 	 				myInput.setAttribute("meuLabel",myDivLabel);
 					
 				}
 				if(myInput.type == "submit" || (myInput.type == "button" && myInput.getAttribute("criadoAutomatico") == null)){
 					
 					var mdiv = document.createElement("DIV");
 					var tamanhoLayout = myInput.getAttribute("tamanho");
 	 				if(tamanhoLayout == null)
 	 					tamanhoLayout = "p";
 	 				
 	 				myInput.parentNode.insertBefore(mdiv,myInput);
 	 				
 	 				mdiv.align = "right";
 	 				
 	 				
 	 				mdiv.appendChild(myInput);

 					
 				}if(myInput.type == "hidden"){
 	 				
 				}
 				
 			}

 		inputs = objeto.getElementsByTagName("SELECT");	
 		if(inputs != null)
 			for(x = 0;x<inputs.length;x++){
 				var myInput = inputs[x];
 				
 				
 				var classe = myInput.getAttribute("classe");
 				var atributo = myInput.getAttribute("atributo");
 				if(classe != null && atributo != null){
 					var metodo = "get" + atributo.capitalize() + "FormatadoLista";

 					var conteudo = bind("classe="+classe+"&metodo="+metodo,"jsp/gridVV/comboCampoListaFormatado.jsp","POST");
 					myInput.innerHTML = myInput.innerHTML + conteudo;
 				}
 				
 				
 				var visao = myInput.getAttribute("visao");
 				var valor = myInput.getAttribute("valor");
 				var texto = myInput.getAttribute("texto");
 				
 				if(visao != null && valor != null && texto != null){
 					var conteudo = bind("visao="+visao+"&valor="+valor+"&texto="+texto+"&modulo="+myInput.getAttribute("modulo"),"processaVisaoCambo","POST");
 					myInput.innerHTML = myInput.innerHTML + conteudo;
 				}
 					
 				var tamanhoLayout = myInput.getAttribute("tamanho");
 				if(tamanhoLayout == null)
 					tamanhoLayout = "p";
 				tamanhoLayout = tamanhoLayout.toLowerCase();
 				
 				var mdiv = document.createElement("DIV");
 				mdiv.className = "colunaLayout " + tamanhoLayout;
 				
 				myInput.parentNode.insertBefore(mdiv,myInput);
 				
 				var myDivLabel = document.createElement("DIV");
 				myDivLabel.className = "labelLayout";
 				myDivLabel.align = "left";
 				myDivLabel.appendChild(document.createTextNode((myInput.getAttribute("label") + " : ").capitalize()));
 				mdiv.appendChild(myDivLabel);
 				
 				
 				
 				var restante = myDivLabel.offsetWidth + 10;
	 				myInput.style.width = "calc(100% - "+restante+"px)";
 				
 				mdiv.appendChild(myInput);
 				myInput.setAttribute("meuLabel",myDivLabel);
 			}
 		
 		inputs = objeto.getElementsByTagName("TEXTAREA");	
 		if(inputs != null)
 			for(x = 0;x<inputs.length;x++){
 				var myInput = inputs[x];
 				

 				var tamanhoLayout = myInput.getAttribute("tamanho");
 				if(tamanhoLayout == null)
 					tamanhoLayout = "p";
 				tamanhoLayout = tamanhoLayout.toLowerCase();
 				
 				var mdiv = document.createElement("DIV");
 				mdiv.className = "colunaLayout " + tamanhoLayout;
 				
 				myInput.parentNode.insertBefore(mdiv,myInput);
 				
 				var myDivLabel = document.createElement("DIV");
 				myDivLabel.className = "labelLayout";
 				myDivLabel.align = "left";
 				myDivLabel.appendChild(document.createTextNode((myInput.getAttribute("label") + " : ").capitalize()));
 				mdiv.appendChild(myDivLabel);
 				
 				var restante = myDivLabel.offsetWidth + 10;
	 			myInput.style.width = "calc(100% - "+restante+"px)";
	 				
 				myInput.style.heght = "20px"
 				mdiv.appendChild(myInput);
 				myInput.setAttribute("meuLabel",myDivLabel);
 			}
 		
 		var renderizador = document.getElementById("renderizadorLayout");
		var marcadorVolta = document.getElementById("marcadorVoltaLayout");
		
		marcadorVolta.parentNode.insertBefore(objeto, marcadorVolta);
		renderizador.parentNode.insertBefore(marcadorVolta, renderizador);


		objeto.setAttribute("autoLayout","done");
 }



function criaGridInicio(objeto){


	var criaGrid = false;
	if(objeto.getAttribute("criaGrid") != null)
		criaGrid = true;

	var colunasGrid = new Array();





	var inputs = objeto.getElementsByTagName("INPUT");	
	if(inputs != null)
		for(x = 0;x<inputs.length;x++){


			var myInput = inputs[x];



			if(myInput.type == "text" || myInput.type == "checkbox" || myInput.type == "password" || myInput.type == "hidden" ){


				if(criaGrid)
					colunasGrid.push(criaColunaVV(myInput));


			}
		}

			inputs = objeto.getElementsByTagName("SELECT");	
			if(inputs != null)
				for(x = 0;x<inputs.length;x++){
					var myInput = inputs[x];

					if(criaGrid)
						colunasGrid.push(criaColunaVV(myInput));


				}

			inputs = objeto.getElementsByTagName("TEXTAREA");	
			if(inputs != null)
				for(x = 0;x<inputs.length;x++){
					var myInput = inputs[x];

					if(criaGrid)
						colunasGrid.push(criaColunaVV(myInput));


				}


			if(criaGrid)
				criarGrid(document.getElementById(objeto.getAttribute("criaGrid")),colunasGrid);

		}

function criarGrid(mDiv,colunasGrid){
	if(colunasGrid.length == 0)
		return;
	
	var colunas = new Array();
	
	var primeiroCampo = 0;
	
	var i = 0;
	
	for(var x = 0;x<colunasGrid.length;x++){
		if(colunasGrid[x].Gsentenca != null){
			var label = colunasGrid[x].label;
			if(label == null)
				label = colunasGrid[x].Gsentena;
			var tamanho = colunasGrid[x].GtamanhoColuna;
			if(tamanho == null)
				tamanho = "*";
			var alinhamento = colunasGrid[x].Galinhamento;
			if(alinhamento == null)
				alinhamento = "center";
			var tipo = colunasGrid[x].Gtipo;
			if(tipo == null)
				tipo = "ro";
			var name = colunasGrid[x].name;
			var def = colunasGrid[x].Gdefault;
			var permiteNull = colunasGrid[x].GpermiteNull;
			if(permiteNull != null || permiteNull == "false")
				permiteNull = false;
			else
				permiteNull = true;
			
			var msgNull = colunasGrid[x].GmsgNull;
			
			var sentenca = colunasGrid[x].Gsentenca;
			var sentencaPar = colunasGrid[x].GsentencaPar;
			var tipoPdf = colunasGrid[x].GtipoPDF;
			
			if(colunasGrid[x].GprimeiroCampo != null)
				primeiroCampo = i;
			
			i++;
			
			var coluna = new colunaVV(label,tamanho,alinhamento,tipo,name,def,permiteNull,msgNull);
			coluna.linhaConsulta(sentenca,sentencaPar,tipoPdf);
			
			if(colunasGrid[x].Gtooltip != null)
				coluna.tollTip(colunasGrid[x].Gtooltip);
			
			if(colunasGrid[x].Gurl != null){
				if(tipo == "combo")
					coluna.urlCombo(colunasGrid[x].Gurl);
				else
					coluna.url(colunasGrid[x].Gurl);
				
			}
					
			
			if(colunasGrid[x].GtamanhoImg != null)
				coluna.url(colunasGrid[x].GtamanhoImg);
			
			if(colunasGrid[x].GtrataSucesso != null)
				coluna.trataSucesso(colunasGrid[x].GtrataSucesso);

			
			colunas.push(coluna);
			
			
		}
	}
	
		var mygrid = new gridVV(mDiv.id,colunas);
		mygrid.setPrimeiroCampoEditavel(primeiroCampo);
		if(mDiv.getAttribute("readonly") != null)
			mygrid.readOnly(true);
		mygrid.setCampoAcao(mDiv.getAttribute("campoAcao"));
		mygrid.init();
		
		window[mDiv.getAttribute("variavel")] = mygrid;
}

function campoComBranco( campo ){
	if(campo.value.replaceAll(" ","")=="")
		return true;
	if(campo.getAttribute("mascara") != null ){
		if( campo.value == campo.getAttribute("mascara").replaceAll("9","_").replaceAll("?",""))
			return true;
		var mascara = campo.getAttribute("mascara").split("?")[0];
		if( campo.value == mascara.replaceAll("9","_"))
			return true;
	}
	
	return false;
} 

function abrePopUpFormLayout(){
	var mp = eval(this.getAttribute("popup"));
	mp.showPos(50,this.offsetTop);
}

function executaTransacao(transacao,parametros){
	return executaTransacaoModulo(null,transacao,parametros);
}

function executaTransacaoModulo(modulo,transacao,parametros){
	
	
	var lpar = parametros;
	if(lpar == null)
		lpar = "";
	if(modulo != null)
		lpar = lpar + "&moduloMentor="+modulo;
	if(transacao == null)
		return;
	else
		lpar = lpar + "&transacaoMentor="+transacao

		data = bind(lpar,"rodaTransacao","POST");


	
	if(data.substring(0,7) == "sucesso"){
		{
		
			 return (eval("("+data.replace("sucesso","")+")"));
			  
		}
	  } else{
			if(data == "Necessita autenticar usuario")
				window.location.href = UrlNetdoc +  "/login.jsp?urlDestino="+document.URL;
			
			throw(data);
		  
		 // return -1;
  		}
}


function executaTransacaoFormulario(transacao,formId){
	return executaTransacaoModuloFormulario(null,transacao,formId);
}

function executaTransacaoModuloFormulario(modulo,transacao,formId){
	
	// vem para ca
	var lpar = criaCgiFromForm(document.getElementById(formId));
	if(lpar == null)
		lpar = "";
	if(modulo != null)
		lpar = lpar + "&moduloMentor="+modulo;
	if(transacao == null)
		return;
	else
		lpar = lpar + "&transacaoMentor="+transacao

		data = bind(lpar,"rodaTransacao","POST");


	
	if(data.substring(0,7) == "sucesso"){
		{
		
			 return (eval("("+data.replace("sucesso","")+")"));
			  
		}
	  } else{
			if(data == "Necessita autenticar usuario")
				window.location.href = UrlNetdoc +  "/login.jsp?urlDestino="+document.URL;
			
			throw(data);
		  
		 // return -1;
  		}
}

function executaVisao(visao,parametros){
	return executaVisaoModulo(null,visao,parametros);
}

function executaVisaoModulo(modulo,visao,parametros){
	
	
	var lpar = parametros;
	if(lpar == null)
		lpar = "";
	if(modulo != null)
		lpar = lpar + "&moduloMentor="+modulo;
	if(visao == null)
		return;
	else
		lpar = lpar + "&visaoMentor="+visao

		data = bind(lpar,"rodaVisao","POST");

	return (eval("("+data+")"));
			  
}