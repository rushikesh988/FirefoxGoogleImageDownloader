
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
     var fileNameToStore="Google Images"+"/"+i;
     if ((extensionString=="jpg") ||( extensionString == "bmp") || ( extensionString == "jpeg") ||( extensionString == "gif") || ( extensionString == "png") || ( extensionString == "ico") ||( extensionString == "svg"))
     {
      fileNameToStore=fileNameToStore+ "."+ extensionString;
      console.log("fileNameToStore is"+ fileNameToStore);
     }
     else{
      continue;
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

  var aray=browser.tabs.executeScript({
      file: "../downloader.js"
    });
   aray.then(onLinksReceived, onLinksFailed);
    }
  else if (e.target.classList.contains("clear")) {
    browser.tabs.reload();
    window.close();
    return;
  }
});
