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
	
	
//	var acrd=document.getElementById('card');
//	var tiJiao=document.getElementById('tanchu');
//
//	acrd.onclick=function(){
//		tiJiao.style.display='block'
//	}

$(function($){
	
	$('#card').click(function(){
		$('#tanchu').show();
	});
	$('#card1').click(function(){
		$('#tanchu').show();
	});
	$('#tanchu-background').click(function(){
		$('#tanchu').hide();
	});
	
})
	
	
	

