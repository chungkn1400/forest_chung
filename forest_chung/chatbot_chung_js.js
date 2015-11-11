//mychatbot_chung_js.js a program by NGUYEN.Chung (freeware 2015)
 	var myvbuff=new Array(10000);
	var mynvert=0;var jauxvar="",auxtext="";
	//var test=112;
	var mymesh=null;var dataobj="";var myscene=null,mytexture=null;
	var imagesrc="";var mymesh1=null,mymesh2=null,mymesh3=null,mymesh4=null,bodytext=null;
	var jcrlf="\r\n";
	var patterns=[],templates=[],allwords=[],allwordspatt=[];
	patterns=mypatterns.split("\n");//alert(patterns.length);
	templates=mytemplates.split("\n");//alert(templates.length);
	allwords=mywords.split("\n");//alert(allwords.length);
	allwordspatt=mywordspatt.split("\n");//alert(allwordspatt.length);
	var iaiml=patterns.length-1;
	//alert(iaiml+"/"+patterns[iaiml-1]);
	var iallword=allwords.length-1;
	//alert(allwords[iallword-1]);
	var starpatt=[],starpatt2=[],startemp=[];
	starpatt=mystarpatt.split("\n");//alert(starpatt.length);
	starpatt2=mystarpatt2.split("\n");//alert(starpatt2.length);
	startemp=mystartemp.split("\n");//alert(startemp.length);
	var istar=starpatt.length-1;
function getiallword(text){ 
var i,j,k,l;
i=1;j=iallword;
while((j-i)>=2){
 k=parseInt(i+(j-i)/1.99);
 if(text>=allwords[k-1]){
	i=k;
 }else{
	j=k;
 }
}
if(text==allwords[i-1]){
	return i;
}
if(text==allwords[j-1]){
	return j;
}
l=text.length;
if(text==allwords[i-1].substr(0,l)){
	return -i;
}
if(text==allwords[j-1].substr(0,l)){
	return -j;
}
return 0;
} 
//alert(allwords[getiallword("ok")-1]); 
function weight(x){return Math.sqrt(Math.abs(x));}
function replaceall(text0,str1,str2){
    var text=text0;
	for(var p=0;p<100;p++){
	   if(text.indexOf(str1)<0){break;}
	   text=text.replace(str1,str2);
	   }
	return text;   
}
function formatinput(text0){
var text=text0.toLowerCase();
text=replaceall(text,"'"," ");
text=replaceall(text,","," ");
text=replaceall(text,";"," ");
text=replaceall(text,":"," ");
text=replaceall(text,"."," ");
text=replaceall(text,"!"," ");
text=replaceall(text,"("," ");
text=replaceall(text,")"," ");
text=replaceall(text,"?"," ");
text=replaceall(text,"  "," ");
text=replaceall(text,"�","e");
text=replaceall(text,"�","e");
text=replaceall(text,"�","e");
text=replaceall(text,"�","i");
text=replaceall(text,"�","o");
text=replaceall(text,"�","u");
text=replaceall(text,"�","u");
text=replaceall(text,"�","a");
text=replaceall(text,"�","a");
text=replaceall(text,"�","c");
return text.trim();
}
function formatoutput(text0){
var text=text0.toLowerCase();
//text=replaceall(text,"�","e");
//text=replaceall(text,"�","e");
//text=replaceall(text,"�","e");
text=replaceall(text,"�","i");
text=replaceall(text,"�","o");
text=replaceall(text,"�","u");
text=replaceall(text,"�","u");
text=replaceall(text,"�","a");
text=replaceall(text,"�","a");
text=replaceall(text,"�","c");
return text.trim();
}
var botsize=iaiml;
var testpattern=new Array(iaiml+1);
var testiword=new Array(iaiml+1);
var testnword=new Array(iaiml+1);
var tweight=new Array(iaiml+1);
for(var i=0;i<=iaiml;i++){tweight[i]=1;testpattern[i]=1;
    testnword[i]=0;testiword[i]=0;}
