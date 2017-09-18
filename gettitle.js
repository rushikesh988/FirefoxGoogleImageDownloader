(function() {
  var docTitle=document.title;
  titleAfterRemovingDash=docTitle.split("-")
  console.log("Title is inside get Title" + titleAfterRemovingDash);
  return titleAfterRemovingDash[0];
  })();