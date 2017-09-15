

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
      file: "imageDownloader.js"
    });

    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    console.log("Received gettingActiveTab" )
    gettingActiveTab.then((tabs) => {
      console.log("sending gettingActiveTab sendmessage" )
      browser.tabs.sendMessage(tabs[0].id, {beastURL: "http://www.yahoo.co.in"});
      console.log("sent gettingActiveTab sendmessage" )
    });
  }
  else if (e.target.classList.contains("clear")) {
    browser.tabs.reload();
    window.close();

    return;
  }
});