var textparse=[],iparse=0,inputword=[];
var nouttemplate=300,iouttemplate=new Array(nouttemplate);
var oldmsg="";
var testproc=0,teststar=0,starrandom=1;
function processinputstar(text0){
var i=0,j=0,k=0,l=0,p=0,n=0,nbword=0,test=0;
var msg="",outmsg="",patt="",patt2="",temp="",text="",startext="";	
text=text0;
for(i=0;i<istar;i++){
   k=starpatt[i].length;test=1;
   if(k>0){if(text.substr(0,k)!=starpatt[i]){test=0;};}
   if(test==1){
      l=starpatt2[i].length;test=1;p=text.length;
   	if(l>0){if(text.substr(p-l,l)!=starpatt2[i]){test=0;};}
   	if(test==1){
   			n=p-l-k;
   			startext=text.substr(k,n);
   			if(startext!=""){
   				testproc=1;
   				break;
   			}
   	}
   }
}
if(testproc==1){ 
	msg=startemp[i];
	msg=replaceall(msg,"/botname/","Helen");
	msg=replaceall(msg,"/date/",new Date().toDateString());
	msg=replaceall(msg,"/size/",botsize);
	msg=replaceall(msg,"/*/",startext);
	outmsg=msg;
	if(msg.indexOf("/rnd/")>=0){
		msg=replaceall(msg,"/rnd/","");
		textparse=[];
		textparse=(msg.trim()).split("/li/");
		iparse=textparse.length-1;
		outmsg=textparse[parseInt(Math.random()*iparse*0.999)+1];
		//'msg+="/"+Str(iparse)+"/";
		msg="";
	}else{
		msg="";
	}
	outmsg=replaceall(outmsg,"/br/",jcrlf);
	msg+=outmsg;
	patt=starpatt[i]+startext+starpatt2[i];
	patt=replaceall(patt,"<bot/>","Helen");
	if(outmsg.length<0.65*patt.length){
		outmsg=patt+" "+outmsg; 
	}

    oldmsg=msg;
	//printmsg(patt+jcrlf+"> "+msg);
	msg=(patt+jcrlf+"> "+msg);
}
return msg;//outmsg;
}
function processinput(text0){
var j=0,k=0,l=0,p=0,n=0,nbword=0;
var outmsg="",msg="",msg2="",allpatt="",inword="",patt="";
testproc=0;
teststar=0;
if(Math.random()<0.5*starrandom){
	teststar=1;
	starrandom=Math.max(0.12,starrandom/1.4);
	outmsg=processinputstar(text0);
	if(testproc==1){return outmsg;} 
}else{
	starrandom=Math.min(1.5,starrandom*1.1);
}textparse=[];
textparse=text0.split(" ");
iparse=textparse.length;
if(iparse<=0){return "???";} 
j=0;
for(var i=0;i<iparse;i++){ 
	inword=textparse[i];
	//j=getiallword(inword);
	//if(j=0){ 
	  //inword=LCase(getsynonym(inword))
	//}  
	inputword[i]=inword;
}
for(var i=1;i<=iaiml;i++){
	testpattern[i]=0;
	testiword[i]=-1;
	testnword[i]=0;
}
var iparse0=iparse;
nbword=iparse;
for(var i=0;i<iparse0;i++){
   j=getiallword(inputword[i]);
	if(j!=0){
		var allpatt=allwordspatt[Math.abs(j)-1];
		p=Math.abs(j);
		l=inputword[i].length;
		for(n=1;n<100;n++){
		 if(p<iallword){
			p+=1;
			if(inputword[i]==allwords[p-1].substr(0,l)){
				allpatt+=allwordspatt[p-1];
			}else{
				break; 
			}
		 }else{
		 	break;
		 }
		} 
		textparse=[];
		textparse=allpatt.split("/");
		iparse=textparse.length;
		//'msg2=allwords(iwords(Abs(j)))+"/"+allpatt'allwordspatt(iwords(Abs(j)))
	}else{
		iparse=0;
	}
	if(iparse>1){
		for(p=1;p<iparse;p++){
		   n=Math.max(1,Math.min(iaiml,parseInt(textparse[p])));
		   if(testiword[n]<i){
             testiword[n]=i;		   
			 testnword[n]+=1;
			 if(j>0){
				testpattern[n]+=weight(4+(inputword[i].length))*(1+Math.random()*0.3)*40/(40+patterns[n-1].length);
			 }else{
				testpattern[n]+=0.65*weight(4+(inputword[i].length))*(1+Math.random()*0.3)*40/(40+patterns[n-1].length);
			 }
		   }	 
		}
	}
}
for(var i=1;i<=iaiml;i++){
	testpattern[i]*=tweight[i];
	tweight[i]=Math.min(2.0,tweight[i]*1.1);
	if(testnword[i]==nbword){testpattern[i]*=1.2;}
}
var xtest=0.01;
j=0;
for(var i=1;i<=iaiml;i++){
	if(testpattern[i]>xtest){
		xtest=testpattern[i];
		j=i;
	}
}
if(j>0){
	k=0;
	var dx=xtest*0.3;
	for(var i=1;i<=iaiml;i++){
		if(Math.abs(testpattern[i]-xtest)<dx){
			k+=1;if(k>=nouttemplate){break;}
			iouttemplate[k]=i;
		}
	}
	j=iouttemplate[1+parseInt(Math.random()*k*0.999)];
}
if(j>0){
	tweight[j]=Math.max(0.3*40/(40+patterns[j-1].length),tweight[j]/1.4);
	msg=templates[j-1];
	msg=replaceall(msg,"/botname/","Helen")
	msg=replaceall(msg,"/date/",new Date().toDateString())
	msg=replaceall(msg,"/size/",botsize)
	outmsg=msg;
	if(msg.indexOf("/rnd/")>=0){ 
		msg=replaceall(msg,"/rnd/","")
		textparse=[];
		textparse=(msg.trim()).split("/li/");
		iparse=textparse.length-1;
		outmsg=textparse[parseInt(Math.random()*iparse*0.999)+1];
		//'msg+="/"+Str(iparse)+"/"
		//msg=templates[j-1];
		msg="";
	}else{
		msg="";
	}
    outmsg=replaceall(outmsg,"/br/",jcrlf);
	msg+=outmsg;
	/* /'parse(outmsg," ")
	outmsg=""
	For i=1 To iparse
		If Rnd<01.5 Then
			outmsg+=getsynonym1(textparse(i))+" "
		Else
			outmsg+=textparse(i)+" "
		EndIf
	Next
	msg+="/"+outmsg '/*/
	patt=patterns[j-1];
	patt=replaceall(patt,"<bot/>","Helen");
	if(outmsg.length<0.65*patt.length){
		outmsg=patt+" "+outmsg; 
	}
}
if(j<=0){
	if(teststar==0){
		teststar=1;
		testproc=0;
		outmsg=processinputstar(text0);
		if(testproc==1){return outmsg;} 
	}
}
oldmsg=msg;
if(j>0){
	//printmsg(patt+jcrlf+"> "+msg);
	msg=(patt+jcrlf+"> "+msg);
}else{
    if(Math.random()<0.5){msg="i don't see what you mean";}
	else{msg="that's too complicated for me";}
	oldmsg=msg;
	outmsg=msg;
	//printmsg("> "+msg);
	msg=("> "+msg);
}
return msg;//outmsg;
}

	function close(){
	  audio.pause();audio.src="";
	}	
	var jcanvas;
	var viewer;
    var vbuff0=[];var vbuff1=[];
	var vbuff2=[];var vbuff3=[];var nvbuff=0;
	var myimage=new Image;
	myimage.width=512;myimage.height=512;
	myimage.src=womanjeancavjpg;
	var myimage2=new Image;
	myimage2.width=512;myimage2.height=512;
	myimage2.src=womanjeancav2jpg;
	function printmsg(txt){
	 jmsg=txt;
	 //document.getElementById("msg").value=txt+jcrlf+auxtext;
     //ctx.fillStyle="Yellow";
     //ctxtext(txt,1,1);
	 }
	   
	function jinit() {
		jcanvas = document.getElementById('canvas2');
		viewer = new JSC3D.Viewer(jcanvas);
	    //viewer.setParameter('SceneUrl', '../demos/models/womanjean.obj');
		viewer.setParameter('SceneUrl', '');
		viewer.setParameter('InitRotationX', -90);
		viewer.setParameter('InitRotationY', -5);
		viewer.setParameter('InitRotationZ', 0);
		viewer.setParameter('ModelColor', '#FFFFFF');
		//viewer.setParameter('Background', 'off');
		viewer.setParameter('BackgroundImageUrl','ciel.jpg');
		viewer.setParameter('BackgroundColor1', '#AFAFFF');
		viewer.setParameter('BackgroundColor2', '#8FAFAF');
		viewer.setParameter('RenderMode', 'texture');
		viewer.setParameter('MipMapping', 'on');
		viewer.setParameter('Definiton', 'standard');
		viewer.setParameter('Renderer', '');
		viewer.init();
		viewer.update();
		//alert(womanjeanmouthobj.length);
		mymesh=new JSC3D.Mesh;
		mymesh.name='mymesh';
		mymesh.vertexBuffer=[];
		mymesh.indexBuffer=[];
		mymesh.texCoordBuffer=[];
		mymesh.texCoordIndexBuffer=[];
		mymesh.isDoubleSided=true;
		var mtllibs=viewer.parseObj(mymesh,womanjeanobj);
		mymesh.init();
		//alert("mtl="+mtllibs.length);
		/*mymesh4=new JSC3D.Mesh;
		mymesh4.name='mymesh';
		mymesh4.vertexBuffer=[];
		mymesh4.indexBuffer=[];
		mymesh4.texCoordBuffer=[];
		mymesh4.texCoordIndexBuffer=[];
		var mtllibs4=viewer.parseObj(mymesh4,alexiabody2obj);
		mymesh4.init();*/
		myscene=new JSC3D.Scene;
	    myscene.addChild(mymesh);
	    //myscene.addChild(mymesh4);
		viewer.replaceScene(myscene);
		viewer.update();
        //alert("addmesh");
		
		mymesh1=new JSC3D.Mesh;
		mymesh1.name='mymesh1';
		mymesh1.vertexBuffer=[];
		mymesh1.indexBuffer=[];
		mymesh1.texCoordBuffer=[];
		mymesh1.texCoordIndexBuffer=[];
		var mtllibs1=viewer.parseObj(mymesh1,womanjeaneyeobj);
		mymesh1.init();

		mymesh2=new JSC3D.Mesh;
		mymesh2.name='mymesh2';
		mymesh2.vertexBuffer=[];
		mymesh2.indexBuffer=[];
		mymesh2.texCoordBuffer=[];
		mymesh2.texCoordIndexBuffer=[];
		var mtllibs2=viewer.parseObj(mymesh2,womanjeanmouthobj);
		mymesh2.init();

		mymesh3=new JSC3D.Mesh;
		mymesh3.name='mymesh3';
		mymesh3.vertexBuffer=[];
		mymesh3.indexBuffer=[];
		mymesh3.texCoordBuffer=[];
		mymesh3.texCoordIndexBuffer=[];
		var mtllibs3=viewer.parseObj(mymesh3,womanjeanmouthoobj);
		mymesh3.init();
		
		setTimeout("init0();",50);
	}
	function init0(){
		//mymesh=myscene.children[0];
		mytexture=new JSC3D.Texture;
	    mytexture.onready = function() {
		 mymesh.setTexture(this);
		 viewer.update();
		};
	    //mytexture.createFromUrl('https://sites.google.com/site/chungkn1400/myjava/womanjean.jpg?attredirects=0');
		//alert(document.images.img.src);
		mytexture.createFromImage(myimage);
		
		mytexture2=new JSC3D.Texture;
	    mytexture2.onready = function() {
		 mymesh.setTexture(this);
		 viewer.update();
		};
	    //mytexture.createFromUrl('https://sites.google.com/site/chungkn1400/myjava/womanjean.jpg?attredirects=0');
		//alert(document.images.img.src);
		mytexture2.createFromImage(myimage2);
		//mymesh.setTexture(mytexture);
	    mymesh.setRenderMode('texturesmooth');
		//if(mymesh.hasTexture()){alert("mytexture");}
		//canvas.width=canvas.height=512;
		//var ctx = document.getElementById('canvas2').getContext('2d');
		//var image=document.images.img;
		//ctx.drawImage(myimage, 0, 0,400,400);
		//alert("testcanvas");
		/*bodytext=new JSC3D.Texture;
	    bodytext.onready = function() {
		 mymesh4.setTexture(this);
		 viewer.update();
		};
		bodytext.createFromImage(myimage2);
		//mymesh4.setTexture(bodytext);
	    mymesh4.setRenderMode('texturesmooth');
		for(var i=0;i<(mymesh4.vertexBuffer.length-2);i+=3){
		   mymesh4.vertexBuffer[i]*=18.0;
		   mymesh4.vertexBuffer[i+1]*=18.0;
		   mymesh4.vertexBuffer[i+2]*=18.0;
		   mymesh4.vertexBuffer[i]+=-1.2;
		   mymesh4.vertexBuffer[i+1]+=22.0;
		   mymesh4.vertexBuffer[i+2]+=13.0;
		}*/
	    mynvert=mymesh.vertexBuffer.length;
		//viewer.update(); 
		if (mynvert>mymesh1.vertexBuffer.length){mynvert=mesh1.vertexBuffer.length;}
		if (mynvert>mymesh2.vertexBuffer.length){mynvert=mesh2.vertexBuffer.length;}
		if (mynvert>mymesh3.vertexBuffer.length){mynvert=mesh3.vertexBuffer.length;}
		if (mynvert>10000){mynvert=10000;}
		//alert("init0 nvert="+mynvert);
		setTimeout("init2();",50);
    }
    function init2(){
		nvbuff=mynvert;
		var j=0,z=1,dx0=-8,dy0=0,dz0=37,dx=0,dy=0,dz=0;
		for(var i=0; i<nvbuff; i++){
		   j+=1;if(j>3){j=1;}
		   if(j==1 && i<(nvbuff-2)){z=mymesh.vertexBuffer[i+2];}
		   dx=0;dy=0;dz=0;
		   if(j==3){dz=dz0;}
		   if(j==2){dy=dy0;}
		   if(j==1){dx=dx0;}
		   if(z>(-50)){
		    vbuff0.push(mymesh.vertexBuffer[i]-dz-dx-dy);
		    vbuff1.push(mymesh1.vertexBuffer[i]-mymesh.vertexBuffer[i]);
		    vbuff2.push(mymesh2.vertexBuffer[i]-mymesh.vertexBuffer[i]);
		    vbuff3.push(mymesh3.vertexBuffer[i]-mymesh.vertexBuffer[i]);
		   }else{
		    vbuff0.push(-50.0-dz-dx-dy);
		    vbuff1.push(mymesh1.vertexBuffer[i]-mymesh.vertexBuffer[i]);
		    vbuff2.push(mymesh2.vertexBuffer[i]-mymesh.vertexBuffer[i]);
		    vbuff3.push(mymesh3.vertexBuffer[i]-mymesh.vertexBuffer[i]);
		   }		   
		}
		mymesh1.vertexBuffer=[];
		mymesh1.indexBuffer=[];
		mymesh1.texCoordBuffer=[];
		mymesh1.texCoordIndexBuffer=[];
		mymesh2.vertexBuffer=[];
		mymesh2.indexBuffer=[];
		mymesh2.texCoordBuffer=[];
		mymesh2.texCoordIndexBuffer=[];
		mymesh3.vertexBuffer=[];
		mymesh3.indexBuffer=[];
		mymesh3.texCoordBuffer=[];
		mymesh3.texCoordIndexBuffer=[];
    	delete womanjeaneyeobj;
	    delete womanjeanmouthobj;
		delete womanjeanmouthoobj;
	    delete womanjeanobj;
		//delete womanjeancavjpg;
		//delete womanjeancav2jpg;
		document.getElementById('intext0').focus();
		//initelizabot();
		printmsg("patterns loaded:"+iaiml+jcrlf+"allwords:"+iallword+jcrlf+"stars loaded:"+istar+jcrlf+"enter a text or *"+jcrlf+jcrlf+jcrlf+"enter => repeat"+jcrlf+"star* => autochat");
		//setTimeout("loop();",100);
		scrollTo(0,0);
}
	var mousex0=0;
	function mousemove(e){
    if ((e.clientX - mousex0)>2){
	mousex0=e.clientX;viewer.rotMatrix.rotateAboutYAxis(5);
	viewer.update();};
	if ((mousex0 - e.clientX)>2){
	mousex0=e.clientX;viewer.rotMatrix.rotateAboutYAxis(-5);
	viewer.update();};
	}
    
	function gettimer(){
    //return Date.now();
	return (new Date()).getTime();
    }
	var iloop=0,tloop=0,quit=0,tkeye=0;
	var keye=0,kmouth=0,kmoutho=0;
	var jmsg="",ctx;
	function loop(){
    testspeak();
    drawphonemes();
	iloop +=1;if(iloop>70){iloop=1;};
	if (iloop<=35){viewer.rotMatrix.rotateAboutYAxis(0.2);}
	if (iloop>35){viewer.rotMatrix.rotateAboutYAxis(-0.2);}
    var Timer=gettimer()/1000.0;
	var ktime=1.5;
    keye=(Math.sin(Timer*ktime-tkeye)*1.3+0.7)*0.32;
    var kmouth2=kmoutho;//'(Cos(Timer*ktime*0.75)+1)*0.64
    var kmouth1=kmouth+(Math.cos(Timer*ktime*0.85)+0.7)*0.15+kmoutho*0.3;
    var kfps=2.4;
	if ((Math.random()<0.03*kfps) && (keye>1.45*0.32)){keye=0;tkeye=Timer*ktime;}
	var vbuf = mymesh.vertexBuffer;
	var nvbuf=vbuf.length;
	if (nvbuf>nvbuff){nvbuf=nvbuff;};
    var sc=0.895;kmouth1*=sc;kmouth2*=sc;
    for (var i=0;i<nvbuf;i++){
   	  vbuf[i]=2.3*(vbuff0[i]+keye*vbuff1[i]+(kmouth1*vbuff2[i])+(kmouth2*vbuff3[i]));
   	} 
	viewer.update();
	//if (quit==0){tloop=setTimeout("loop();",50);}
	}
	function reset(){
	viewer.resetScene();
	viewer.update();
	}
	function reset2(){
	reset();
    intext0="";
	document.getElementById('intext0').focus();
	}
	function resetvars(){};
