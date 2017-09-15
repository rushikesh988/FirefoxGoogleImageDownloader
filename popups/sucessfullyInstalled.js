
/*
Listen for clicks in the popup.

If the click is on one of the beasts:
  Inject the "beastify.js" content script in the active tab.

  Then get the active tab and send "beastify.js" a message
  containing the URL to the chosen beast's image.

If it's on a button wich contains class "clear":
  Reload the page.
  Close the popup. This is needed, as the content script malfunctions after page reloads.
*/
document.addEventListener("click", (e) => {
  
  console.log("in on Click Listner")
  if (e.target.classList.contains("beast")) {
    var chosenBeast = e.target.textContent;
    console.log("Going for execution of script")
    browser.tabs.executeScript(null, {
      file: "../imageDownloader.js"
    });
    console.log("Script Executed")
    console.log('====================================');
    console.log("Rushikesh Its Started");
    // var getting = browser.tabs.get(
    //   0              // integer
    // )

    browser.tabs.executeScript({
      file: "../downloader.js"
    });

    // var gettingCurrent = browser.tabs.getCurrent();
    // gettingCurrent.then(onGot, onError);

    // var cont=document.getElementsByTagName("body")[0];
    // var imgs=document.getElementsByTagName("a");
    // var i=0;var divv= document.createElement("div");
    // var aray=new Array();var j=-1;
    // while(++i<imgs.length){
    //     if(imgs[i].href.indexOf("/imgres?imgurl=http")>0){
    //       // divv.appendChild(document.createElement("br"));
    //       aray[++j]=decodeURIComponent(imgs[i].href).split(/=|%|&/)[1].split("?imgref")[0];
    //       // divv.appendChild(document.createTextNode(aray[j]));
    //       console.log(aray[j])
    //     }
    // }
    // cont.insertBefore(divv,cont.childNodes[0]);




    console.log('====================================');
    

  }
  else if (e.target.classList.contains("clear")) {
    browser.tabs.reload();
    window.close();

    return;
  }
});
