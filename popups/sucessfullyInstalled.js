function onLinksReceived(downloadLinks) {
  // console.log(`Started downloading: ${downloadLinks}`);
  var i=0;
  while(++i<downloadLinks[0].length){
    
      console.log(downloadLinks[0][i])
      var downloading = browser.downloads.download({
        url : downloadLinks[0][i],
        conflictAction : 'uniquify'
      });
    }
 }
  
function onLinksFailed(error) {
  console.log(`Download failed: ${error}`);
}

document.addEventListener("click", (e) => {
  
  console.log("in on Click Listner")
  if (e.target.classList.contains("beast")) {
    var chosenBeast = e.target.textContent;
    console.log('====================================');
   var aray=browser.tabs.executeScript({
      file: "../downloader.js"
    });

    aray.then(onLinksReceived, onLinksFailed);
    console.log(aray);
     console.log('====================================');
    }
  else if (e.target.classList.contains("clear")) {
    browser.tabs.reload();
    window.close();
    return;
  }
});
