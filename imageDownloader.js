console.log("Google Image Downloader Started");
var storedSettings={
  downloadOption:0,
  appendFileNames: false,
  continuesNumbering: false,
  AppendComma:false,
  entryOnNewLine: false
};
var gettingSettings = browser.storage.local.get();
gettingSettings.then(function (result) {
  storedSettings = result;
  console.log(result);
}, function (error) {
  console.log(`Error: ${error}`);
  console.log('Using Default Settings:');

});

console.log(storedSettings);
browser.browserAction.onClicked.addListener(onButtonClickedFunction);
function onStartedDownload(id) {
  console.log(`Started downloading: ${id}`);
}

function onError(error) {
  console.log(`Download failed: ${error}`);
}
function onLinksReceived(downloadLinks) {
  var i = 0;
  if (downloadLinks[0] == undefined) {
    console.log("unable to fetch images");
    return;
  }
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
  var dateTime = date + ' ' + time;

  var needOriginalNames = true;
  var gettingItem = browser.storage.local.get("originalNames");
  gettingItem.then(results => {
    var needOriginalNamesVal = results["originalNames"] || "1";
    if (needOriginalNamesVal == "0") {
      needOriginalNames = false;
    }
  });
  console.log("needOriginalNames=" + needOriginalNames);



  // while(++i<downloadLinks[0].length){
  //     //console.log(downloadLinks[0][i])
  //    var dashSplitString=downloadLinks[0][i].split("/")
  //    var fileNameString=dashSplitString[dashSplitString.length-1]
  //    console.log(fileNameString);
  //    var extensionString=fileNameString.split(".")
  //    extensionString= extensionString[extensionString.length-1]
  //    var fileNameToStore="Google Images"+"/"+ dateTime+"/"+i;
  //    if ((extensionString=="jpg") ||( extensionString == "bmp") || ( extensionString == "jpeg") ||( extensionString == "gif") || ( extensionString == "png") || ( extensionString == "ico") ||( extensionString == "svg"))
  //    {
  //     //fileNameToStore=fileNameToStore+ "."+ extensionString;
  //     fileNameToStore=fileNameToStore+ "_"+ fileNameString;
  //     //console.log("fileNameToStore is"+ fileNameToStore);
  //    }
  //    else{
  //     continue;
  //    }

  //     var downloading =this.browser.downloads.download({
  //       url : downloadLinks[0][i],
  //       conflictAction : 'uniquify',
  //       filename: fileNameToStore
  //     });
  //     downloading.then(onStartedDownload, onError);

  //   }
}


function onButtonClickedFunction() {
  // console.log("in on Click Listner")
  var aray = browser.tabs.executeScript({
    file: "downloader.js"
  });
  aray.then(onLinksReceived, onError);
  return;
}

