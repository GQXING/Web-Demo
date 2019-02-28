//--------------生成表格------------------
    	   // document.createElement()是在对象中创建一个对象，要与appendChild() 或 insertBefore()方法联合使用。
		   // 其中，appendChild() 方法在节点的子节点列表末添加新的子节点。insertBefore() 方法在节点的子节点列表任意位置插入新的节点。
		   // 例如   
		   //          var board = document.getElementById("board");
		   //          var e =document.createElement("input");
		   //         	e.type = "button";
		   //          e.value = "这是测试加载的小例子";
		   //          var object = board.appendChild(e);
		   //      	在标签board中加载一个按钮，属性值为“这是测试加载的小例子”   
    	var creatweb= function() {
    		var bgtr=[];
    		var obackground=document.getElementById('background');
    		for (var i = 0; i <= 10; i++) {
    			bgtr[i]=document.createElement("tr"); //创建行

    	  
		   obackground.appendChild(bgtr[i]);
		   var bgtd=[];		//创建列
		   for (var j = 0; j <= 10; j++) {
		   		bgtd[j]=document.createElement('td');
		   		if (i===0 && j>0) {
		   			bgtd[j].innerHTML=j;		
		   		}
		   		if (j===0 && i>0) {
		   			bgtd[j].innerHTML=i;
		   		}

		   		bgtr[i].appendChild(bgtd[j]);

		   }     

	}
    	}
    	creatweb();




    	//----------开始对square进行操作--------
    	//首先解决go
    	var oinput=document.getElementsByTagName('input');
    	var osquare=document.getElementById('square');
    	var ocmd=document.getElementById('#cmd');
        //定义一个方向其值柯南为0,1,2,3，4分别表示不同方向，开始的时候使其不为其中的值。
    	var direction=6;
    	var degree=0;


  		oinput[2].onclick=function(){
    		go(degree);
    	}
    	oinput[3].onclick=function(){
    		direction=3;
    		forward(direction);
    	}
    	oinput[4].onclick=function(){

    		 direction=1;
    		forward(direction);
    	}
    	oinput[5].onclick=function(){
    		direction=2;
    		forward(direction);
    	}
        oinput[6].onclick=function(){
            if (direction!=3) {
                direction=3;
                forward(direction);
                go(degree);
            }else{
                 go(degree);
            }
            
        }
        oinput[7].onclick=function(){  
            if (direction!=1) {
                direction=1;
                forward(direction);
                go(degree);
            }else{
                
                 go(degree);
            }
            
        }
        oinput[8].onclick=function(){  
            if (direction!=2) {
                direction=2;
                forward(direction);
                go(degree);
            }else{ 
                 go(degree);
            }
            
        }
         oinput[9].onclick=function(){  
            if (direction!=4) {
                direction=4;
                forward(direction);
                go(degree);
            }else{ 
                forward(direction);
                 go(degree);
            }
            
        }
        oinput[10].onclick=function(){  
            if (direction!=0) {
                direction=0;
                forward(direction);
                go(degree);
            }else{ 
                forward(direction);
                 go(degree);
            }
            
        }
    	
    	function go(degree){
    		if (degree>=90 ||degree <=90) {
    			degree=degree%360/90;
    		}	
    		if (degree==-1) {
    			degree=3;
    			
    		}
    		if (degree==-2) {
    			degree=2;
    		}
    		if (degree==-3) {
    			degree=1;
    		}
    		switch(degree) {
    			case 3:
    				if  (parseInt(getStyle(osquare,'left'))<=50 || (parseInt(getStyle(osquare,'left'))>=500)  && (degree!=3)){
                        
    					alert("你已到达边界啦！");
    					return false;
    				}
    				osquare.style.left=parseInt(getStyle(osquare,'left'))-50+'px';
    				break;
    			case 0:
    				if (parseInt(getStyle(osquare,'top'))<=50 || (parseInt(getStyle(osquare,'top'))>=500 && (degree!=0))) {
                         alert(degree);
                        alert("dd");
    					alert("你已到达边界啦！");
    					return false;
    				}
    				osquare.style.top=parseInt(getStyle(osquare,'top'))-50+'px';
    				break;
    			case 1:
	    			if ((parseInt(getStyle(osquare,'left'))<=50 && (degree!=1) ) || parseInt(getStyle(osquare,'left'))>=500) {
                            
	    					alert("你已到达边界啦！");
	    					return false;
	    				}
    				osquare.style.left=parseInt(getStyle(osquare,'left'))+50+'px';
    				break;
    			case 2:
    				if ((parseInt(getStyle(osquare,'top'))<=50 && (degree!=2) )|| parseInt(getStyle(osquare,'top'))>=500) {
                       
    					alert("你已到达边界啦！");
    					return false;
    				}
    				osquare.style.top=parseInt(getStyle(osquare,'top'))+50+'px';
    				break;
    		}
    	}


    	function forward(direction){
  			switch(direction) {
                //方向朝向top,为了避免转的圈数过多，需要进行优化。
                case 0:
                    degree=degree%361;
                    if (degree<=360-degree) {
                        degree=0;
                        osquare.style.transform="rotate("+degree+"deg)";
                    } 
                    else{
                        degree=360;
                         osquare.style.transform="rotate("+degree+"deg)";
                    }
                    
                    break;

    			//方向向右
    			case 1:
					degree+=90;	
    				osquare.style.transform="rotate("+degree+"deg)";

    				break;
    			 //方向反方向
    			case 2:
    				degree+=180;
    				osquare.style.transform="rotate("+degree+"deg)";
    				break;
    			case 3:
    			//方向向左
    				degree-=90;	
    				osquare.style.transform="rotate("+degree+"deg)";
    				break;
                //方向始终向下，同样要进行优化
                case 4:
                    degree=degree%361;
                    if (degree<0) {
                        degree=-180;
                    } else{
                        degree=180;
                    }
                    osquare.style.transform="rotate("+degree+"deg)";
                    break;
    		}
    	}


   function getStyle(obj,attr){
	if( obj.currentStyle ){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj)[attr];
	}
}



oinput[1].onclick=function(){
		var strs=oinput[0].value;
		var	str=strs.toUpperCase();
    		if (str==oinput[2].value) {
    			go(degree);
    		
    		}else if (str==oinput[3].value) {
    			direction=3;
    			forward(direction);
    		}else if (str==oinput[4].value) {
    			direction=1;
    			forward(direction);
    		}else if (str==oinput[5].value) {
    			direction=2;
    			forward(direction);
    		}else if (str==oinput[6].value) {
                if (direction!=3) {
                direction=3;
                forward(direction);
                go(degree);
                }else{
                     go(degree);
                }
            }

            else if (str==oinput[7].value) {
                if (direction!=1) {
                direction=1;
                forward(direction);
                go(degree);
                }else{
                    
                     go(degree);
                }
            }

             else if (str==oinput[8].value) {
                     if (direction!=2) {
                    direction=2;
                    forward(direction);
                    go(degree);
                    }else{ 
                         go(degree);
                    }
             }

              else if (str==oinput[9].value) {

                     if (direction!=4) {
                    direction=4;
                    forward(direction);
                    go(degree);
                    }else{ 
                        forward(direction);
                         go(degree);
                    }
                   
             }

              else if (str==oinput[10].value) {
                     if (direction!=0) {
                        direction=0;
                        forward(direction);
                        go(degree);
                    }else{ 
                        forward(direction);
                         go(degree);
                    }
               
             }



            else{
    			alert("请输入按钮上的内容！");
    		}
    	}