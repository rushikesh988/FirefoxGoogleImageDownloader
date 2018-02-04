"use strict";
console.log("Google Image Downloader Started");
var searchTitle = "";


browser.browserAction.onClicked.addListener(onButtonClickedFunction);
function onStartedDownload(id) {
  // console.log(`Started downloading: ${id}`);
}

function onError(error) {
  console.log(`Download failed: ${error}`);
}

function onLinksReceived(downloadLinks) {
  var gettingSettings = browser.storage.local.get().then(function (result) {
    var storedSettings = {
      downloadOption: 2,
      appendFileNames: false,
      continuesNumbering: true,
      AppendComma: false,
      entryOnNewLine: true
    };
  
    if(Object.keys(result).length === 0){
      console.log("Received Empty Result");
    }else{
    storedSettings = result;
    }
    console.log("Using following Settings to Download in OnLinkReceivedFunction");
    console.log(storedSettings);
  
    if (downloadLinks[0] == undefined) {
      console.log("unable to fetch images");
      return;
    }
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
    var dateTime = date + ' ' + time;
  
  
    var i = 0;
    var j = 0;
    var seperatorString = "\n";
    if (storedSettings.AppendComma) {
      seperatorString = ",";
      if (storedSettings.entryOnNewLine) {
        seperatorString = seperatorString + "\n";
      }
    }
   
  
    var imgURLsString = "";
    while (++i < downloadLinks[0].length) {
      var dashSplitString = downloadLinks[0][i].split("/");
      var fileNameString = dashSplitString[dashSplitString.length - 1];
      var extensionString = fileNameString.split(".");
      extensionString = extensionString[extensionString.length - 1];
      var fileNameToStore = "Google Images" + "/" + searchTitle + " " + dateTime + "/" + (i - j);
      if ((extensionString == "jpg") || (extensionString == "bmp") || (extensionString == "jpeg") || (extensionString == "gif") || (extensionString == "png") || (extensionString == "ico") || (extensionString == "svg")) {
        if (storedSettings.appendFileNames) {
          fileNameToStore = fileNameToStore + "_" + fileNameString;
        } else {
          fileNameToStore = fileNameToStore + "." + extensionString;
        }
      } else {
        if (storedSettings.continuesNumbering) {
          j = j + 1;
          console.log("Using Continues Numbering: " + j + " images skipped");
        }
        continue;
      }
      imgURLsString = imgURLsString + downloadLinks[0][i] + seperatorString;
      if ((storedSettings.downloadOption == 0) || (storedSettings.downloadOption == 2)) {
        var downloading = browser.downloads.download({
          url: downloadLinks[0][i],
          conflictAction: 'uniquify',
          filename: fileNameToStore
        });
        downloading.then(onStartedDownload, onError);
      }
    }
    if ((storedSettings.downloadOption == 1) || (storedSettings.downloadOption == 2)) {
      var URLsFileName = "Google Images" + "/" + searchTitle + " " + dateTime + "/" + "Links.txt";
      imgURLsString = imgURLsString.substring(0, imgURLsString.length - seperatorString.length);
      var blob = new Blob([imgURLsString], {
        type: 'text/plain'
      });
      var downloading = browser.downloads.download({
        filename: URLsFileName,
        url: URL.createObjectURL(blob),
        conflictAction: 'uniquify'
      });
      downloading.then(onStartedDownload, onError);
    }



  }, onError);
}

function onButtonClickedFunction() {
  browser.tabs.query({
      active: true,
      windowId: browser.windows.WINDOW_ID_CURRENT
    })
    .then(tabs => browser.tabs.get(tabs[0].id))
    .then(tab => {
      searchTitle = tab.title.split('-')[0]
      var aray = browser.tabs.executeScript({
        file: "downloader.js"
      });
      aray.then(onLinksReceived, onError);
    });
  return;
}
