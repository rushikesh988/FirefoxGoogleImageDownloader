(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

console.log("Images from IMG TAG");
var docTitle=document.title;
titleAfterRemovingDash=docTitle.split("-")
var imgs=document.getElementsByTagName("a");
var i=0;
var aray=new Array();var j=-1;
while(++i<imgs.length){
    if(imgs[i].href.indexOf("/imgres?imgurl=http")>0){
      aray[++j]=decodeURIComponent(imgs[i].href).split(/=|%|&/)[1].split("?imgref")[0];
      var urlToSave=aray[j].split("/");
      console.log(aray[j])
    }
 }

 var divs=document.getElementsByTagName("div");
 console.log(divs.length);
 var divIndex=0;
 while(++divIndex<divs.length) {
   var divInnerHTML=divs[divIndex].innerHTML;
    if (divs[divIndex].innerHTML==""){
     //console.log(divs[divIndex].className +" is empty")
     continue;
    }
    
    if(divs[divIndex].innerHTML.includes('"ou":"')){
      var splittedString=  divs[divIndex].innerHTML.split('"');
          var indexToCheck=0;
       while(++indexToCheck < splittedString.length)
       {
          if(splittedString[indexToCheck]=="ou"){
            console.log("Element from Div at "+splittedString[indexToCheck+ 2]);
            aray[++j]=splittedString[indexToCheck+ 2];
            //console.log(splittedString)
            break;
          }

       }
    }


 }


 console.log("returning list of objects");
 return aray;
})();