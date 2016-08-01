function Linha(){
	this.id = 0;
	this.conteudo = new Array();
}

function processaJson(obj,bt,gridvv,grid,colunas){
		
		bt.disabled = true;
		setTimeout(function(){obj.jsonTime(bt,gridvv,grid,colunas);},500);
}

function gridToJson(){
	var titulos;
	var linhas;
	
	
	function json(bt,obj,colunas){
		processaJson(this,bt,obj,obj.grade,colunas);
	}
	
	function acha(item,colecao){
		for( x = 0;x<colecao.length;x++)
			if(colecao[x]==item)
				return true;
		return false;
	}
	
	function jsonTime(bt,obj,grade,colunas){
		
		
		bt.disabled = false;
		var indice = 0;
		
		this.titulos = new Array();
		
		
		
		var cab = obj.cabecalho;
		
		for(x = 0;x<cab.length;x++)
			if(colunas == null || acha(x,colunas)){
				this.titulos[indice++] = cab[x];
	
			}
		
		
		this.linhas = new Array();
		
		var palavra = JSON.stringify(this);
		bind("texto="+palavra,  UrlNetdoc + "jsp/gridVV/inicioJson.jsp", "post");
		
		
		for(var x=0;x<grade.getRowsNum();x++){
			
			
			if(x%10==0){
				var palavra = JSON.stringify(this);
				bind("texto="+palavra,  UrlNetdoc + "jsp/gridVV/meioJson.jsp", "post");
				this.linhas = new Array();
			}
			
			
			var linha = grade.getRowId(x);
			y = this.linhas.length;
			this.linhas[y] = new Linha();
			this.linhas[y].id = x;
	
			
			indice = 0;
				for(var i = 0;i<obj.campos.length;i++){
		
					if(colunas == null || acha(i,colunas)){
						if(obj.tipoColuna[x]=="combo")
							this.linhas[y].conteudo[indice]
						if(grade.cells(linha,i).getValue() == "&nbsp;")
							this.linhas[y].conteudo[indice] = "";
						else{
								this.linhas[y].conteudo[indice] = grade.cells(linha,i).getValue();
						
							}
						if(obj.tipoColuna[i]=="combo")
							this.linhas[y].conteudo[indice] = grade.getCombo(i).get(this.linhas[y].conteudo[indice]);
						indice++;
					}
					
				}
				
		}		
		if(document.getElementById("jsonForm")==null){

			mf = document.createElement("form");
			mf.setAttribute("action", UrlNetdoc + "jsp/gridVV/json.jsp");
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
		document.getElementById("jsonText").value=JSON.stringify(this) ;
		document.getElementById("jsonForm").submit();
		}
	
	this.json = json;
	this.jsonTime = jsonTime;
	
}
