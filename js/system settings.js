(function(win,doc){
		win.onresize=function(){
			change();	
		};
		change();
		function change(){
			
			var oFs=doc.documentElement.clientWidth/(320/20);
	

			doc.documentElement.style.fontSize=oFs+'px';	
		}	
	})(window,document);