
console.log("Google Image Downloader Started");
browser.browserAction.onClicked.addListener(onButtonClickedFunction);
//console.log("Image Downloader Script added listner");

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
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
    var dateTime = date+' '+time;



    while(++i<downloadLinks[0].length){
        //console.log(downloadLinks[0][i])
       var dashSplitString=downloadLinks[0][i].split("/")
       var fileNameString=dashSplitString[dashSplitString.length-1]
       var extensionString=fileNameString.split(".")
       extensionString= extensionString[extensionString.length-1]
       var fileNameToStore="Google Images"+"/"+ dateTime+"/"+i;
       if ((extensionString=="jpg") ||( extensionString == "bmp") || ( extensionString == "jpeg") ||( extensionString == "gif") || ( extensionString == "png") || ( extensionString == "ico") ||( extensionString == "svg"))
       {
        fileNameToStore=fileNameToStore+ "."+ extensionString;
        //console.log("fileNameToStore is"+ fileNameToStore);
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
  function onButtonClickedFunction(){ 
   // console.log("in on Click Listner")
    var aray=browser.tabs.executeScript({
        file: "downloader.js"
      });
     aray.then(onLinksReceived, onLinksFailed);
      return;
    }
  
  