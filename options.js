function TextRadioCallBack() {
  var x = document.getElementById("image");
  var y = document.getElementById("text");
  x.style.display = "none";
  y.style.display = "block";
}

function ImageRadioCallBack() {
  var x = document.getElementById("image");
  var y = document.getElementById("text");
  x.style.display = "block";
  y.style.display = "none";
}

function BothRadioCallBack() {
  var x = document.getElementById("image");
  var y = document.getElementById("text");
  x.style.display = "block";
  y.style.display = "block";
}

function saveOptions(e) {
  e.preventDefault();
  var settingsToStore={
    downloadOption: document.querySelector('input[name="downloadOption"]:checked').value,
    appendFileNames: document.querySelector("#appendFileNames").checked,
    continuesNumbering: document.querySelector("#continuesNumbering").checked,
    AppendComma: document.querySelector("#AppendComma").checked,
    entryOnNewLine: document.querySelector("#entryOnNewLine").checked
  }
 
  console.log(settingsToStore);
  browser.storage.local.set(settingsToStore);

}
function restoreOptions() {
  function setCurrentChoice(result) {
    // document.querySelector("#downloadOption").value = result.downloadOption || "2";
    var downloadOptionValue=result.downloadOption || 2;
    if(downloadOptionValue==0){
      document.getElementById("imagesRadio").checked=true;
      ImageRadioCallBack();
    }
    else if(downloadOptionValue==1){
      document.getElementById("textRadio").checked=true;
      TextRadioCallBack();
    }
    else{
      document.getElementById("bothRadio").checked=true;
      BothRadioCallBack();
    }
    
    document.querySelector("#appendFileNames").checked =(((result.appendFileNames==undefined)? false:true))? result.appendFileNames :false; 
    document.querySelector("#continuesNumbering").checked =(((result.continuesNumbering==undefined)? false:true))? result.continuesNumbering :true; 
    document.querySelector("#AppendComma").checked =(((result.AppendComma==undefined)? false:true))? result.AppendComma :false; 
    document.querySelector("#entryOnNewLine").checked =(((result.entryOnNewLine==undefined)? false:true))? result.entryOnNewLine :true; 
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var gettingSetting = browser.storage.local.get();
  gettingSetting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.getElementById("imagesRadio").onclick=ImageRadioCallBack;
document.getElementById("textRadio").onclick=TextRadioCallBack;
document.getElementById("bothRadio").onclick=BothRadioCallBack;