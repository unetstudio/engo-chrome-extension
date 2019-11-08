// Set up the context menus
chrome.contextMenus.create({
"title": "Buzz This",
"contexts": ["page", "selection", "image", "link"],
"onclick" : function(e) {
  var url = e.pageUrl;
  var buzzPostUrl = "http://mobile.local/search?q=";
  
  if (e.selectionText) {
    // The user selected some text, put this in the message.
    buzzPostUrl += encodeURI(e.selectionText)
  }
 
  buzzPostUrl += "&ref=" + encodeURI(url);
  
  // Open the page up.
   chrome.tabs.create(
      {"url" : buzzPostUrl });
}
});
