"use strict";window.__PageRuler={active:!1,el:{},elements:{toolbar:null,mask:null,ruler:null,guides:null},enable:function(){var a=this,b=this.El.createEl("link",{id:"styles",rel:"stylesheet",href:chrome.extension.getURL("content.css")+"?"+this.version});this.El.appendEl(document.head||document.body||document.documentElement,b),this.elements.toolbar=new this.el.Toolbar,this.elements.mask=new this.el.Mask,this.elements.guides=new this.el.Guides,this.elements.ruler=new this.el.Ruler(this.elements.toolbar,this.elements.guides),this.El.registerListener(window,"resize",function(){var b=document.body.getBoundingClientRect(),c=b.width,d=b.height;a.Dimensions.update(c,d)}),this.El.registerListener(window,"keydown",function(b){if(a.elements.ruler.keyMoving){var c=b.shiftKey&&10||1,d=b.ctrlKey||b.metaKey?b.altKey?"shrink":"expand":"move",e=a.elements.ruler,f={up:{move:function(){e.setTop(e.top-c,!0)},expand:function(){e.setTop(e.top-c),e.setHeight(e.height+c)},shrink:function(){0<e.height&&e.setHeight(e.height-c)}},down:{move:function(){e.setTop(e.top+c,!0)},expand:function(){e.setBottom(a.elements.ruler.bottom+c),e.setHeight(a.elements.ruler.height+c)},shrink:function(){0<e.height&&(e.setTop(e.top+c),e.setHeight(e.height-c))}},left:{move:function(){e.setLeft(a.elements.ruler.left-c,!0)},expand:function(){e.setLeft(e.left-c),e.setWidth(e.width+c)},shrink:function(){0<e.width&&e.setWidth(e.width-c)}},right:{move:function(){e.setLeft(e.left+c,!0)},expand:function(){e.setRight(e.right+c),e.setWidth(e.width+c)},shrink:function(){0<e.width&&(e.setLeft(e.left+c),e.setWidth(e.width-c))}}},g={37:"left",38:"up",39:"right",40:"down"};if(g.hasOwnProperty(b.keyCode+"")){b.preventDefault();var h=g[b.keyCode];f[h][d]()}}}),this.active=!0},disable:function(){this.elements.toolbar.unshiftPage(),this.El.removeListeners(),this.El.removeElements(),this.Dimensions.removeUpdateCallbacks(),this.elements.toolbar=null,this.elements.mask=null,this.elements.ruler=null,this.active=!1},cls:function(a,b){return a.prototype=b,a}},function(a){a.Dimensions={pageLeft:0,pageRight:document.body.scrollWidth,pageTop:0,pageBottom:document.body.scrollHeight,offsetTop:function(){return document.body.getBoundingClientRect().top+window.pageYOffset-document.documentElement.clientTop},offsetLeft:function(){return document.body.getBoundingClientRect().left+window.pageXOffset-document.documentElement.clientLeft},updateCallbacks:[],addUpdateCallback:function(a){this.updateCallbacks.push(a)},update:function(a,b){this.pageRight=a,this.pageBottom=b;for(var c=0,d=this.updateCallbacks.length;d>c;c++)this.updateCallbacks[c](this.pageRight,this.pageBottom)},removeUpdateCallbacks:function(){for(var a=0,b=this.updateCallbacks.length;b>a;a++)this.updateCallbacks[a]=null;this.updateCallbacks=[]}}}(__PageRuler),function(a){a.El={elements:[],listeners:[],createEl:function(a,b,c,d){b=b||{},b.id=!!b.id&&"page-ruler-"+b.id||"page-ruler";var e=document.createElement(a);for(var f in b)if(b.hasOwnProperty(f)){var g=b[f];"cls"===f&&(f="class"),"class"==f&&(g=g instanceof Array?"page-ruler-"+g.join(" page-ruler-"):"page-ruler-"+g),"for"==f&&(g="page-ruler-"+g),e.setAttribute(f,g)}for(var h in c=c||{},c)this.registerListener(e,h,c[h]);return d&&(e.innerText=d),this.elements.push(e),e},appendEl:function(a,b){b instanceof Array||(b=[b]);for(var c=0;c<b.length;c++)a.appendChild(b[c])},registerListener:function(a,b,c){a.addEventListener(b,c,!1),this.listeners.push({el:a,type:b,func:c})},removeListeners:function(){for(;0<this.listeners.length;){var a=this.listeners.pop();a.el.removeEventListener(a.type,a.func,!1),a=null}},removeElements:function(){for(;0<this.elements.length;){var a=this.elements.pop();a instanceof HTMLElement&&a.parentNode.removeChild(a),a=null}this.elements=[]},hasClass:function(a,b){return a.classList.contains(b)},addClass:function(a,b){a.classList.add(b)},removeClass:function(a,b){a.classList.remove(b)},getLeft:function(b){var c=b.getBoundingClientRect(),d=c.left||0,e=document.body.ownerDocument.defaultView.pageXOffset,f=a.Dimensions.offsetLeft();return d+e-f},getTop:function(b){var c=b.getBoundingClientRect(),d=c.top||0,e=document.body.ownerDocument.defaultView.pageYOffset,f=a.Dimensions.offsetTop();return d+e-f},getWidth:function(a){var b=a.getBoundingClientRect();return b.width||0},getHeight:function(a){var b=a.getBoundingClientRect();return b.height||0},getDescription:function(a,b){if(!a.tagName)throw"tagName does not exist";var c={tag:a.tagName.toLowerCase(),id:"",cls:""},d=a.tagName.toLowerCase();return c.tag=d,a.id&&(d+="#"+a.id,c.id="#"+a.id),0<a.classList.length&&(d+="."+Array.prototype.slice.call(a.classList).join("."),c.cls="."+Array.prototype.slice.call(a.classList).join(".")),b&&c||d},getParentNode:function(a){return a.parentNode},isIllegal:function(a){return 1!==a.nodeType||0<=["head","script","noscript"].indexOf(a.tagName.toLowerCase())},getChildNode:function(a){var b=null;if(a.childNodes)for(b=a.firstChild;b&&this.isIllegal(b);)b=b.nextSibling;return b&&"head"===b.tagName.toLowerCase()&&(b=document.body),b},getPreviousSibling:function(a){for(var b=a.previousElementSibling;b&&this.isIllegal(b);)b=b.previousElementSibling;return b},getNextSibling:function(a){for(var b=a.nextElementSibling;b&&this.isIllegal(b);)b=b.nextElementSibling;return b},inElement:function(a,b){for(var c=!1,d=a.parentNode;d;){if(d===b){c=!0;break}d=d.parentNode}return c}}}(__PageRuler),function(a){chrome.runtime.onMessage.addListener(function(b,c,d){switch(b.type){case"enable":a.enable();break;case"disable":a.disable();}d({success:!0})})}(__PageRuler),function(a){a.Mouse={getXY:function(b,c){var d=b.pageX,e=b.pageY;if(!c){var f=a.Dimensions.offsetLeft();d-=f;var g=a.Dimensions.offsetTop();e-=g}return{x:d,y:e}},getX:function(a){return this.getXY(a).x},getY:function(a,b){return this.getXY(a,b).y},getClientXY:function(b,c){var d=b.clientX,e=b.clientY;return c||(e-=a.elements.toolbar.height,a.elements.toolbar.elementMode&&(e-=a.elements.toolbar.elementToolbar.height)),{x:d,y:e}},getClientX:function(a){return this.getClientXY(a).x},getClientY:function(a,b){return this.getClientXY(a,b).y}}}(__PageRuler),function(a){a.Util={px:function(a){return a+"px"},locale:function(a,b){var c=chrome.i18n.getMessage(a);return"lowercase"===b?c=c.toLocaleLowerCase():"uppercase"===b?c=c.toLocaleUpperCase():void 0,c},hexToRGB:function(a,c){c=c||1;var d=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;a=a.replace(d,function(a,c,d,e){return c+c+d+d+e+e});var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a),f=parseInt(e[1],16),h=parseInt(e[2],16),g=parseInt(e[3],16);return"rgba("+f+", "+h+", "+g+", "+c+")"}}}(__PageRuler),function(a){a.el.Element=a.cls(function(b){this.dom=b;var c={width:a.El.getWidth(b),height:a.El.getHeight(b),top:a.El.getTop(b),left:a.El.getLeft(b)};a.elements.ruler.reset(c)},{dom:null})}(__PageRuler),function(a){a.el.ElementToolbar=a.cls(function(b){var c=this;this.toolbar=b,this.dom=a.El.createEl("div",{id:"element-toolbar"},{click:function(a){a.stopPropagation()},mousedown:function(a){a.stopPropagation()}}),this.els.helpContainer=this.generateHelpContainer(),this.els.elementContainer=this.generateElementContainer(),this.els.navigationContainer=this.generateNavigationContainer();var d=this.generateTrackingModeContainer();a.El.appendEl(this.dom,[this.els.helpContainer,this.els.elementContainer,this.els.navigationContainer,d]),a.El.registerListener(document,"click",function(a){a.preventDefault(),a.stopPropagation(),c.tracking&&"html"!==a.target.tagName.toLowerCase()&&(c.setTracking(!1,!0),chrome.runtime.sendMessage({action:"trackEvent",args:["Action","Element Mode Click"]}))})},{dom:null,els:{helpContainer:null,elementContainer:null,element:null,upContainer:null,up:null,downContainer:null,down:null,previousContainer:null,previous:null,nextContainer:null,next:null,navigationContainer:null,trackingContainer:null,trackingInput:null},height:30,toolbar:null,tracking:!1,element:null,show:function(){this.dom.style.setProperty("display","flex","important");var b=this.height+this.toolbar.height;this.toolbar.dom.style.setProperty("height",a.Util.px(b),"important"),this.toolbar.shiftPage(b),this.setTracking(!0,!0),chrome.runtime.sendMessage({action:"trackEvent",args:["Action","Element Toolbar","Show"]})},hide:function(){this.dom.style.removeProperty("display"),this.toolbar.dom.style.removeProperty("height"),this.toolbar.shiftPage(this.toolbar.height),this.setTracking(!1,!0),this.element=null,this.els.helpContainer.style.removeProperty("display"),this.els.elementContainer.style.setProperty("display","none","important"),this.els.navigationContainer.style.setProperty("display","none","important"),chrome.runtime.sendMessage({action:"trackEvent",args:["Action","Element Toolbar","Hide"]})},generateHelpContainer:function(){var b=a.El.createEl("div",{id:"element-toolbar-help-container",cls:["help-container","container"]},{},a.Util.locale("elementToolbarHelp"));return b},generateTagContainer:function(b){var c=a.El.createEl("div",{id:"element-toolbar-"+b}),d=a.El.createEl("span",{id:"element-toolbar-"+b+"-tag",cls:"tag"}),e=a.El.createEl("span",{id:"element-toolbar-"+b+"-id",cls:"id"}),f=a.El.createEl("span",{id:"element-toolbar-"+b+"-cls",cls:"cls"});return a.El.appendEl(c,[d,e,f]),c},generateElementContainer:function(){var b=this,c=a.El.createEl("div",{id:"element-toolbar-element-container",cls:["container","nav-container"],style:"display:none !important;"},{click:function(){b.setElement(b.element.dom),chrome.runtime.sendMessage({action:"trackEvent",args:["Action","Element Click","Element"]})}});return this.els.element=this.generateTagContainer("element"),a.El.appendEl(c,[this.els.element]),c},generateNavigationContainer:function(){var b=this,c=a.El.createEl("div",{id:"element-toolbar-navigate-container",cls:"container",style:"display:none !important;"});this.els.upContainer=a.El.createEl("div",{id:"element-toolbar-navigate-up-container",cls:"nav-container"},{click:function(){b.setElement(a.El.getParentNode(b.element.dom)),chrome.runtime.sendMessage({action:"trackEvent",args:["Action","Element Click","Parent"]})}});var d=a.El.createEl("img",{id:"element-toolbar-navigate-up-img",src:chrome.extension.getURL("images/arrow-up.png")});this.els.up=this.generateTagContainer("up"),a.El.appendEl(this.els.upContainer,[d,this.els.up]),this.els.downContainer=a.El.createEl("div",{id:"element-toolbar-navigate-down-container",cls:"nav-container"},{click:function(){b.setElement(a.El.getChildNode(b.element.dom)),chrome.runtime.sendMessage({action:"trackEvent",args:["Action","Element Click","Child"]})}});var e=a.El.createEl("img",{id:"element-toolbar-navigate-down-img",src:chrome.extension.getURL("images/arrow-down.png")});this.els.down=this.generateTagContainer("down"),a.El.appendEl(this.els.downContainer,[e,this.els.down]),this.els.previousContainer=a.El.createEl("div",{id:"element-toolbar-navigate-previous-container",cls:"nav-container"},{click:function(){b.setElement(a.El.getPreviousSibling(b.element.dom)),chrome.runtime.sendMessage({action:"trackEvent",args:["Action","Element Click","Previous"]})}});var f=a.El.createEl("img",{id:"element-toolbar-navigate-previous-img",src:chrome.extension.getURL("images/arrow-left.png")});this.els.previous=this.generateTagContainer("previous"),a.El.appendEl(this.els.previousContainer,[f,this.els.previous]),this.els.nextContainer=a.El.createEl("div",{id:"element-toolbar-navigate-next-container",cls:"nav-container"},{click:function(){b.setElement(a.El.getNextSibling(b.element.dom)),chrome.runtime.sendMessage({action:"trackEvent",args:["Action","Element Click","Next"]})}});var g=a.El.createEl("img",{id:"element-toolbar-navigate-next-img",src:chrome.extension.getURL("images/arrow-right.png")});return this.els.next=this.generateTagContainer("next"),a.El.appendEl(this.els.nextContainer,[g,this.els.next]),a.El.appendEl(c,[this.els.upContainer,this.els.downContainer,this.els.previousContainer,this.els.nextContainer]),c},generateTrackingModeContainer:function(){var b=this;this.els.trackingContainer=a.El.createEl("div",{id:"element-toolbar-tracking-mode-container",cls:"container"});var c=a.El.createEl("label",{id:"element-toolbar-tracking-mode-label",for:"element-toolbar-tracking-mode-input"},{},a.Util.locale("elementToolbarTrackingMode")),d=(navigator.language||"").split("-")[0];d&&(d="lang_"+d);var e=a.El.createEl("div",{id:"element-toolbar-tracking-mode-toggle",cls:"checkbox-toggle "+d}),f=a.El.createEl("input",{id:"element-toolbar-tracking-mode-input",type:"checkbox",checked:!0},{change:function(){b.setTracking(this.checked,!1),chrome.runtime.sendMessage({action:"trackEvent",args:["Action","Tracking Mode Element",this.checked&&"On"||"Off"]})}});this.els.trackingInput=f;var g=a.El.createEl("label",{id:"element-toolbar-tracking-mode-toggle-label",for:"element-toolbar-tracking-mode-input"}),h=a.El.createEl("div",{id:"element-toolbar-tracking-mode-label-inner",class:"inner"}),i=a.El.createEl("div",{id:"element-toolbar-tracking-mode-label-switch",class:"switch "+d});return a.El.appendEl(g,[h,i]),a.El.appendEl(e,[f,g]),a.El.appendEl(this.els.trackingContainer,[c,e]),this.els.trackingContainer},setTracking:function(a,b){this.tracking=a,a?this.toolbar.ruler.ruler.classList.add("tracking"):this.toolbar.ruler.ruler.classList.remove("tracking"),chrome.runtime.sendMessage({action:"trackEvent",args:["Action","Tracking Mode",a&&"On"||"Off"]}),b&&(this.els.trackingInput.checked=a)},setElementDescription:function(b,c,d){try{var e=a.El.getDescription(c,!0);b.querySelector(".page-ruler-tag").innerText=e.tag,b.querySelector(".page-ruler-id").innerText=e.id,b.querySelector(".page-ruler-cls").innerText=e.cls,b.title=d+": "+e.tag+e.id+e.cls}catch(a){}},setNavigation:function(b,c){var d,e,f;"up"===b?(e=this.els.upContainer,d=a.El.getParentNode(c),f=a.Util.locale("elementToolbarParentNode")):"down"===b?(e=this.els.downContainer,d=a.El.getChildNode(c),f=a.Util.locale("elementToolbarChildNode")):"previous"===b?(e=this.els.previousContainer,d=a.El.getPreviousSibling(c),f=a.Util.locale("elementToolbarPreviousSibling")):"next"===b?(e=this.els.nextContainer,d=a.El.getNextSibling(c),f=a.Util.locale("elementToolbarNextSibling")):void 0;!d||d===document.documentElement||d.id&&d.id.match(/^page\-ruler/)?e.style.setProperty("display","none","important"):(e.style.removeProperty("display"),this.setElementDescription(e,d,f))},setElement:function(b){null===this.element&&(this.els.helpContainer.style.setProperty("display","none","important"),this.els.elementContainer.style.removeProperty("display"),this.els.navigationContainer.style.removeProperty("display")),this.element=new a.el.Element(b),this.setElementDescription(this.els.element,this.element.dom,a.Util.locale("elementToolbarHighlightedElement")),this.setNavigation("up",b),this.setNavigation("down",b),this.setNavigation("previous",b),this.setNavigation("next",b),a.elements.guides.setSizes(),a.elements.ruler.show()}})}(__PageRuler),function(a){a.el.Guides=a.cls(function(){var b=this,c=["top-left","top-right","bottom-left","bottom-right"];this.dom=a.El.createEl("div",{id:"guides"}),this.dom.style.setProperty("width",a.Util.px(a.Dimensions.pageRight),"important"),this.dom.style.setProperty("height",a.Util.px(a.Dimensions.pageBottom),"important");for(var d=0,e=c.length;e>d;d++){var f=c[d],g=f.replace(/\-\w/,function(a){return a.toUpperCase().replace("-","")});this[g]=a.El.createEl("div",{id:"guide-"+f,class:["guide","guide-"+f]}),a.El.appendEl(this.dom,this[g])}a.El.appendEl(document.body,this.dom),this.setVisible(this.visible),a.Dimensions.addUpdateCallback(function(c,d){b.dom.style.setProperty("width",a.Util.px(c),"important"),b.dom.style.setProperty("height",a.Util.px(d),"important"),b.setSizes()})},{dom:null,visible:!0,topLeft:null,topRight:null,bottomLeft:null,bottomRight:null,each:function(a){a.call(this,this.topLeft),a.call(this,this.topRight),a.call(this,this.bottomLeft),a.call(this,this.bottomRight)},setColor:function(a){this.each(function(b){b.style.setProperty("border-color",a,"important")})},setSizes:function(){this.setVisible(this.visible,!1);var b=a.elements.ruler,c=b.left+1,d=a.Dimensions.pageRight-b.right+1;0>d&&(d=0);var e=b.top+1,f=a.Dimensions.pageBottom-b.bottom+1;0>f&&(f=0),this.topLeft.style.setProperty("width",a.Util.px(c),"important"),this.topLeft.style.setProperty("height",a.Util.px(e),"important"),this.topRight.style.setProperty("width",a.Util.px(d),"important"),this.topRight.style.setProperty("height",a.Util.px(e),"important"),this.bottomLeft.style.setProperty("width",a.Util.px(c),"important"),this.bottomLeft.style.setProperty("height",a.Util.px(f),"important"),this.bottomRight.style.setProperty("width",a.Util.px(d),"important"),this.bottomRight.style.setProperty("height",a.Util.px(f),"important")},hide:function(){this.dom.style.setProperty("display","none","important")},show:function(){this.dom.style.removeProperty("display")},setVisible:function(a,b){this.visible=!!a,!0===this.visible?this.show():this.hide(),b&&chrome.runtime.sendMessage({action:"setGuides",visible:this.visible})}})}(__PageRuler),function(a){a.el.Mask=a.cls(function(){var b=this;this.dom=a.El.createEl("div",{id:"mask"}),this.dom.style.setProperty("width",a.Util.px(a.Dimensions.pageRight),"important"),this.dom.style.setProperty("height",a.Util.px(a.Dimensions.pageBottom),"important"),a.El.appendEl(document.body,this.dom),a.Dimensions.addUpdateCallback(function(c,d){b.dom.style.setProperty("width",a.Util.px(c),"important"),b.dom.style.setProperty("height",a.Util.px(d),"important")}),a.El.registerListener(this.dom,"mousedown",function(){document.activeElement.blur()})},{dom:null})}(__PageRuler),function(a){a.el.Resize=a.cls(function(b,c,d){for(var f={top:!1,bottom:!1,left:!1,right:!1},e=c.split("-"),g=0,h=e.length;h>g;g++)f[e[g]]=!0;this.dom=a.El.createEl("div",{id:"resize-"+c,class:[d,c]}),a.El.registerListener(this.dom,"mousedown",function(c){var d=a.Mouse.getX(c),e=a.Mouse.getY(c);c.stopPropagation(),c.preventDefault(),b.resizingLeft=f.left,b.resizingTop=f.top,b.resizingBottom=f.bottom,b.resizingRight=f.right,f.left&&(b.resizingOffsetLeft=d-b.left),f.top&&(b.resizingOffsetTop=e-b.top),f.bottom&&(b.resizingOffsetBottom=b.bottom-e),f.right&&(b.resizingOffsetRight=b.right-d)}),a.El.registerListener(this.dom,"mouseup",function(){b.resizingLeft=!1,b.resizingTop=!1,b.resizingBottom=!1,b.resizingRight=!1,b.resizingOffsetLeft=0,b.resizingOffsetTop=0,b.resizingOffsetBottom=0,b.resizingOffsetRight=0})},{dom:null,setColor:function(a){this.dom.style.setProperty("border-color",a,"important")}})}(__PageRuler),function(a){a.el.Ruler=a.cls(function(b,c){var d=this;this.toolbar=b,this.toolbar.ruler=this,this.guides=c,this.createDom(),this.reset(),a.El.registerListener(this.ruler,"mousedown",function(a){a.stopPropagation(),a.preventDefault(),document.activeElement.blur(),d.movingLeft=!0,d.movingTop=!0}),a.El.registerListener(this.ruler,"mouseup",function(){d.movingLeft=!1,d.gapLeft=null,d.resizingLeft=!1,d.movingTop=!1,d.gapTop=null,d.resizingTop=!1,d.resizingRight=!1,d.resizingBottom=!1}),a.El.registerListener(document,"mousedown",function(b){if(!d.toolbar.elementToolbar.tracking&&"html"!==b.target.tagName.toLowerCase()){a.elements.guides.hide();var c=a.Mouse.getXY(b),e=c.x,f=c.y;b.preventDefault(),b.stopPropagation(),d.reset({left:e,top:f,width:2,height:2}),d.resizingRight=!0,d.resizingBottom=!0,d.show()}}),a.El.registerListener(document,"mouseup",function(){d.movingLeft=!1,d.movingTop=!1,d.movingRight=!1,d.movingDown=!1,d.resizingLeft=!1,d.resizingTop=!1,d.resizingRight=!1,d.resizingBottom=!1}),a.El.registerListener(document,"mousemove",function(b){if(d.toolbar.elementToolbar.tracking&&!a.El.inElement(b.target,d.toolbar.dom)){b.preventDefault(),b.stopPropagation();var c=a.Mouse.getClientXY(b,!0),e=c.x,f=c.y;a.elements.mask.dom.style.setProperty("display","none","important"),d.ruler.style.setProperty("display","none","important"),d.guides.visible&&d.guides.hide(),d.toolbar.elementToolbar.setElement(document.elementFromPoint(e,f)),a.elements.mask.dom.style.removeProperty("display"),d.ruler.style.removeProperty("display"),d.guides.visible&&d.guides.show()}else d.move(b),d.resize(b)})},{toolbar:null,ruler:null,guides:null,resizeElements:{top:null,bottom:null,left:null,right:null,topLeft:null,topRight:null,bottomLeft:null,bottomRight:null},width:0,height:0,left:0,resizingLeft:!1,resizingOffsetLeft:0,top:0,resizingTop:!1,resizingOffsetTop:0,right:0,resizingRight:!1,resizingOffsetRight:0,bottom:0,resizingBottom:!1,resizingOffsetBottom:0,movingLeft:!1,movingTop:!1,gapLeft:null,gapTop:null,keyMoving:!0,createDom:function(){var b=this;this.ruler=a.El.createEl("div");var c=a.El.createEl("div",{id:"container",class:"container"});this.resizeElements.top=new a.el.Resize(this,"top","edge"),this.resizeElements.bottom=new a.el.Resize(this,"bottom","edge"),this.resizeElements.left=new a.el.Resize(this,"left","edge"),this.resizeElements.right=new a.el.Resize(this,"right","edge"),this.resizeElements.topLeft=new a.el.Resize(this,"top-left","corner"),this.resizeElements.topRight=new a.el.Resize(this,"top-right","corner"),this.resizeElements.bottomLeft=new a.el.Resize(this,"bottom-left","corner"),this.resizeElements.bottomRight=new a.el.Resize(this,"bottom-right","corner"),a.El.appendEl(c,[this.resizeElements.top.dom,this.resizeElements.bottom.dom,this.resizeElements.left.dom,this.resizeElements.right.dom,this.resizeElements.topLeft.dom,this.resizeElements.topRight.dom,this.resizeElements.bottomLeft.dom,this.resizeElements.bottomRight.dom]),a.El.appendEl(this.ruler,c),a.El.appendEl(document.body,this.ruler),chrome.runtime.sendMessage({action:"getColor"},function(a){b.setColor(a,!1)})},show:function(){this.ruler.style.removeProperty("display")},hide:function(){this.ruler.style.setProperty("display","none","important")},setColor:function(b,c){this.ruler.style.setProperty("border-color",b,"important"),this.ruler.style.setProperty("background-color",a.Util.hexToRGB(b,.2),"important"),this.resizeElements.topLeft.setColor(b),this.resizeElements.topRight.setColor(b),this.resizeElements.bottomLeft.setColor(b),this.resizeElements.bottomRight.setColor(b),this.guides.setColor(b),this.toolbar.setColor(b),c&&chrome.runtime.sendMessage({action:"setColor",color:b})},reset:function(b){b=b||{},this.width=b.width||0,this.toolbar.setWidth(this.width),this.height=b.height||0,this.toolbar.setHeight(this.height),this.left=b.left||0,this.resizingLeft=!1,this.resizingOffsetLeft=0,this.toolbar.setLeft(this.left),this.top=b.top||0,this.resizingTop=!1,this.resizingOffsetTop=0,this.toolbar.setTop(this.top),this.right=this.left+this.width,this.resizingRight=!1,this.resizingOffsetRight=0,this.toolbar.setRight(this.right),this.bottom=this.top+this.height,this.resizingBottom=!1,this.resizingOffsetBottom=0,this.toolbar.setBottom(this.bottom),this.movingLeft=!1,this.movingTop=!1,this.gapLeft=null,this.gapTop=null,this.ruler.style.width=a.Util.px(this.width),this.ruler.style.height=a.Util.px(this.height),this.ruler.style.top=a.Util.px(this.top),this.ruler.style.left=a.Util.px(this.left),this.hide()},setLeft:function(b,c){b=parseInt(b,10),isNaN(b)?b=this.left:0>b?b=0:b>a.Dimensions.pageRight-this.width?b=a.Dimensions.pageRight-this.width:b<a.Dimensions.pageLeft&&(b=a.Dimensions.pageLeft),this.left=b,this.ruler.style.setProperty("left",a.Util.px(b),""),!0===c&&this.setRight(b+this.width),this.toolbar.setLeft(b),this.guides.setSizes()},setTop:function(b,c){b=parseInt(b,10),isNaN(b)?b=this.top:0>b?b=0:b>a.Dimensions.pageBottom+this.height?b=a.Dimensions.pageBottom-this.height:b<a.Dimensions.pageTop&&(b=a.Dimensions.pageTop),this.top=b,this.ruler.style.setProperty("top",a.Util.px(b),""),!0===c&&this.setBottom(b+this.height),this.toolbar.setTop(b),this.guides.setSizes()},setRight:function(b,c){b=parseInt(b,10),isNaN(b)?b=this.right:b<a.Dimensions.pageLeft+this.width?b=a.Dimensions.pageLeft+this.width:b>a.Dimensions.pageRight?b=a.Dimensions.pageRight:b>a.Dimensions.pageRight&&(b=a.Dimensions.pageRight,this.setLeft(b-this.width,!1)),this.right=b,!0===c&&this.setLeft(b-this.width,!1),this.toolbar.setRight(b),this.guides.setSizes()},setBottom:function(b,c){b=parseInt(b,10),isNaN(b)?b=this.bottom:b<a.Dimensions.pageTop+this.height?b=a.Dimensions.pageTop+this.height:b>a.Dimensions.pageBottom&&(b=a.Dimensions.pageBottom,this.setTop(b-this.height)),this.bottom=b,!0===c&&this.setTop(b-this.height,!1),this.toolbar.setBottom(b),this.guides.setSizes()},setGapLeft:function(a,b){(!0!==b||null===this.gapLeft&&!0===b)&&(this.gapLeft=a-this.left)},setGapTop:function(a,b){(!0!==b||null===this.gapTop&&!0===b)&&(this.gapTop=a-this.top)},moveLeft:function(b){if(this.movingLeft){var c=a.Mouse.getX(b);this.setGapLeft(c,!0),c-this.gapLeft<a.Dimensions.pageLeft?c=a.Dimensions.pageLeft+this.gapLeft:c-this.gapLeft+this.width>a.Dimensions.pageRight&&(c=a.Dimensions.pageRight-this.width+this.gapLeft),this.setLeft(c-this.gapLeft,!0)}},moveTop:function(b){if(this.movingTop){var c=a.Mouse.getY(b);this.setGapTop(c,!0),c-this.gapTop<a.Dimensions.pageTop?c=a.Dimensions.pageTop+this.gapTop:c-this.gapTop+this.height>a.Dimensions.pageBottom&&(c=a.Dimensions.pageBottom-this.height+this.gapTop),this.setTop(c-this.gapTop,!0)}},move:function(a){this.moveLeft(a),this.moveTop(a)},resizeLeft:function(b){if(this.resizingLeft){var c=a.Mouse.getX(b);c<=this.right?(c<a.Dimensions.pageLeft&&(c=a.Dimensions.pageLeft),c-=this.resizingOffsetLeft,this.setLeft(c),this.setWidth(this.right-c)):(this.resizingLeft=!1,this.resizingRight=!0,this.setLeft(this.right))}},resizeRight:function(b){if(this.resizingRight){var c=a.Mouse.getX(b);c>=this.left?(c>a.Dimensions.pageRight&&(c=a.Dimensions.pageRight),c+=this.resizingOffsetRight,this.setRight(c),this.setWidth(c-this.left)):(this.resizingLeft=!0,this.resizingRight=!1,this.setRight(this.left))}},resizeTop:function(b){if(this.resizingTop){var c=a.Mouse.getY(b);c<=this.bottom?(c<a.Dimensions.pageTop&&(c=a.Dimensions.pageTop),c-=this.resizingOffsetTop,this.setTop(c),this.setHeight(this.bottom-c)):(this.resizingTop=!1,this.resizingBottom=!0,this.setTop(this.bottom))}},resizeBottom:function(b){if(this.resizingBottom){var c=a.Mouse.getY(b);c>=this.top?(c>a.Dimensions.pageBottom&&(c=a.Dimensions.pageBottom),c+=this.resizingOffsetBottom,this.setBottom(c),this.setHeight(c-this.top)):(this.resizingTop=!0,this.resizingBottom=!1,this.setBottom(this.top))}},resize:function(a){this.resizeLeft(a),this.resizeRight(a),this.resizeTop(a),this.resizeBottom(a)},setWidth:function(b){b=parseInt(b,10),isNaN(b)?b=this.width:0>b?b=0:b+this.left>a.Dimensions.pageRight&&(b=a.Dimensions.pageRight-this.left),this.width=b,this.ruler.style.setProperty("width",a.Util.px(b),""),this.setRight(this.left+b),this.toolbar.setWidth(b),this.guides.setSizes()},setHeight:function(b){b=parseInt(b,10),isNaN(b)?b=this.height:0>b?b=0:b+this.top>a.Dimensions.pageBottom&&(b=a.Dimensions.pageBottom-this.top),this.height=b,this.ruler.style.setProperty("height",a.Util.px(b),""),this.setBottom(this.top+b),this.toolbar.setHeight(b),this.guides.setSizes()}})}(__PageRuler),function(a){a.el.Toolbar=a.cls(function(){var b=this;this.dom=a.El.createEl("div",{id:"toolbar",cls:this.position},{click:function(a){a.stopPropagation()},mousedown:function(a){a.stopPropagation()}});var c=a.El.createEl("div",{id:"toolbar-container",class:"toolbar-container"}),d=this.generateCloseContainer(),e=this.generateDockContainer(),f=this.generateHelpContainer(),g=this.generateElementModeToggleContainer(),h=this.generateDimensionsContainer(),i=this.generatePositionContainer(),j=this.generateColorContainer(),k=this.generateGuidesContainer();a.El.appendEl(c,[d,e,f,g,h,i,j,k]),this.elementToolbar=new a.el.ElementToolbar(this),a.El.appendEl(this.dom,[c,this.elementToolbar.dom]),a.El.appendEl(document.documentElement,this.dom),chrome.runtime.sendMessage({action:"getDockPosition"},function(a){b.setDockPosition(a)}),chrome.runtime.sendMessage({action:"getGuides"},function(c){a.elements.guides.setVisible(c,!1),a.elements.guides.hide(),c||(b.els.guides.checked=!1)})},{position:"top",height:30,ruler:null,dom:null,els:{},elementMode:!1,elementToolbar:null,generatePixelInput:function(b,c,d){var e=a.El.createEl("div",{id:"toolbar-"+b+"-container",cls:"px-container"}),f=a.El.createEl("label",{id:"toolbar-"+b+"-label",for:"toolbar-"+b},{},c+":");return this.els[b]=a.El.createEl("input",{id:"toolbar-"+b,type:"number",min:0,value:0,title:c.toLocaleLowerCase()}),a.El.registerListener(this.els[b],"change",d),a.El.registerListener(this.els[b],"keydown",function(a){a.shiftKey&&(38===a.keyCode||40===a.keyCode)&&(a.preventDefault(),38===a.keyCode?this.value=parseInt(this.value,10)+10:40===a.keyCode&&(this.value=parseInt(this.value,10)-10),d.call(this,a)),13===a.keyCode&&d.call(this,a)}),a.El.registerListener(this.els[b],"focus",function(){a.elements.ruler.keyMoving=!1}),a.El.registerListener(this.els[b],"blur",function(){a.elements.ruler.keyMoving=!0}),a.El.appendEl(e,[f,this.els[b]]),e},shiftPage:function(b){if(this.unshiftPage(),b=b||this.height+(this.elementMode?this.elementToolbar.height:0),"top"===this.position){var c="transform"in document.body.style?"transform":"-webkit-transform";document.body.style.setProperty(c,"translateY("+a.Util.px(b)+")","important")}else document.body.style.setProperty("margin-bottom",a.Util.px(b),"important")},unshiftPage:function(){var a="transform"in document.body.style?"transform":"-webkit-transform";document.body.style.removeProperty(a),document.body.style.removeProperty("margin-bottom")},generateElementModeToggleContainer:function(){var b=this,c=a.El.createEl("span",{id:"toolbar-element-toggle-label",style:"display:none !important;"},{},a.Util.locale("toolbarEnableElementMode")),d=a.El.createEl("img",{id:"toolbar-element-toggle-img",src:chrome.extension.getURL("images/element-mode-toggle.png")}),e=a.El.createEl("div",{id:"toolbar-element-toggle",cls:["container","element-toggle-container"]},{mouseover:function(){c.style.removeProperty("display")},mouseout:function(){!1===b.elementMode&&c.style.setProperty("display","none","important")},click:function(a){a.preventDefault(),a.stopPropagation(),!1===b.elementMode?b.showElementToolbar():b.hideElementToolbar()}});return a.El.appendEl(e,[c,d]),e},generateDimensionsContainer:function(){var b=this,c=a.El.createEl("div",{id:"toolbar-dimensions",cls:"container"}),d=this.generatePixelInput("width",a.Util.locale("toolbarWidth"),function(){b.ruler.setWidth(this.value),chrome.runtime.sendMessage({action:"trackEvent",args:["Action","Ruler Change","Width"]})}),e=this.generatePixelInput("height",a.Util.locale("toolbarHeight"),function(){b.ruler.setHeight(this.value),chrome.runtime.sendMessage({action:"trackEvent",args:["Action","Ruler Change","Height"]})});return a.El.appendEl(c,[d,e]),c},generatePositionContainer:function(){var b=this,c=a.El.createEl("div",{id:"toolbar-positions",cls:"container"}),d=this.generatePixelInput("left",a.Util.locale("toolbarLeft"),function(){b.ruler.setLeft(this.value,!0),chrome.runtime.sendMessage({action:"trackEvent",args:["Action","Ruler Change","Left"]})}),e=this.generatePixelInput("top",a.Util.locale("toolbarTop"),function(){b.ruler.setTop(this.value,!0),chrome.runtime.sendMessage({action:"trackEvent",args:["Action","Ruler Change","Top"]})}),f=this.generatePixelInput("right",a.Util.locale("toolbarRight"),function(){b.ruler.setRight(this.value,!0),chrome.runtime.sendMessage({action:"trackEvent",args:["Action","Ruler Change","Right"]})}),g=this.generatePixelInput("bottom",a.Util.locale("toolbarBottom"),function(){b.ruler.setBottom(this.value,!0),chrome.runtime.sendMessage({action:"trackEvent",args:["Action","Ruler Change","Bottom"]})});return a.El.appendEl(c,[d,e,f,g]),c},generateColorContainer:function(){var b=this,c=a.El.createEl("div",{id:"toolbar-color-container",class:"container"}),d=a.El.createEl("label",{id:"toolbar-color-label",for:"toolbar-color"},{},a.Util.locale("toolbarColor")+":");return this.els.color=a.El.createEl("input",{id:"toolbar-color",type:"color"}),a.El.registerListener(this.els.color,"change",function(a){b.ruler.setColor(a.target.value,!0)}),a.El.appendEl(c,[d,this.els.color]),c},generateGuidesContainer:function(){var b=a.El.createEl("div",{id:"toolbar-guides-container",cls:"container"}),c=a.El.createEl("label",{id:"toolbar-guides-label",for:"toolbar-guides-input"},{},a.Util.locale("toolbarGuides")+":"),d=(navigator.language||"").split("-")[0];d&&(d="lang_"+d);var e=a.El.createEl("div",{id:"toolbar-guides-toggle",cls:"checkbox-toggle "+d}),f=a.El.createEl("input",{id:"toolbar-guides-input",type:"checkbox",checked:!0},{change:function(){a.elements.guides.setVisible(this.checked,!0)}});this.els.guides=f;var g=a.El.createEl("label",{id:"toolbar-guides-toggle-label",for:"toolbar-guides-input"}),h=a.El.createEl("div",{id:"toolbar-guides-label-inner",class:"inner"}),i=a.El.createEl("div",{id:"toolbar-guides-label-switch",class:"switch "+d});return a.El.appendEl(g,[h,i]),a.El.appendEl(e,[f,g]),a.El.appendEl(b,[c,e]),b},generateCloseContainer:function(){var b=a.El.createEl("div",{id:"toolbar-close-container",class:["container","close-container"]}),c=a.El.createEl("img",{id:"toolbar-close",src:chrome.extension.getURL("images/close.png"),title:a.Util.locale("toolbarClose","lowercase")},{click:function(){chrome.runtime.sendMessage({action:"disable"})}});return a.El.appendEl(b,[c]),b},generateHelpContainer:function(){var b=a.El.createEl("div",{id:"toolbar-help-container",class:["container","help-container"]});return this.els.help=a.El.createEl("img",{id:"toolbar-help",src:chrome.extension.getURL("images/help-white.png"),title:a.Util.locale("toolbarHelp","lowercase")},{click:function(){chrome.runtime.sendMessage({action:"openHelp"})}}),a.El.appendEl(b,[this.els.help]),b},generateDockContainer:function(){var b=this,c=a.El.createEl("div",{id:"toolbar-dock-container",class:["container","dock-container"]});return this.els.dock=a.El.createEl("img",{id:"toolbar-dock",src:chrome.extension.getURL("images/dock-bottom.png"),title:a.Util.locale("toolbarDockBottom","lowercase")},{click:function(){b.setDockPosition("top"===b.position?"bottom":"top",!0)}}),a.El.appendEl(c,[this.els.dock]),c},setDockPosition:function(b,c){if("top"===b||"bottom"===b){var d="top"===b?"bottom":"top";a.El.removeClass(this.dom,"page-ruler-"+d),this.position=b,a.El.addClass(this.dom,"page-ruler-"+b),this.els.dock.setAttribute("src",chrome.extension.getURL("images/dock-"+d+".png")),this.els.dock.setAttribute("title",a.Util.locale("toolbarDock"+("top"==d?"Top":"Bottom"),"lowercase")),this.shiftPage(),c&&chrome.runtime.sendMessage({action:"setDockPosition",position:b})}},setColor:function(a){this.els.color.value=a},setWidth:function(a){this.els.width.value=parseInt(a,10)},setHeight:function(a){this.els.height.value=parseInt(a,10)},setTop:function(a){this.els.top.value=parseInt(a,10)},setBottom:function(a){this.els.bottom.value=parseInt(a,10)},setLeft:function(a){this.els.left.value=parseInt(a,10)},setRight:function(a){this.els.right.value=parseInt(a,10)},showElementToolbar:function(){this.elementMode=!0,this.elementToolbar.show(),document.getElementById("page-ruler-toolbar-element-toggle-label").innerText=a.Util.locale("toolbarDisableElementMode")},hideElementToolbar:function(){this.elementMode=!1,this.elementToolbar.hide(),document.getElementById("page-ruler-toolbar-element-toggle-label").innerText=a.Util.locale("toolbarEnableElementMode")}})}(__PageRuler);