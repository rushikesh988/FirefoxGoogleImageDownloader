(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

console.log("Fetching Title");
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
 return aray;
})();