var phoneme="",phoneme0="",inword="",inword0="";
var nphoneme=7,iphoneme=0;
var phonemes=new Array(nphoneme);
var tphoneme=new Array(nphoneme);

function addphoneme(iphon){
var Timer=gettimer()/1000.0;
iphoneme+=1;if(iphoneme>nphoneme){iphoneme=1;};
phonemes[iphoneme]=iphon;
tphoneme[iphoneme]=Timer;
} 
function drawphoneme(i){
var ktime,dt,dtt,d1;
var Timer=gettimer()/1000.0;
ktime=4.5;//'2.80
dt=tphoneme[i]-Timer;
if(dt>999){tphoneme[i]=0;}
dtt=dt*ktime*0.75;
if(dtt>3.1416){return;}
d1=0.82;
switch(phonemes[i]){
	case 'o':
   kmoutho+=(Math.sin(dtt)+d1)*0.64;
   kmouth+=kmoutho*0.3;break;
	case 'u':
   kmoutho+=(Math.sin(dtt)+d1)*0.64;
   kmouth+=kmoutho*0.3;break;
	case 'i':
   kmoutho+=(Math.sin(dtt)+d1)*0.24;
   kmouth+=kmoutho*0.3;
   kmouth+=(Math.sin(dtt)+0.7)*0.3;break;
	case 'e':
   kmoutho+=(Math.sin(dtt)+d1)*0.24;
   kmouth+=kmoutho*0.3;
   kmouth+=(Math.sin(dtt)+0.7)*0.25;break;
	case 'w':
   kmoutho+=(Math.sin(dtt)+d1)*0.2;
   kmouth+=kmoutho*0.3;
   kmouth+=(Math.sin(dtt)+0.7)*0.3;break;
	case 'x':
   kmoutho+=(Math.sin(dtt)+d1)*0.15;
   kmouth+=kmoutho*0.2;
   kmouth+=(Math.sin(dtt)+0.7)*0.2;break;
	case 'r':
   kmoutho+=(Math.sin(dtt)+d1)*0.18;
   kmouth+=kmoutho*0.3;
   kmouth+=(Math.sin(dtt)+0.7)*0.24;break;
	case 'm':
   kmoutho+=(Math.sin(dtt)+d1)*0.18;
   kmouth+=kmoutho*0.3;
   kmouth+=(Math.sin(dtt)+0.7)*0.27;break;
	case 't':
   kmoutho+=(Math.sin(dtt)+d1)*0.18;
   kmouth+=kmoutho*0.2;
   kmouth+=(Math.sin(dtt)+0.7)*0.27;break;
	case 'ch':
   kmoutho+=(Math.sin(dtt)+d1)*0.18;
   kmouth+=kmoutho*0.25;
   kmouth+=(Math.sin(dtt)+0.7)*0.3;break;
	
	default: 
   kmouth+=(Math.sin(dtt)+0.7)*0.4;break;
		
   }
}

