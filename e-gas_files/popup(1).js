/*
**************************************
* Popup v1.0                         *
* Autor: Wagner B. Soares            *
**************************************
*/

Popup = function(oRoot, width, height, minX, maxX, minY, maxY)
{
	var popup = new Object();
	

	var id = oRoot;
	// recebe a div que ser? a popup
	var win = document.getElementById(id);
	// div que ? utilizada para minimizar e maximizar
	var animate = jQuery.create("div",{},[]);
	// container do conte?do
	var container = jQuery.create("div",{"class":"container-window"},[]);
	// cabe?alho da popup
	var header = jQuery.create("span",{"class":"window-header"},[]);
	// texto do cabe?alho
	var headerText = null;
	
	width = (isNumber(width) && width > 200)? width: 200;
	height = (isNumber(height) && height > 100)? height: 100;
	
	
	var images = new Array(new Image(),new Image());
	images[0].src = "images/button-close.gif";
	images[1].src = "images/button-min.gif";
	//cria e configura o bot?o minimizar
	var buttonMin = jQuery.create("input",{"id":"minimize-"+id,"alt":"","title":"","value":"_", "type":"button"},[]);
	buttonMin.onclick = function()
	{
		jQuery(animate).animate({height:"toggle"},"slow");
	}
	//cria e configura o bot?o fechar
	var buttonClose = jQuery.create("input",{"id":"close-"+id,"alt":"","title":"","value":"X", "type":"button"},[]);
	this.buttonClose = buttonClose;
	buttonClose.onclick = function()
	{ 
		jQuery(win).animate({opacity:"hide"},"slow");
	}
	// cria o container dos bot?es
	var buttonContainer = jQuery.create("span",{"class":"window-buttons"},[]);
	jQuery(buttonContainer).append(buttonMin);
	jQuery(buttonContainer).append(buttonClose);
	
	jQuery(container).html(jQuery(win).html());
	jQuery(win).empty();
	jQuery(win).append(buttonContainer);
	jQuery(win).append(header);
	jQuery(animate).append(container);
	jQuery(win).append(animate);
	
	jQuery(win).css({"width":(width+"px"),"border":"1px solid","padding": "0px","position": "absolute","text-align": "center","background-color":"#C0C0C0","display":"none"});
					 
	jQuery(header).css({"display": "block","margin": "0px","padding": "0px","padding-left": "5px","left":"0px","line-height": "22px","text-align": "left","width":((width-5)+"px"),"height":(22+"px"),"color": "navy","font-weight": "bold","background-color":"#D3D3D3"});
						
	jQuery(buttonContainer).css({"display": "block","cursor": "move","margin": "0px","position": "absolute","left":"0px","text-align": "right","line-height": "22px","width":((width-2)+"px"),"height":(22+"px")});
								 
	jQuery("img",buttonContainer).css({"margin-right": "2px","cursor": "pointer","width": "23px","height": "23px"});
									   
	jQuery(container).css({"margin":"3px","width":((width-8)+"px"),"height":((height-29)+"px"),"text-align": "left","overflow":"auto","border":"1px solid","background-color":"#FFFFFF"});
	
	// fun??o para configurar o texto do cabe?alho da popup
	this.setTitle = function(t)
	{
		headerText = document.createTextNode(t);
		jQuery(header).empty();
		jQuery(header).append(headerText);
	};
	
	
	
	popup.getPageSize = function()
	{
		var de = document.documentElement;
		var w = window.innerWidth || self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
		var h = window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight
		arrayPageSize = new Array(w,h) 
		return arrayPageSize;
	};
	
	popup.position = function()
	{
		var pagesize = popup.getPageSize();
		jQuery(win).css({left: ((pagesize[0] - width)/2), top: ((pagesize[1]-height)/2) });
	};
	
	popup.positionPos = function(x,y)
	{
		jQuery(win).css({left: x, top: y });
		
		
		
		jQuery(win).css({zIndex:2000 });

		
	};
	
	// exibe a popup
	this.show = function()
	{
		jQuery(win).css({zIndex:2000 });

		popup.position();
		jQuery(win).animate({opacity:"show"},"slow");
		
	};
	
	this.showPos = function(x,y)
	{

		popup.positionPos(x,y);
		jQuery(win).animate({opacity:"show"},"slow");
		
	};
	
	this.hide = function()
	{
		this.buttonClose.onclick();
		
	};
	
	var Drag = {
	
	  obj : null,
	
	  init : function(oRoot,head, minX, maxX, minY, maxY)
	  {
	    var o = head;
		
		o.onmousedown  = Drag.start;
	    o.root = oRoot;
	
	    if (isNaN(parseInt(o.root.style.left  ))) o.root.style.left   = "0px";
	    if (isNaN(parseInt(o.root.style.top   ))) o.root.style.top    = "0px";
	
	    o.minX  = typeof minX != 'undefined' ? minX : null;
	    o.minY  = typeof minY != 'undefined' ? minY : null;
	    o.maxX  = typeof maxX != 'undefined' ? maxX : null;
	    o.maxY  = typeof maxY != 'undefined' ? maxY : null;
	
	    o.root.onDragStart  = new Function();
	    o.root.onDragEnd  = new Function();
	    o.root.onDrag    = new Function();
	  },
	
	  start : function(e)
	  {
	    var o = Drag.obj = this;
	    e = Drag.fixE(e);
	    o.root.style.zIndex = "2000";

	    var y = parseInt(o.root.style.top);
	    var x = parseInt(o.root.style.left);
	    o.root.onDragStart(x, y);
	
	    o.lastMouseX  = e.clientX;
	    o.lastMouseY  = e.clientY;
		
		if (o.minX != null)  o.minMouseX  = e.clientX - x + o.minX;
		if (o.maxX != null)  o.maxMouseX  = o.minMouseX + o.maxX - o.minX;
		
		if (o.minY != null)  o.minMouseY  = e.clientY - y + o.minY;
		if (o.maxY != null)  o.maxMouseY  = o.minMouseY + o.maxY - o.minY;
	
	    document.onmousemove  = Drag.drag;
	    document.onmouseup    = Drag.end;
	
	    return false;
	  },
	
	  drag : function(e)
	  {
	    e = Drag.fixE(e);
	    var o = Drag.obj;
	
	    var ey  = e.clientY;
	    var ex  = e.clientX;
	    var y = parseInt(o.root.style.top);
	    var x = parseInt(o.root.style.left);
	    var nx, ny;
	
	    if (o.minX != null) ex = Math.max(ex, o.minMouseX);
	    if (o.maxX != null) ex = Math.min(ex, o.maxMouseX);
	    if (o.minY != null) ey = Math.max(ey, o.minMouseY);
	    if (o.maxY != null) ey = Math.min(ey, o.maxMouseY);
	
	    nx = x + ((ex - o.lastMouseX) * 1);
	    ny = y + ((ey - o.lastMouseY) * 1);
	
	    Drag.obj.root.style["left"] = nx + "px";
	    Drag.obj.root.style["top"] = ny + "px";
	    Drag.obj.lastMouseX  = ex;
	    Drag.obj.lastMouseY  = ey;
	
	    Drag.obj.root.onDrag(nx, ny);
	    return false;
	  },
	
	  end : function()
	  {
	    document.onmousemove = null;
	    document.onmouseup   = null;
	    Drag.obj.root.onDragEnd(  parseInt(Drag.obj.root.style["left"]), 
	                  parseInt(Drag.obj.root.style["top"]));
	    Drag.obj.root.style.zIndex = "1990";
	    Drag.obj = null;
	  },
	
	  fixE : function(e)
	  {
	    if (typeof e == 'undefined') e = window.event;
	    if (typeof e.layerX == 'undefined') e.layerX = e.offsetX;
	    if (typeof e.layerY == 'undefined') e.layerY = e.offsetY;
	    return e;
	  }
	};
	// inicializa a popup
	this.init = function()
	{
		popup.position();
		Drag.init(win,buttonContainer, minX, maxX, minY, maxY);
	};
};