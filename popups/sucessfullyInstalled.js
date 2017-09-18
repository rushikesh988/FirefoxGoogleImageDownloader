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
      var downloading =this.browser.downloads.download({
        url : downloadLinks[0][i],
        conflictAction : 'uniquify'
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
    var chosenBeast = e.target.textContent;
   
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