function drawphonemes(){
if (phoneme!=phoneme0){
	phoneme0=phoneme;
 	if (phoneme==" "){
 		//inword0=inword;
 		for( var i=1;i<=nphoneme;i++){
 			tphoneme[i]=0;
        }
	}
 	if (phoneme!=" "){addphoneme(phoneme);}
}
kmoutho=0;
kmouth=0;
var Timer=gettimer()/1000.0;
for (var i=1;i<=nphoneme;i++){
	if (Timer<(tphoneme[i]+1)){
		drawphoneme(i);
	}
}
}
var audiotime0=0,audiotime1=0,textspeak="",text="",audiosrc="",words=[];
var abc="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890+-*/()[]=.'";
var audio = new Audio();var tsay=0,vsay=14.0;
var speechstart=0,speechend=0;
function speakhtml(){
if ('speechSynthesis' in window){
tsay=1;
//alert(textspeak);
if(textspeak.length<1){return;}
var u=null;
try{
u = new SpeechSynthesisUtterance(textspeak);
}
catch(err){tsay=0;};if(tsay==0){return;}
textspeak=textspeak+" ";
u.lang = lang;//'en';
u.rate = 0.65;
//var voices = window.speechSynthesis.getVoices();
//u.voice=voices[0];alert(voices[0].name);
u.onstart = function(event) { 
  var Timer=gettimer()/1000.0;
  //speechstart=Timer;//alert("speechstart="+speechstart);
  audiotime0=Timer;//speechstart;
  audiotime1=Timer+(textspeak.length/(vsay+1.0));  
  };
u.onend = function(event) { 
  var Timer=gettimer()/1000.0;
  //speechend=Timer;alert("speechend="+speechend);
  var len=textspeak.length;
  if(len>2){vsay+=(len/(Timer-audiotime0+0.01)-vsay)*0.35;};
  audiotime1=audiotime0;  
  //alert(vsay);
  };
window.speechSynthesis.speak(u);
document.getElementById('intext0').focus();
}
}
var intext0="hello how are you";var vars=[];var icookie=0;
function say(){
//alert("/"+formateval("okeval(elizawords.length) eval(v['y'];v['y']+=1)")+"/");
//icookie+=1;if(icookie>11){icookie=0;savecookie();}
reset();
var intext=document.getElementById('intext0').value;
intext=intext.trim().substr(7,99);
document.getElementById('intext0').value="speak=>";
if(intext==""){intext=intext0;}//+" .";};
intext=replaceall(intext,"&"," ");
if(intext==""){intext=" ";}
intext0=intext;
nextsub='say1("'+intext+'");';
if(intext!="*"){detectlang(intext+"+"+intext);}
else{say2(intext);}
}
function say1(intext){//alert(lang+"/"+intext);
//if((langs.indexOf(lang+"-en")<0) || (langs.indexOf("en-"+lang)<0)){lang="en";}
nextsub="say2(translatext);";
translate(intext,lang,"en");
}
function say2(intext){
if(intext=="*"){intext=oldmsg;}
intext=formatinput(intext);
//alert("intext:"+intext);
text="";
text=processinput(intext);//eliza.transform(intext);
nextsub="say3(translatext);";
translate(text,"en",lang);
//alert(text);
//text=formateval(text);
//text=text.toLowerCase();
//alert(text);
}
function say3(text){
var msg=text;//intext+jcrlf+text+jcrlf+jcrlf;
if(lang!="en" && msg.indexOf(">")>1){
  msg=replaceall(msg,"> >",">");
  msg=replaceall(msg,"> ",">�");
  msg=replaceall(msg,">�",jcrlf+"> ");
}
printmsg(msg);
var outmsg=msg.substr(msg.indexOf(">")+2,999);
var patt=msg.substr(0,msg.indexOf(">"));
if(outmsg.length<0.65*patt.length){
		outmsg=patt+" "+outmsg; 
	}	
if(jauxvar!=""){msg+=jcrlf+"jauxvar="+jauxvar;};
if(jauxvar!=""){printmsg(msg);}
//alert(outmsg);
if(intext0.trim()=="exit"){setTimeout("subquit();",7000);}
words = formatoutput(outmsg).split("");
var words0="";
textspeak="";
for(var i=0; i<words.length; i++){
  if (words[i].length>0){
  if (abc.indexOf(words[i])>=0-999){
  textspeak=textspeak+words[i];};
  if(words0!=" " && words[i]==" "){textspeak=textspeak+" ";};
  words0=words[i];
  ;};};
if(textspeak.length>99){textspeak=textspeak.substr(0,99);}
textspeak=textspeak.toLowerCase();
//jauxvar=(window.speechSynthesis)+"/tsay="+tsay;
if (('speechSynthesis' in window)&&(tsay==1)){
   speakhtml();if(tsay==1){return;};
}
tsay=0;
var ttslang=lang;
//alert(textspeak);
//audiosrc ='http://translate.google.com/translate_tts?ie=utf-8&tl=en&q='+encodeURIComponent(textspeak);
//audiosrc ='http://translate.google.com/translate_tts?&tl=en&q='+encodeURIComponent(textspeak);
audiosrc ="http://translate.google.com/translate_tts?&tl="+ttslang+"&q="+encodeURIComponent(textspeak);
//audiosrc ='http://translate.google.com/translate_tts?&tl=es&q='+encodeURIComponent(textspeak);
//audiosrc ='http://translate.google.com/translate_tts?&tl=fr&q='+encodeURIComponent(textspeak);
//audiosrc ='http://translate.google.com/translate_tts?&tl=de&q='+encodeURIComponent(textspeak);
//audiosrc ='http://translate.google.com/translate_tts?&tl=it&q='+encodeURIComponent(textspeak);
//text=encodeURIComponent(textspeak);
//audiosrc='http://translate.google.com/translate_tts?ie=UTF-8&q='+text+'&tl=en&total=1&idx=0&textlen='+text.length+'&prev=input';
textspeak=textspeak+" ";
 
audio.type="audio/x-wav" 
audio.src=audiosrc;
var Timer=-1;
//audio.addEventListener('loadedmetadata',function(){
audio.addEventListener('canplay',function(){
 tsay=0;
 if(Timer<0){ Timer=gettimer()/1000.0;
 audiotime0=Timer;
 audiotime1=Timer+audio.duration;
 //alert(audiotime1-audiotime0);
 audio.play();
 };
});
//audio.addEventListener('ended',function(){audio.src="";});
tsay=1;
audio.load();
//audio.play();//load();
//alert("say0="+textspeak);
//alert("$"+vars['_y']);
//alert("$ "+vars['_x']+eval("if(vars['_x']){alert(vars['_x']);};"));eval("vars['_x']='ok1'");
document.getElementById('intext0').focus();
}
//function subquit(){document.location.href="http://chung.blogvie.com/links/";
//https://www.google.fr/search?q=nguyen+chung&ie=utf-8&oe=utf-8";
//}
function testspeak(){
var Timer=gettimer()/1000.0;
if((Timer>audiotime0) && (Timer<audiotime1) && (textspeak.length>0)){
  var i=parseInt(textspeak.length*(Timer-audiotime0)/(audiotime1-audiotime0+0.01));
  phoneme=textspeak.substr(i,1);
  if((i>0) && (phoneme=="h")){if(textspeak.substr(i-1,1)=="c"){phoneme="ch";};};
  if ((i<(textspeak.length-1)) && (phoneme=="c")){if(textspeak.substr(i+1,1)=="h"){phoneme="ch";};};
}else{phoneme=" ";}
}
function mykeypress(e) {
    if (e.which == 13 || e.keyCode == 13) {
        var Timer=gettimer()/1000.0;
        if(Timer>audiotime1 && Timer>(3.1+ttranslate/1000)){say();}
		//return false;
    }
	return;
    //left = 37,up = 38,right = 39,down = 40,esc=27
    if (e.which == 37 || e.keyCode == 37) {viewer.rotMatrix.rotateAboutYAxis(2);}
    if (e.which == 39 || e.keyCode == 39) {viewer.rotMatrix.rotateAboutYAxis(-2);}
    if (e.which == 38 || e.keyCode == 38) {viewer.rotMatrix.rotateAboutXAxis(2);}
    if (e.which == 40 || e.keyCode == 40) {viewer.rotMatrix.rotateAboutXAxis(-2);}
    //if (e.which == 27 || e.keyCode == 27) {subquit();}
	//return true;
}

