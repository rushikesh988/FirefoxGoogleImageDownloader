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
  console.log( document.querySelector('input[name="downloadOption"]:checked').value);
  console.log( document.querySelector("#appendFileNames").checked);
  console.log(document.querySelector("#continuesNumbering").checked);
  console.log(document.querySelector("#AppendComma").checked);
  console.log(document.querySelector("#entryOnNewLine").checked);


  browser.storage.local.set({
    downloadOption: document.querySelector('input[name="downloadOption"]:checked').value,
    appendFileNames: document.querySelector("#appendFileNames").checked,
    continuesNumbering: document.querySelector("#continuesNumbering").checked,
    AppendComma: document.querySelector("#AppendComma").checked,
    entryOnNewLine: document.querySelector("#entryOnNewLine").checked
  });

}
function restoreOptions() {
  function setCurrentChoice(result) {
    // document.querySelector("#downloadOption").value = result.downloadOption || "0";
    var downloadOptionValue=result.downloadOption || 0;
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
    document.querySelector("#continuesNumbering").checked =(((result.continuesNumbering==undefined)? false:true))? result.continuesNumbering :false; 
    document.querySelector("#AppendComma").checked =(((result.AppendComma==undefined)? false:true))? result.AppendComma :false; 
    document.querySelector("#entryOnNewLine").checked =(((result.entryOnNewLine==undefined)? false:true))? result.entryOnNewLine :false; 
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