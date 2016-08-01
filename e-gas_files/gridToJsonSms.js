function EnvioSms(){
	this.mensagem = "";
	this.numeros = new Array();
}

function gridToJsonSms(){
	
	function processaJson(obj,bt,gridvv,grid,coluna,mensagem){
			
			bt.disabled = true;
			bt.style.display = "none";
			
			setTimeout(function(){obj.jsonTime(bt,gridvv,grid,coluna,mensagem);},500);
	}
	
	
	function json(bt,obj,coluna, mensagem){
		processaJson(this,bt,obj,obj.grade,coluna,mensagem);
	}
	
	function acha(item,colecao){
		for( x = 0;x<colecao.length;x++)
			if(colecao[x]==item)
				return true;
		return false;
	}
	
	function jsonTime(bt,obj,grade,coluna,mensagem){
		
		alert("jsonTIME: " +mensagem);
		bt.disabled = false;
		var indice = 0;
		
		
		
		
		for(x = 0;x<obj.campos.length;x++)
			if(obj.campos[x] == coluna.nomeCampo)
				indice = x;
		
		
		envio = new EnvioSms();
		envio.mensagem = mensagem;
		
		for(var x=0;x<grade.getRowsNum();x++){
			var linha = grade.getRowId(x);
			envio.numeros[x] = grade.cells(linha,indice).getValue();
		}		
		
		
		if(document.getElementById("jsonForm")==null){
			
			mf = document.createElement("form");
			mf.setAttribute("action", UrlNetdoc + "/jsp/gridVV/jsonSms.jsp");
			mf.setAttribute("method", "post");
			mf.setAttribute("style", "display:none");
			mf.id = "jsonForm";
			mt = document.createElement("input");
			mt.setAttribute("name", "texto");
			mt.id = "jsonText";
			mt.setAttribute("type","text");
			mf.appendChild(mt);
			bt.appendChild(mf);
		}
		document.getElementById("jsonText").value=JSON.stringify(envio) ;
		
		var myform = new formGridVV("jsonForm");
		myform.trataSucesso = sucessoEnvioSmsGrid;
		myform.debug = false;
		myform.processaDados(null);
	
		}
	
	this.json = json;
	this.jsonTime = jsonTime;
	
}


function sucessoEnvioSmsGrid(){
	alert("Sms's enviados com sucesso !");
	popEnvioSmsJSon.hide();
}