var titleName="";
var titlePromiseExecuted=false;

function onGot(tabInfo) {
  console.log(tabInfo);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function onSuccessfullTitleFetch(title) {
  console.log(`Started downloading: ${title}`);
  titleName=title;
  titlePromiseExecuted=true;
}

function onFailedTitleFetch(error) {
  console.log(`Download failed: ${error}`);
  titlePromiseExecuted=true;
}

function onStartedDownload(id) {
  console.log(`Started downloading: ${id}`);
}

function onFailed(error) {
  console.log(`Download failed: ${error}`);
}

function onLinksReceived(downloadLinks) {
  var i=0;
  if (downloadLinks[0]==undefined){
    console.log("unable to fetch images" );
  return;
  }

  while(++i<downloadLinks[0].length){
      console.log(downloadLinks[0][i])
     var dashSplitString=downloadLinks[0][i].split("/")
     var fileNameString=dashSplitString[dashSplitString.length-1]
     var extensionString=fileNameString.split(".")
     extensionString= extensionString[extensionString.length-1]
     var fileNameToStore=titleName+"/"+i;
     if ((extensionString=="jpg") ||( extensionString == "bmp") || ( extensionString == "jpeg") ||( extensionString == "gif") || ( extensionString == "png") || ( extensionString == "ico") ||( extensionString == "svg"))
     {
      fileNameToStore=fileNameToStore+ "."+ extensionString;
      console.log("fileNameToStore is"+ fileNameToStore);
     }
     else{
      continue;
     }

     if(i>10){
       break; 
       return;
     }


      var downloading =this.browser.downloads.download({
        url : downloadLinks[0][i],
        conflictAction : 'uniquify',
        filename: fileNameToStore
      });
      downloading.then(onStartedDownload, onFailed);

    }
 }
  
function onLinksFailed(error) {
  console.log(`Getting Links failed: ${error}`);
}

document.addEventListener("click", (e) => { 
  console.log("in on Click Listner")
  if (e.target.classList.contains("beast")) {
    // var chosenBeast = e.target.textContent;
  // var  titleGetScript=browser.tabs.executeScript({
  //     file: "../gettitle.js"
  //   });

  //   titleGetScript.then(onSuccessfullTitleFetch,onFailedTitleFetch)
  // while(!titlePromiseExecuted){

  // }

  
  var gettingCurrent = browser.tabs.getCurrent();
  gettingCurrent.then(onGot, onError);


  console.log( titleName); return;

  // var aray=browser.tabs.executeScript({
  //     file: "../downloader.js"
  //   });
  //  aray.then(onLinksReceived, onLinksFailed);

    }
  else if (e.target.classList.contains("clear")) {
    browser.tabs.reload();
    window.close();
    return;
  }
});
