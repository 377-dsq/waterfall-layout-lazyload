window.addEventListener('load',winLoad,false)

function winLoad(){
	var container=document.getElementById('container');
    var box=document.getElementsByClassName('box');
    var img=document.getElementsByTagName('img');
	var clientW=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth; //获取浏览器宽度
	var gaps=10;   //每个图片间间距10px
	var boxW=box[0].offsetWidth+gaps; //每一栏的宽度相等，因此使用box[0]的宽度即可代表box宽度，加上间距宽度为每一栏box占用宽度
	var cols=parseInt(clientW/boxW); //根据浏览器宽度适应列数
	imgLocation(img);  //页面加载完成即显示部分图片
	window.onscroll = function(){
		imgLocation(img); //滚动过程中动态加载图片
  };

function waterfall(ele,col,eleWidth){
	container.style.cssText='width:'+boxW*cols+'px;margin:0 auto';  //使页面居中显示
	var heightArr=[]; //记录每一列的高度
	for (var i = 0; i < ele.length; i++) {
		if (i<col) {  //第一行中top为0，每一列高度为box的offsetHeigh
			ele[i].style.position='absolute';
			ele[i].style.top=0;
			ele[i].style.left=i*eleWidth+'px';
			heightArr.push(ele[i].offsetHeight);
		}
		else{
			var minHeight=Math.min.apply(null,heightArr);  //获取列高度的最小值
			var minIndex=heightArr.indexOf(minHeight);   //获取高度最小的那一列
			ele[i].style.position='absolute';
			ele[i].style.top=minHeight+gaps+'px';
			ele[i].style.left=minIndex*eleWidth+'px';
			heightArr[minIndex]+=ele[i].offsetHeight+gaps;  //添加图片后，当前列高度加上box高度和gap高度
		}
	}
}

function imgLocation(arr){
	for (var i = 0; i < arr.length; i++) {
	var scrollTop=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
	var clientH=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
	var imgTop=getTop(arr[i]); 
	if(imgTop<scrollTop+clientH&&imgTop>scrollTop&& !arr[i].isLoad){ //判断图片是否在屏幕中
		arr[i].isLoad=true; //标记图片是否已经加载过了
		afterLoad(arr[i]);  
	}
	
	}
}

function afterLoad(obj){
	var url=obj.getAttribute('dataSrc');
	obj.src=url;  //显示图片
	waterfall(box,cols,boxW);
}

function getTop(img){
	var offsetTop=0;
	do{
		offsetTop+=img.offsetTop;
		img=img.offsetParent;
	}while(img.nodeName!='BODY');//offsetTop是相对于offserParent的，因此用offseParent
	return offsetTop;
}
}