function readcookie(){return;
var mycookie=document.cookie+";";
//alert("mycookie="+mycookie);
var pref="html5elizabotchung=";
//pref="__utma=";
var i=mycookie.indexOf(pref,0);
if(i<0){return;}
i+=pref.length;
var j=mycookie.indexOf(";",i);
if(j<i){return;}
var mycookie=mycookie.substring(i,j);
//alert(mycookie);
var wcookie=mycookie.split("//");
for(var i=0;i<(wcookie.length-1);i+=2){
    //alert(wcookie[i]+"="+wcookie[i+1]);
    v[wcookie[i]]=wcookie[i+1];
	}
}
function savecookie(){return;
var mycookie="";
var cookie0=document.cookie;
for(var x in v){
  if((x.indexOf('"',0)<0)&&(x.indexOf("/",0)<0)&&(v[x].indexOf('"',0)<0)&&(v[x].indexOf("/",0)<0)){
  if((x.indexOf('=',0)<0)&&(x.indexOf(";",0)<0)&&(v[x].indexOf('=',0)<0)&&(v[x].indexOf(";",0)<0)){
    mycookie+=x+"//"+v[x]+"//";
    if(mycookie.length>1900){break;}	
  }}
}
//alert(mycookie);  
var pref="html5elizabotchung=";
mycookie =pref+mycookie+"; expires=Fri, 3 Aug 2100 20:47:11 UTC; path=/";
if(mycookie.length>(3900-cookie0.length)){alert("could not save, cookie too long");return;}
document.cookie=mycookie;
}
function deletecookie(){
var pref="html5elizabotchung=";
document.cookie =pref+";expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
}
var head = document.getElementsByTagName('head')[0];
var myjson=null,lang="en",translatetext="",ttranslate=0;
var myjson2=null,myjson3=null,nextsub="alert(translatext);";
var yandexkey="trnsl.1.1.20150101T214016Z.6ce08a28419d7a1f.651ffda363d863e3e159586810b80934aad4d173";
var langs=["ru-en","ru-pl","ru-uk","ru-de","ru-fr","ru-es","ru-it","ru-bg","ru-cs","ru-tr","ru-ro","ru-sr","en-ru","en-uk","en-de","en-fr","en-es","en-it","en-cs","en-tr","pl-ru","pl-uk","uk-ru","uk-en","uk-pl","uk-de","uk-fr","uk-es","uk-it","uk-bg","uk-cs","uk-tr","uk-ro","uk-sr","de-ru","de-en","de-uk","fr-ru","fr-en","fr-uk","es-ru","es-en","es-uk","it-ru","it-en","it-uk","bg-ru","bg-uk","cs-ru","cs-en","cs-uk","tr-ru","tr-en","tr-uk","ro-ru","ro-uk","sr-ru","sr-uk"];
function myapiCallback(response){//"de","fr","es","it"
	translatext=response.text[0];
	ttranslate=gettimer()-2990;
	setTimeout(nextsub,30);
}
function translate(text,langue,langue2){
if(langue==langue2){translatext=text;
    	ttranslate=gettimer()-2990;
        setTimeout(nextsub,30);return 1;}
var js = document.createElement("script");
js.type = "text/javascript";
js.async=false;
var transtext=replaceall(text," ","+");
var transurl="https://translate.yandex.net/api/v1.5/tr.json/translate?key="+yandexkey+"&lang="+langue+"-"+langue2+"&text="+transtext+"&callback=myapiCallback";
js.src = transurl;
myjson=js;
js.onload = function(){setTimeout("head.removeChild(myjson);",100);};
var timer=gettimer();
if(timer>ttranslate+3000){
  ttranslate=timer;head.appendChild(js);return 1;
}else{return 0;}
}
var lang0="",lang1="",lang2="";
function myapiCallback2(response){//"de","fr","es","it"
	if(lang1==response.lang){lang2=lang1;lang=lang1;}
	else if(lang0==response.lang){lang2=lang0;lang1=lang0;lang=lang0;}
	else{ lang0=lang1;lang1=response.lang;
	      lang2=response.lang;}		  
    if(listlang.indexOf(lang)<0){lang="en";}
	ttranslate=gettimer()-2990;
	setTimeout(nextsub,30);
}
function detectlang(text){
if(langcombo!="auto"){lang=langcombo;
	ttranslate=gettimer()-2990;
	setTimeout(nextsub,30);return 1;}
var js = document.createElement("script");
js.type = "text/javascript";
js.async=false;
var transtext=replaceall(text," ","+");
var transurl="https://translate.yandex.net/api/v1.5/tr.json/detect?key="+yandexkey+"&text="+transtext+"&callback=myapiCallback2";
js.src = transurl;
myjson2=js;
js.onload = function(){setTimeout("head.removeChild(myjson2);",100);};
var timer=gettimer();
if(timer>ttranslate+3000){
  ttranslate=timer;head.appendChild(js);return 1;
}else{return 0;}
}
var listlang=[],listlangname=[],ilang=0;
function myapiCallback3(response){
     var listlangs=response.langs;//alert(listlangs.fr);
	 ilang=0;
	 for(var langcode in listlangs){listlang[ilang]=langcode;
	     listlangname[ilang]=listlangs[langcode];ilang+=1;}
		 //alert(ilang+"/"+listlang[ilang-1]+listlangname[ilang-1]);
     /*var combo = document.getElementById("combo");
     for(var i=0;i<ilang;i++){
       var option=document.createElement('option');
       option.text=listlang[i]+" "+listlangname[i];
	   option.value=listlang[i];
       combo.add(option, 0);}
 	 */	 
}
function getlistlang(){
var js = document.createElement("script");
js.type = "text/javascript";
js.async=false;
var transurl="https://translate.yandex.net/api/v1.5/tr.json/getLangs?key="+yandexkey+"&ui=en&callback=myapiCallback3";
js.src = transurl;
myjson3=js;
js.onload = function(){setTimeout("head.removeChild(myjson3);",100);};
var timer=gettimer();
if(timer>ttranslate+3000){
  ttranslate=timer;head.appendChild(js);return 1;
}else{return 0;}
}
getlistlang();
var langcombo="auto",icombo000=0;
/*function subcombo(){
langcombo="en";
icombo=document.getElementById('combo').selectedIndex;
if(icombo>=0+ilang){
  langcombo=document.getElementById('combo')[icombo].id;
}else{langcombo=document.getElementById('combo')[icombo].value;
}
ttranslate=0;if(langcombo!="auto"){lang=langcombo;};
document.getElementById('intext0').focus();
}*/
//readcookie();
//savecookie();
//deletecookie();
	jinit();
	//alert("okend"); 
	
