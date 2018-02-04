console.log("Google Image Downloader Started");
var searchTitle="";
browser.browserAction.onClicked.addListener(onButtonClickedFunction);
function onStartedDownload(id) {
 // console.log(`Started downloading: ${id}`);
}

function onError(error) {
  console.log(`Download failed: ${error}`);
}
function onLinksReceived(downloadLinks) {
  var storedSettings = {
    downloadOption: 0,
    appendFileNames: false,
    continuesNumbering: false,
    AppendComma: false,
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
  
 // console.log(storedSettings);
  
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
  if((storedSettings.downloadOption==0)||(storedSettings.downloadOption==2)){
  while (++i < downloadLinks[0].length) {
    //console.log(downloadLinks[0][i])
    var dashSplitString = downloadLinks[0][i].split("/")
    var fileNameString = dashSplitString[dashSplitString.length - 1]
    //console.log(fileNameString);
    var extensionString = fileNameString.split(".")
    extensionString = extensionString[extensionString.length - 1]
    var fileNameToStore = "Google Images" + "/" +searchTitle+"_"+ dateTime + "/" + (i - j);
    if ((extensionString == "jpg") || (extensionString == "bmp") || (extensionString == "jpeg") || (extensionString == "gif") || (extensionString == "png") || (extensionString == "ico") || (extensionString == "svg")) {
      if (storedSettings.appendFileNames) {

        fileNameToStore = fileNameToStore + "_" + fileNameString;
      } else {
        fileNameToStore = fileNameToStore + "." + extensionString;

      }

     console.log("fileNameToStore is"+ fileNameToStore);
    }
    else {
      if (storedSettings.continuesNumbering) {
        j = j + 1;
        console.log("Using Continues Numbering: "+ j +" images skipped");
      }
      continue;
    }

    var downloading = this.browser.downloads.download({
      url: downloadLinks[0][i],
      conflictAction: 'uniquify',
      filename: fileNameToStore
    });
    downloading.then(onStartedDownload, onError);

  }}

  if((storedSettings.downloadOption==1)||(storedSettings.downloadOption==2)){
    i=0;

    var seperatorString="\n";
    if(storedSettings.AppendComma){
      seperatorString=",";
    }
    if(storedSettings.entryOnNewLine){
      seperatorString=seperatorString+"\n";
    }



  }


}


function onButtonClickedFunction() {
  browser.tabs.query({active: true, windowId: browser.windows.WINDOW_ID_CURRENT})
  .then(tabs => browser.tabs.get(tabs[0].id))
  .then(tab => {
    console.log(tab.title);
    searchTitle=  tab.title.split('-')[0]

  console.log("in on Click Listner")
  var aray = browser.tabs.executeScript({
    file: "downloader.js"
  });
  aray.then(onLinksReceived, onError);

  });


 
  return;
}

