// var input = document.createElement('input');
// input.type = 'file';
// input.click();
function loadXHR(url) {
  
      return new Promise(function(resolve, reject) {
          try {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", url);
              xhr.responseType = "blob";
              xhr.onerror = function() {reject("Network error.")};
              xhr.onload = function() {
                  if (xhr.status === 200) {resolve(xhr.response)}
                  else {reject("Loading error:" + xhr.statusText)}
              };
              xhr.send();
          }
          catch(err) {reject(err.message)}
      });
  }



var cont=document.getElementsByTagName("body")[0];

console.log("Fetching Title");
var pele= document.createElement("p");
var docTitle=document.title;
titleAfterRemovingDash=docTitle.split("-")
pele.appendChild(document.createTextNode(titleAfterRemovingDash[0]))




var imgs=document.getElementsByTagName("a");
var i=0;
var divv= document.createElement("div");
var aray=new Array();var j=-1;
while(++i<imgs.length){
    if(imgs[i].href.indexOf("/imgres?imgurl=http")>0){
      divv.appendChild(document.createElement("br"));
      aray[++j]=decodeURIComponent(imgs[i].href).split(/=|%|&/)[1].split("?imgref")[0];
      var urlToSave=aray[j].split("/");
      fileNameToSave=urlToSave[urlToSave.length-1];


      loadXHR(aray[j]).then(function(blob) {
        saveAs(blob,fileNameToSave);
      });
  
      //divv.appendChild(document.createTextNode(aray[j]));
      console.log(aray[j])
    }
 }

 cont.insertBefore(pele,cont.childNodes[0]);
 cont.insertBefore(divv,cont.childNodes[0]);
