// Set up the context menus
chrome.contextMenus.create({
    "title": "Engo Dictionary",
    "contexts": ["page", "selection", "image", "link"],
    "onclick": function (e) {
        let url = e.pageUrl;
        let createURL = "https://engo.pro/words/create?q=";

        if (e.selectionText) {
            createURL += encodeURI(e.selectionText)
        }

        createURL += "&ref=" + encodeURI(url);
        chrome.tabs.create({"url": createURL});
    }
});
