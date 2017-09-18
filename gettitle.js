(function() {
  var docTitle=document.title;
  titleAfterRemovingDash=docTitle.split("-")
  console.log("Title is " + titleAfterRemovingDash);
  return titleAfterRemovingDash;
  })();