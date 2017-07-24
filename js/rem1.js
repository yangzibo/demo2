(function(){
//           	浏览器缩放时触发
                window.onresize=function(){
                	change();
                };
                change();
                function change(){
                	var oFs=document.documentElement.clientWidth/(640/20);
//              	设置根目录字体大小；
                    document.documentElement.style.fontSize=oFs+"px";
                    
                }
             })()